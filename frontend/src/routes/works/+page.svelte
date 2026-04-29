<script>
    import { page } from '$app/state';
	import Head from '$lib/components/Head.svelte';
	import { urlFor } from '$lib/utils/image';
    import { innerWidth } from 'svelte/reactivity/window';
	import Masonry from 'svelte-bricks'
    import Image from '$lib/components/Image.svelte';
    import { browser } from '$app/environment';
    import { fade } from 'svelte/transition';

    let { data } = $props();
	let items = $derived(
		data.works?.map((work, i) => ({
			id: i,
			work
		}))
	);
	let minColWidth = $derived(
		innerWidth.current > 1700 ? innerWidth.current/5 :
		innerWidth.current > 768 ? innerWidth.current/4 :
		innerWidth.current > 360 ? innerWidth.current/3 :
		innerWidth.current/2)
	let width = $state(0), height = $state(0), gap = $state(3)
	let personals = $derived(data.works?.filter(w => w.kind === 'personal') ?? []);
    let commissions = $derived(data.works?.filter(w => w.kind === 'commission') ?? []);
	let activeWorkId = $state(null);
	let loaded = $state(false);

	$effect(() => {
        if (browser && data.view) {
            document.cookie = `works-view-preference=${data.view}; path=/; max-age=31536000; SameSite=Lax`;
        }
    });
	$effect(() => {
        if (data.view === 'grid') {
            if (height > 0) {
                loaded = true;
            }
        } else {
            loaded = true;
        }
    });
	
</script>

<Head/>

{#snippet work(work, kind, i)}
	<a class="work {kind}" href="/works/{work.slug.current}"
	in:fade|global={{delay: 100 + 30*i, duration: 100}}
	onmouseenter={() => activeWorkId = work._id}
	onmouseleave={() => activeWorkId = null}
	>
		<h3 class="title">{work.title}</h3>
		{#if work.city}<p class="city">{work.city.title}</p>{/if}
		{#if work.date}<p class="year">{work.date.split('-')[0]}</p>{/if}
		{#if activeWorkId == work._id && work.listThumbnail}
			<div class="img-wrapper">
				<div class="img">
					<Image image={work.listThumbnail} fit={'cover'} height={1920}/>
				</div>
			</div>
		{/if}
	</a>
{/snippet}

<main id="works" data-view={data.view}>
	{#if data.view == 'grid'}
		<Masonry
		items={items}
		animate={false}
		minColWidth={minColWidth}
		maxColWidth={innerWidth.current}
		gap={gap}
		order={'row-first'}
		bind:masonryWidth={width}
		bind:masonryHeight={height}
		>
			{#snippet children({ item })}
				<a class="work {!item.work.gridThumbnail ? '_16_9' : undefined}"
				href="/works/{item.work.slug.current}"
				class:loaded={loaded}>
					{#if item.work.gridThumbnail}
						<div class="img-wrapper">
							<Image image={item.work.gridThumbnail} hover={true} width={800} fit={'cover'}/>
						</div>
					{/if}
					<h2 class="title te-l">{item.work.title}</h2>
				</a>
			{/snippet}
		</Masonry>
	{:else if data.view == 'list' && loaded}
		<section id="personal">
			<h2 class="kind">Personal</h2>
			{#each personals as personal, i}
				{@render work(personal, 'personal', i)}
			{/each}
		</section>
		<section id="commission">
			<h2 class="kind">Commission</h2>
			{#each commissions as commission, i}
				{@render work(commission, 'commission', i)}
			{/each}
		</section>
	{/if}
</main>

<style>
	#works {
		min-height: calc(100vh - var(--footerHeight));
		padding: var(--sp-168) var(--sp-16) var(--sp-16);

		@media (width <= 1080px) {
			min-height: unset;
			row-gap: var(--sp-40);
			padding: calc(var(--headerHeight) + var(--sp-40)) var(--sp-12) var(--sp-16);
		}
	}
    #works[data-view=grid] {
		.work {
			display: block;
			position: relative;
			background-color: var(--black);
			opacity: 0;
			/* transition: var(--transition);
			transition-delay: var(--delay); */

			.title {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%) translateY(-50%);
				text-align: center;
				color: white;
				opacity: 0;
				z-index: 4;
				pointer-events: none;
				transition: var(--transition);
				width: 100%;
				padding: var(--sp-16);
			}

			&.loaded {
				opacity: 1;
			}

			&:hover {
				.title {
					opacity: 1;
					transition: none;
				}
			}
		}
	}
	#works[data-view=list] {
		display: grid;
		grid-template-columns: repeat(20, 1fr);
		column-gap: var(--sp-6);

		@media (width <= 1080px) {
			margin-top: var(--sp-20);
			grid-template-columns: repeat(1, 1fr);
		}

		#personal,
		#commission {
			display: flex;
			flex-direction: column;
			row-gap: .28em;
		}

		#personal {
			grid-column: 3 / span 6;

			@media (width <= 1080px) {
				grid-column: 1 / span 1;
			}
		}

		#commission {
			grid-column: 13 / span 6;

			@media (width <= 1080px) {
				grid-column: 1 / span 1;
			}
		}
		
		.kind {
			text-align: center;
			margin-bottom: 2em;
		}

		.work {
			display: grid;
			grid-template-columns: repeat(6, 1fr);
			gap: var(--sp-6);

			.title {
				grid-column: 1 / span 4;

				@media (width <= 1080px) {
					color: white;
					mix-blend-mode: difference;
					z-index: 3;
				}

				@media (width <= 678px) {
					grid-column: 1 / span 5;
				}
			}
			.city {
				grid-column: 5 / span 1;

				@media (width <= 1080px) {
					color: white;
					mix-blend-mode: difference;
					z-index: 3;
				}

				@media (width <= 678px) {
					display: none;
				}
			}
			.year {
				grid-column: 6 / span 1;
				text-align: right;

				@media (width <= 1080px) {
					color: white;
					mix-blend-mode: difference;
					z-index: 3;
				}
			}
			.img-wrapper {
				pointer-events: none;
				height: calc(100vh - var(--sp-50)*2);
				max-width: 50vw;
				position: fixed;
				z-index: 2;
				top: 50%;
				transform: translateY(-50%);

				@media (width <= 678px) {
					display: none;
				}

				.img {
					height: 100%;
					width: 100%;
					object-fit: contain;
					align-content: center;
				}
			}
			&.personal {
				.img-wrapper {
					left: calc((((100vw - var(--sp-16)*2) - var(--sp-6)*19)/20)*8 + var(--sp-6)*8 + var(--sp-16));

					@media (width <= 1080px) {
						left: 50%;
						transform: translateX(-50%) translateY(-50%);
						max-width: unset;
					}
				}
			}
			&.commission {
				.img-wrapper {
					right: calc((((100vw - var(--sp-16)*2) - var(--sp-6)*19)/20)*8 + var(--sp-6)*8 + var(--sp-16));

					@media (width <= 1080px) {
						left: 50%;
						right: unset;
						transform: translateX(-50%) translateY(-50%);
						max-width: unset;
					}
				}
			}
			&:hover>* {
				text-decoration: underline;
			}
		}
	}
</style>