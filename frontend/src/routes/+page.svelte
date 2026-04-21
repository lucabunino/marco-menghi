<script>
    import { page } from '$app/state';
    import Head from '$lib/components/Head.svelte';
    import Image from '$lib/components/Image.svelte';
	import { urlFor } from '$lib/utils/image';
    import { innerWidth } from 'svelte/reactivity/window';
    let { data } = $props();

    let totalDistance = $state(0);
    let lastPos = $state({ x: null, y: null });
    
    let images = $derived(data.homepage.images);
	let imagesMobile = $derived(data.homepage.imagesMobile);
    let index = $state(0);
    let step = $state(0);

	function nextStep() {
		const currentIsWide = images[index].wide;

		// If it's wide OR we are already on the second half of a split (step 1)
		if (currentIsWide || step === 1) {
			index = (index + 1) % images.length;
			step = 0; // Always start new images at the beginning
		} else {
			// We are on step 0 of a split image, move to step 1
			step = 1;
		}
	}

	function prevStep() {
		// If we are on the second half of a split pair, just go back to the first half
		if (step === 1) {
			step = 0;
		} else {
			// Go to previous image index
			index = (index - 1 + images.length) % images.length;
			
			// If the NEW current image is wide, it only has step 0.
			// If it's a split image, we must land on step 1 (the right side).
			step = images[index].wide ? 0 : 1;
		}
	}

	function handleKeyDown(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextStep();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            prevStep();
        }
    }

    function handleMouseMove({ clientX, clientY }) {
        if (lastPos.x === null) {
            lastPos = { x: clientX, y: clientY };
            return;
        }
        const dx = clientX - lastPos.x;
        const dy = clientY - lastPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        totalDistance += distance;
        lastPos = { x: clientX, y: clientY };
        if (totalDistance >= innerWidth.current / 3) {
            totalDistance = 0;
            nextStep();
        }
    }
</script>

<svelte:window onkeydown={handleKeyDown} />

<Head />

<main id="homepage" onmousemove={handleMouseMove}>
{#if innerWidth.current >= 1080}
    {#each images as image, i}
        {@const isPast = i < index}
        {@const isCurrent = i === index}

        <div class="img-wrapper">
			<a href="/works/{image.work.slug.current}">
				{#if image.wide}
					{#if isPast || isCurrent}
						{#key step}
							<div class="img wide">
								<Image image={image.wide} fit={'cover'} height={1920}/>
							</div>
						{/key}
					{/if}
				{:else}
					{#if isPast || (isCurrent && step >= 0)}
						<div class="img left">
							<Image image={image.left} fit={'cover'} height={1920}/>
						</div>
					{/if}
					{#if isPast || (isCurrent && step === 1)}
						<div class="img right">
							<Image image={image.right} fit={'cover'} height={1920}/>
						</div>
					{/if}
				{/if}
			</a>
        </div>
    {/each}
{:else}
	{#each imagesMobile as imageMobile, i}
		<a href="/works/{imageMobile.work.slug.current}">
			<Image image={imageMobile.image} fit={'cover'} size={1080}/>
		</a>
    {/each}
{/if}
</main>

<style>
    #homepage {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
		
		@media (width <= 1080px) {
			position: relative;
			overflow: auto;
			display: flex;
			flex-direction: column;
			padding-top: var(--headerHeight);
			top: unset;
			left: unset;
			height: unset;

			& a:last-of-type {
				margin-bottom: var(--footerHeight);
			}
		}
    }
    .img-wrapper {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }
    .img {
        position: absolute;
        inset: 0;
        height: 100%;
        opacity: 1;
        z-index: 1;
    }
    .img.wide { width: 100%; }
    .img.left { width: 50%; justify-self: flex-start; }
    .img.right { width: 50%; justify-self: flex-end; }
</style>