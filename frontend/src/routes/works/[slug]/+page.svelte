<script>
    import { register } from 'swiper/element/bundle';
    register();

    import Image from '$lib/components/Image.svelte';
    import Head from '$lib/components/Head.svelte';
    import { innerHeight, innerWidth } from 'svelte/reactivity/window';
    import { goto } from '$app/navigation';
    import { PortableText } from '@portabletext/svelte';
    import PortableTextStyle from '$lib/components/portableTextStyles/PortableTextStyle.svelte'; 
    import { page } from '$app/state';
    import { urlFor } from '$lib/utils/image';

    let { data } = $props();
    let work = $derived(data.work[0]);
    
    let index = $derived.by(() => {
        const iParam = page.url.searchParams.get('i');
        const n = parseInt(iParam);
        return (!isNaN(n) && n > 0) ? n - 1 : 0;
    });
    let indexMobile = $derived.by(() => {
        const iParam = page.url.searchParams.get('i');
        const n = parseInt(iParam);
        return (!isNaN(n) && n > 0) ? n - 1 : 0;
    });

    let nextImageUrl = $derived.by(() => {
        if (!work?.images || work.images.length <= 1) return null;
        const nextIdx = (index + 1) % work.images.length;
        const nextImg = work.images[nextIdx];
        return urlFor(nextImg).height(1920).auto('format').url();
    });

    let moreInfoHeight = $state(0);
    let moreInfo = $state(false);

    let swiperEl = $state();

    $effect(() => {
        if (swiperEl && swiperEl.swiper && swiperEl.swiper.realIndex !== index) {
            swiperEl.swiper.slideToLoop(index);
        }
    });

	let cursorClass = $state('default');
	function handleMouseMove(e) {
		if (innerWidth.current < 1080) {
			cursorClass = 'default';
			return;
		}

		const { clientX } = e;
		const midpoint = innerWidth.current / 2;

		if (clientX > midpoint) {
			cursorClass = 'next';
		} else {
			cursorClass = 'prev';
		}
	}

    function handleSlideChange(e) {
        const [swiper] = e.detail;
        if (swiper.realIndex !== index) {
            goto(`?i=${swiper.realIndex + 1}`, { keepFocus: true, noScroll: true, replaceState: true });
        }
    }

    function navigate(direction) {
        if (!work?.images) return;
        const total = work.images.length;
        
        if (direction === 'next') {
            const nextIndex = (index + 1) % total;
            goto(`?i=${nextIndex + 1}`, { keepFocus: true, noScroll: true });
        } else if (direction === 'prev') {
            const prevIndex = (index - 1 + total) % total;
            goto(`?i=${prevIndex + 1}`, { keepFocus: true, noScroll: true });
        }
    }

    function handleKeydown(e) {
        if (e.key === 'ArrowRight') navigate('next');
        if (e.key === 'ArrowLeft') navigate('prev');
        if (e.key === 'Escape') goto('/works');
		if (e.key === ' ') {
            e.preventDefault();
            toggleMoreInfo();
        }
    }

    function handleClick(e) {
        if (e.target.closest('#moreInfo') || e.target.closest('.nav-mobile')) return;

        const { clientX } = e;
        if (innerWidth.current >= 1080) {
            if (clientX > innerWidth.current / 2) {
                navigate('next');
            } else {
                navigate('prev');
            }
        }
    }

    function toggleMoreInfo() {
        moreInfo = !moreInfo;
    }
</script>

<svelte:window onkeydown={handleKeydown}/>

