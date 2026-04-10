<script>
    import { urlFor } from '$lib/utils/image.js';

    let { 
        image, 
        aspectRatio = undefined, 
        fit = undefined, 
        size = 1080, 
        className = "", 
        loading = "lazy",
        hover = false 
    } = $props();

    const asset = $derived(image?.asset);
    const metadata = $derived(asset?.metadata || {});
    const dimensions = $derived(metadata.dimensions || { width: 1, height: 1 });
    const lqip = $derived(metadata.lqip);

    const finalRatio = $derived(aspectRatio || dimensions.width / dimensions.height);
    const widths = [400, 800, 1200, 1600, 2000];
    
    const src = $derived(urlFor(image).width(size).auto('format').url());
    const srcset = $derived(
        widths.map(w => `${urlFor(image).width(w).auto('format').url()} ${w}w`).join(', ')
    );

    let isLoaded = $state(false);
</script>

<div 
    class="image-wrapper {className}"
    class:cover={fit == 'cover'}
    class:can-hover={hover}
    class:is-loading={!isLoaded}
    style:background-image="url({lqip})"
    style:aspect-ratio={finalRatio}
>
    <div class="overlay"></div>

    <img
        {src}
        {srcset}
        {loading}
        class:loaded={isLoaded}
        alt={asset?.altText || ""}
        sizes="(max-width: 768px) 100vw, {size}px"
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

        .overlay {
            position: absolute;
            inset: 0;
            z-index: 3;
            pointer-events: none;
            backdrop-filter: saturate(1) invert(0);
			transition: var(--transition);
        }

        &.is-loading .overlay {
			backdrop-filter: saturate(0) invert(1) blur(20px);
		}
		&.can-hover:hover .overlay {
			backdrop-filter: saturate(0) invert(1);
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

            &.loaded {
                opacity: 1;
            }
        }

		&.cover {
			img {
				object-fit: cover;
				object-position: center;
			}
		}
    }
</style>