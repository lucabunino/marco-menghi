<script>
    import { urlFor } from '$lib/utils/image.js';

    let { 
        image, 
        aspectRatio = undefined, 
        width = undefined,
        height = undefined,
        fit = undefined,
        className = "", 
        loading = "lazy",
        hover = false 
    } = $props();

    const asset = $derived(image?.asset);
    const metadata = $derived(asset?.metadata || {});
    const dims = $derived(metadata.dimensions || { width: 1, height: 1 });
    const lqip = $derived(metadata.lqip);

    const naturalRatio = $derived(dims.width / dims.height);
    const finalRatio = $derived(aspectRatio || naturalRatio);

    const limitHeight = $derived(height || (!width ? 1080 : undefined));
    const limitWidth = $derived(width);

    const getUrl = (w, h) => {
        let builder = urlFor(image).auto('format');
        
        if (w) builder = builder.width(Math.round(w));
        if (h) builder = builder.height(Math.round(h));
        builder = builder.fit("max");
        
        return builder.url();
    };

    const widths = [400, 800, 1200, 1600, 2000, 2560];
    
    const srcset = $derived(
        widths.map(w => {
            let targetW = w;
            let targetH = undefined;

            if (limitHeight && !limitWidth) {
                const maxWidth = limitHeight * finalRatio;
                targetW = Math.min(w, maxWidth);
                targetH = targetW / finalRatio;
            } else {
                targetH = w / finalRatio;
            }

            return `${getUrl(targetW, targetH)} ${Math.round(targetW)}w`;
        }).join(', ')
    );

    const src = $derived(getUrl(limitWidth, limitHeight));
    let isLoaded = $state(false);
</script>

<div 
    class="image-wrapper {className}"
    class:is-loading={!isLoaded}
    class:hover={hover}
    style:background-image="url({lqip})"
    style:aspect-ratio={finalRatio}
>
    <div class="overlay"></div>

    <img
        {src}
        {srcset}
        {loading}
        class:loaded={isLoaded}
        style:object-fit={fit === 'max' ? 'contain' : 'cover'}
        alt={asset?.altText || ""}
        sizes={limitHeight 
            ? `${Math.round(limitHeight * finalRatio)}px` 
            : "(max-width: 768px) 100vw, 1200px"}
        onload={() => isLoaded = true}
    />
</div>

<style lang="scss">
    .image-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        overflow: hidden;
        display: block;

        .overlay {
            position: absolute;
            inset: 0;
            z-index: 3;
            pointer-events: none;
            backdrop-filter: saturate(1) invert(0);
            transition: var(--transition);
			transition-duration: 300ms;
        }

        &.is-loading .overlay {
            backdrop-filter: saturate(0) invert(1) blur(20px);
        }

        &.hover:hover .overlay {
            backdrop-filter: saturate(0) invert(1) brightness(.8);
            transition: none;
        }

        img {
            position: relative;
            z-index: 2;
            display: block;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: var(--transition);
			transition-duration: 300ms;

            &.loaded {
                opacity: 1;
            }
        }
    }
</style>