<script>
    import Head from '$lib/components/Head.svelte';
    import Image from '$lib/components/Image.svelte';
    import { urlFor } from '$lib/utils/image.js';
    import { innerWidth, innerHeight } from 'svelte/reactivity/window';
    
    let { data } = $props();
    
    let isPlaying = $state(false);
    let hasStarted = $state(false);
    let desktopVid = $state(null);
    let mobileVid = $state(null);

    let hasVideo = $derived(data.video?.videoDesktop?.url || data.video?.videoMobile?.url);
    let isVertical = $derived(innerWidth.current / innerHeight.current < 1);
    
    let currentPoster = $derived(
        isVertical && data.video.videoMobile?.poster 
        ? data.video.videoMobile.poster 
        : data.video.videoDesktop.poster
    );

    function togglePlay() {
        if (!hasVideo) return;
        if (!hasStarted) hasStarted = true;
        isPlaying = !isPlaying;
    }

    $effect(() => {
        const activeVideo = isVertical ? mobileVid : desktopVid;
        if (!activeVideo) return;

        if (isPlaying) {
            activeVideo.play().catch(() => isPlaying = false);
        } else {
            activeVideo.pause();
        }
    });
</script>

<Head seo={data.seoSingle} />

<main 
    id="video" 
    onclick={togglePlay} 
    onkeydown={(e) => e.key === ' ' && togglePlay()}
    role="button"
    tabindex="0"
>
    {#if hasVideo}
		<div class="overlay" class:hidden={hasStarted}>
			<Image image={currentPoster} />
		</div>
        
        <video 
            bind:this={desktopVid}
            class="horizontal"
            muted loop playsinline
            poster={urlFor(data.video.videoDesktop?.poster).url()}
        >
            <source src={data.video.videoDesktop.url} type="video/mp4" />
        </video>

        <video 
            bind:this={mobileVid}
            class="vertical"
            muted loop playsinline
            poster={urlFor(data.video.videoMobile?.poster || data.video.videoDesktop?.poster).url()}
        >
            <source src={data.video.videoMobile.url || data.video.videoDesktop.url} type="video/mp4" />
        </video>

        <div class="play-indicator" class:hidden={isPlaying}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path fill="currentColor" d="M1 15.65L15.662 8L1 .35z"/>
            </svg>
        </div>
    {:else}
        <span class="error">Missing video assets</span>
    {/if}
</main>

<style lang="scss">
    #video {
        position: fixed;
        inset: 0;
        background-color: black;
        cursor: pointer;

        .play-indicator {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%); // Fixed typo
            color: white;
            mix-blend-mode: difference;
            width: var(--sp-60);
            z-index: 3;
            pointer-events: none;
            transition: opacity 0.3s ease;

            &.hidden {
                opacity: 0;
            }

            svg { width: 100%; height: auto; display: block; }
        }

        .overlay {
            position: absolute;
            inset: 0;
            z-index: 2;
            transition: var(--transition);
            pointer-events: none;
            width: 100%;
            height: 100%;

            &.hidden {
                opacity: 0;
            }
        }

        video {
            position: absolute;
            inset: 0;
            width: 100vw;
            height: 100dvh;
            pointer-events: none;
            z-index: 1;
			object-fit: cover;
            
            &.horizontal {
                display: block;
                @media (max-aspect-ratio: 1/1) { display: none; }
            }
            &.vertical {
                display: none;
                @media (max-aspect-ratio: 1/1) { display: block; }
            }
        }
    }
</style>