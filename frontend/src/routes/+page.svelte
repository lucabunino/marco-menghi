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
        const isWide = images[index].wide;
        if (isWide || step === 1) {
            index = (index + 1) % images.length;
            step = 0;
        } else {
            step = 1;
        }
    }

	function prevStep() {
        if (index === 0 && step === 0) return; // Inizio raggiunto

        const isWide = images[index].wide; // Nota: controlliamo l'immagine corrente o precedente? 
        // Per semplicità guardiamo dove siamo:
        if (step === 1) {
            step = 0;
        } else {
            // Dobbiamo tornare al progetto precedente
            index = (index - 1 + images.length) % images.length;
            // Se il progetto precedente è wide, lo step è 0, altrimenti è 1 (mostra entrambi)
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
        totalDistance += Math.abs(clientX - lastPos.x) + Math.abs(clientY - lastPos.y);
        lastPos = { x: clientX, y: clientY };

        if (totalDistance >= innerWidth.current / 3) {
            totalDistance = 0;
            nextStep(); // Usa la nuova funzione
        }
    }
</script>

<svelte:window onkeydown={handleKeyDown} />

<Head />

<main id="homepage" onmousemove={handleMouseMove}>
{#if innerWidth.current >= 1080}
	<p style="position: fixed; left:0; top:50%; z-index:999; background-color: var(--white); padding: 4px; font-family: monospace;">
		{index}/{step}
	</p>
    {#each images as image, i}
        {@const isPast = i < index}
        {@const isCurrent = i === index}

        <div class="img-wrapper">
			<a href="/works/{image.work.slug.current}">
				{#if image.wide}
					{#if isPast || isCurrent}
						{#key step}
							<div class="img wide">
								<Image image={image.wide} fit={'cover'} size={2560}/>
							</div>
						{/key}
					{/if}
				{:else}
					{#if isPast || (isCurrent && step >= 0)}
						<div class="img left">
							<Image image={image.left} fit={'cover'} size={1080}/>
						</div>
					{/if}
					{#if isPast || (isCurrent && step === 1)}
						<div class="img right">
							<Image image={image.right} fit={'cover'} size={1080}/>
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