<Head>
    {#if nextImageUrl}
        <link rel="preload" as="image" href={nextImageUrl} />
    {/if}
</Head>

<main>
	<div style:cursor={cursorClass === 'next' ? 'e-resize' : cursorClass === 'prev' ? 'w-resize' : 'default'}
	id="work" role="button" tabindex="0" onclick={handleClick} onmousemove={(e) => {handleMouseMove(e)}} aria-label="Project Gallery" onkeydown={(e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            navigate('next');
        }
    }}>
		<div class="indicator">
			<h1 class="title">{work.title}
				{#if work.moreInfo}
					<button
						aria-label="More info"
						class="moreInfo-switch-mobile" 
						onclick={(e) => { e.stopPropagation(); toggleMoreInfo(); }}
						aria-expanded={moreInfo}
					>
						<div class="icon {moreInfo ? 'active' : ''}">
							<div class="line horizontal"></div>
							<div class="line vertical"></div>
						</div>
					</button>
				{/if}
			</h1>
			{#if work.images}   
				<span class="index">{index + 1}/{work.images.length}</span>
			{/if}
		</div>

		{#if work.images && work.images.length > 0 && innerWidth.current >= 1080}
			{#key index}
				<div class="img-wrapper" 
					style:aspect-ratio={work.images[index]?.asset?.metadata?.dimensions 
					? work.images[index].asset.metadata.dimensions.width / work.images[index].asset.metadata.dimensions.height 
					: 'auto'}
				>
					<Image image={work.images[index]} height={1920}/>
				</div>
			{/key}
		{:else if work.images && work.images.length > 0 && innerWidth.current < 1080}
			<swiper-container
				bind:this={swiperEl}
				onswiperslidechange={handleSlideChange}
				slides-per-view="1"
				speed="500"
				loop="true"
				initial-slide={index}
			>
				{#each work.images as image, i}
					<swiper-slide>
						<div class="img-wrapper">
							<Image image={image} height={1080} className={'swiper'}/>
						</div>
					</swiper-slide>
				{/each}
			</swiper-container>
			<span class="index-mobile">{indexMobile + 1}/{work.images.length}</span>
			<div class="nav-mobile">
				<button onclick={(e) => { e.stopPropagation(); swiperEl.swiper.slidePrev(); }} aria-label="Previous slide">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
					</svg>
				</button>
				<button onclick={(e) => { e.stopPropagation(); swiperEl.swiper.slideNext(); }} aria-label="Next slide">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/>
					</svg>
				</button>
			</div>
		{/if}
	</div>
</main>

{#if work.moreInfo}
    <div id="moreInfo" class:active={moreInfo} style="--moreInfoHeight: {moreInfoHeight}px">
        <button onclick={(e) => { e.stopPropagation(); toggleMoreInfo(); }}>
            <div class="icon {moreInfo ? 'active' : ''}">
                <div class="line horizontal"></div>
                <div class="line vertical"></div>
            </div>
            More info
        </button>
        
        <div class="moreInfo-wrapper">
            <div class="moreInfo portableText" bind:clientHeight={moreInfoHeight}>
                <PortableText value={work.moreInfo}
                components={{
                    block: { normal: PortableTextStyle },
                    listItem: PortableTextStyle,
                    marks: { link: PortableTextStyle },
                }}/>
            </div>
            {#if work.date}<p class="year">{work.date.split('-')[0]}</p>{/if}
            {#if work.kind}<p class="kind">{work.kind == 'personal' ? 'Personal project' : 'Commissioned project'}</p>{/if}
            {#if work.city}<p class="city">{work.city.title}</p>{/if}
        </div>
        <div class="bg"></div>
    </div>
{/if}

<style lang="scss">
	#work {
		width: 100%;
		height: stretch;
		position: fixed;
		top: 0;
		left: 0;
		user-select: none;
		background-color: var(--white);
		display: grid;
		justify-content: center;

		@media (width <= 1080px) {
			position: relative;
			margin-top: var(--headerHeight);
			padding-top: var(--sp-12);
			overflow-y: hidden;
			display: block;
			// min-height: calc(100svh - var(--headerHeight) - var(--sp-12));
		}

		.indicator {
			position: absolute;
			top: 50%;
			left: var(--sp-16);
			transform: translateY(-50%);
			pointer-events: none;
			display: flex;
			column-gap: var(--sp-30);
			z-index: 4;
			color: white;
			mix-blend-mode: difference;

			@media (width <= 1080px) and (orientation: portrait) {
				position: relative;
				transform: none;
				top: unset;
				left: unset;
				padding: var(--sp-24) var(--sp-12);
			}

			.title {
				@media (width <= 1080px) and (orientation: portrait) {
					width: calc(100% - 6rem);
				}

				.moreInfo-switch-mobile {
					display: none;

					@media (width <= 1080px) and (orientation: portrait) {
						display: inline-block;
						pointer-events: all;
						margin: calc(var(--sp-12)*-1) calc(var(--sp-12)*-1) calc(var(--sp-12)*-1) 0;
						padding: var(--sp-12);
						position: relative;
						top: -.1em;
					}
				}
			}

			.index {
				@media (width <= 1080px) and (orientation: portrait) {
					display: none;
				}
			}
		}

		.img-wrapper {
			width: auto;
			height: 100vh;
			justify-self: center;

			@media (width <= 1080px) {
				height: auto;
				max-height: calc(100svh - (var(--headerHeight) + var(--sp-12) + (var(--sp-24)*2 + 1.142rem*1.15)*2));
			}

			@media (width <= 1080px) and (orientation: landscape) {
				height: 100svh;
				max-height: unset;
			}
		}

		swiper-container {
			@media (width <= 1080px) and (orientation: landscape) {
				position: fixed;
				top: 0;
				width: 100%;
				height: stretch;
			}
		}

		.index-mobile {
			display: none;
			
			@media (width <= 1080px) {
				display: block;
				padding: var(--sp-24) var(--sp-12);
				position: fixed;
				bottom: 0;
				mix-blend-mode: difference;
				color: white;
				z-index: 1;
			}

		}

		.nav-mobile {
			display: none;
			
			@media (width <= 1080px) {
				display: flex;
				position: fixed;
				bottom: 0;
				right: 0;
				z-index: 10;
				padding: var(--sp-12);

				button {
					display: flex;
					background: none;
					border: none;
					cursor: pointer;
					padding: var(--sp-12);
					color: black;
					opacity: 0;

					svg {
						width: 2rem;
						height: 2rem;
					}
				}
			}
		}
	}
	#moreInfo {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 3;
		width: 100%;

		@media (width <= 1080px) {
			position: absolute;
			top: calc(var(--headerHeight) + var(--sp-12) + var(--sp-24)*2 + 1.142rem*1.15 - 1px);
			bottom: unset;
			max-height: unset;
		}

		.moreInfo-wrapper {
			display: grid;
			grid-template-columns: repeat(20, 1fr);
			column-gap: var(--sp-6);
			padding: 0 var(--sp-16);
			overflow: hidden;
			transition: var(--transition);
			transition-property: max-height, padding;
			pointer-events: none;
			max-height: 0;

			@media (width <= 1080px) {
				grid-template-columns: repeat(10, 1fr);
			}
			@media (width <= 678px) {
				grid-template-columns: repeat(6, 1fr);
				column-gap: var(--sp-3);
			}
		}

		&.active {
			.moreInfo-wrapper {
				max-height: calc(var(--moreInfoHeight) + var(--sp-20)*2 + 0.786rem*1.2);
				opacity: 1;
				padding-bottom: var(--sp-100);
				pointer-events: all;

				@media (width <= 1080px) {
					max-height: calc(var(--moreInfoHeight) + var(--sp-20)*2 + 1.142rem*1.2);
					padding: var(--sp-24) var(--sp-12);
				}
			}

			.bg {
				opacity: .9;
				transform: translateY(0);
			}
		}

		.moreInfo-wrapper {
			@media (width <= 1080px) {
				padding: 0 var(--sp-12);
			}

			.moreInfo {
				grid-column: 1 / span 4; grid-row: 2; max-width: 300px;
				@media (width <= 1080px) {
					max-height: calc(var(--moreInfoHeight) + var(--sp-20)*2 + 1.142rem*1.2);
					padding: var(--sp-24) 0;
					grid-column: 1 / span 6;
					grid-row: 2;
					max-width: 600px;
				}
			}
			.year {
				grid-column: 6 / span 1; grid-row: 2;
				@media (width <= 1080px) {
					grid-column: 6 / span 1;
					grid-row: 1;
					text-align: right;
				}
			}
			.kind {
				grid-column: 7 / span 2; grid-row: 2;
				@media (width <= 1080px) {
					grid-column: 1 / span 3;
					grid-row: 1;
				}
			}
			.city {
				grid-column: 9 / span 2; grid-row: 2;
				@media (width <= 1080px) {
					grid-column: 4 / span 2;
					grid-row: 1;
					text-align: center;
				}
			}
		}

		.bg {
			background-color: var(--white);
			position: absolute;
			inset: 0;
			z-index: -1;
			transition: var(--transition);
			transition-property: transform, opacity;
			opacity: 0;
		}
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.3em;
		background: none;
		border: none;
		cursor: pointer;
		padding: var(--sp-20) var(--sp-16);
		font: inherit;
		color: inherit;

		@media (width <= 1080px) {
			display: none;
		}

		.icon {
			position: relative;
			top: .1em;
			width: .5em;
			height: .5em;
			
			.line {
				position: absolute;
				background-color: currentColor;
				transition: var(--transition);
				&.horizontal { width: 100%; height: 1.2px; top: 50%; left: 0; transform: translateY(-50%); }
				&.vertical { width: 1.2px; height: 100%; left: 50%; top: 0; transform: translateX(-50%); }
			}
			&.active .vertical { transform: translateX(-50%) rotate(90deg); }
		}
	}
</style>