<script>
	import Head from '$lib/components/Head.svelte';
	import { urlFor } from '$lib/utils/image.js';
    import { PortableText } from '@portabletext/svelte';
    import PortableTextStyle from '$lib/components/portableTextStyles/PortableTextStyle.svelte';
	
    let { data } = $props()
	let activeSection = $state(null)
	let elements = $state({});
    let heights = $state({});

	function toggleSection(section) {
        if (activeSection === section) {
            activeSection = null;
        } else {
            activeSection = section;
        }
    }

	$effect(() => {
        if (activeSection && elements[activeSection]) {
            heights[activeSection] = elements[activeSection].scrollHeight;
        }
    });
</script>

<Head seo={data.seoSingle} />

<main id="about">
	<div class="left">
		{#if data.about.content}
			<div class="content portableText">
				<PortableText value={data.about.content}
				components={{
					block: {
						normal: PortableTextStyle,
					},
					listItem: PortableTextStyle,
					marks: {
						link: PortableTextStyle,
					},
				}}/>
			</div>
		{/if}
		<div class="contact">
			{#if data.about.email}
				<div class="email">
					<h2 class="section-title">Contact</h2>
					<a class="hover-underline" href="mailto:data.about.email">{data.about.email}</a>
				</div>
			{/if}
			{#if data.about.instagram}
				<div class="instagram">
					<h2 class="section-title">Instagram</h2>
					<a class="hover-underline" href={data.about.instagram.instagramHref} target="_blank" rel="nosection-title noreferrer">{data.about.instagram.instagramHandle}</a>
				</div>
			{/if}
		</div>
		{#if data.about.clients}
			<div class="wrapper clients-wrapper {activeSection === 'clients' ? 'active' : ''}" style="--maxHeight: {heights['clients'] || 0}px">
				<h2 class="section-title" onclick={() => toggleSection('clients')}>Selected clients
					<div class="icon">
						<div class="line horizontal"></div>
						<div class="line vertical"></div>
					</div>
				</h2>
				<div class="clients opener" bind:this={elements['clients']}>
					{#each data.about.clients as client, i}
						{#if client.href}
							<a class="client" href={client.href} target="_blank" rel="nosection-title noreferrer">{client.title}</a>
						{:else}
							<h3 class="client">{client.title}</h3>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<div class="right">
		<div>
			{#if data.about.exhibitions}
				<div class="wrapper exhibitions-wrapper {activeSection === 'exhibitions' ? 'active' : ''}" style="--maxHeight: {heights['exhibitions'] || 0}px">
					<h2 class="section-title" onclick={() => toggleSection('exhibitions')}>Exhibitions
						<div class="icon">
							<div class="line horizontal"></div>
							<div class="line vertical"></div>
						</div>
					</h2>
					<div class="exhibitions opener portableText" bind:this={elements['exhibitions']}>
						<PortableText value={data.about.exhibitions}
						components={{
							block: {
								normal: PortableTextStyle,
							},
							listItem: PortableTextStyle,
							marks: {
								link: PortableTextStyle,
							},
						}}/>
					</div>
				</div>
			{/if}
			{#if data.about.prizes}
				<div class="wrapper prizes-wrapper {activeSection === 'prizes' ? 'active' : ''}" style="--maxHeight: {heights['prizes'] || 0}px">
					<h2 class="section-title" onclick={() => toggleSection('prizes')}>Prizes
						<div class="icon">
							<div class="line horizontal"></div>
							<div class="line vertical"></div>
						</div>
					</h2>
					<div class="prizes opener portableText" bind:this={elements['prizes']}>
						<PortableText value={data.about.prizes}
						components={{
							block: {
								normal: PortableTextStyle,
							},
							listItem: PortableTextStyle,
							marks: {
								link: PortableTextStyle,
							},
						}}/>
					</div>
				</div>
			{/if}
		</div>
		<div>
			{#if data.about.exhibitions}
				<div class="wrapper publications-wrapper {activeSection === 'publications' ? 'active' : ''}" style="--maxHeight: {heights['publications'] || 0}px">
					<h2 class="section-title" onclick={() => toggleSection('publications')}>Publications
						<div class="icon">
							<div class="line horizontal"></div>
							<div class="line vertical"></div>
						</div>
					</h2>
					<div class="publications opener portableText" bind:this={elements['publications']}>
						{#each data.about.publications as publication, i}
							{#if publication.href || publication.pdf}
								<a class="pubblication hover-underline" href={publication.href ? publication.href : publication.pdf} target="_blank" rel="nosection-title noreferrer">{publication.title}</a>
							{:else}
								<h3 class="pubblication">{publication.title}</h3>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</main>

<style lang="scss">
    #about {
		display: flex;
		column-gap: var(--sp-6);
		padding: var(--sp-100) var(--sp-16) var(--sp-16);
		min-height: calc(100vh - var(--footerHeight));

		@media (width <= 1080px) {
			flex-direction: column;
			row-gap: 5em;
		}
		@media (width <= 678px) {
			row-gap: 0;
		}

		.section-title {
			margin-bottom: 1em;
			display: flex;
			justify-content: space-between;

			@media (width <= 678px) {
				cursor: pointer;

				&:hover {
					text-decoration: underline;
				}
			}

			.icon {
				display: none;
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

				@media (width <= 678px) {
					display: inline-block;
				}
			}

			@media (width <= 678px) {
				margin: 0;
				padding: .5em 0;
			}

			@media (cursor: pointer) {
				&:hover {
					text-decoration: underline;
				}
			}
		}

		.left {
			width: 50%;
			display: grid;
			grid-template-columns: repeat(10, 1fr);
			column-gap: var(--sp-6);
			row-gap: 5em;
			height: fit-content;

			@media (width <= 1080px) {
				width: 100%;
				column-gap: var(--sp-40);
				row-gap: var(--sp-30);
			}

			@media (width <= 678px) {
				column-gap: unset;
			}

			.content {
				grid-column: 1 / span 10;
				max-width: 600px;

				@media (width <= 678px) {
					grid-row: 2;
					margin-bottom: var(--sp-30);
					max-width: unset;
				}
			}
			.contact {
				grid-column: 1 / span 3;
				display: flex;
				flex-direction: column;
				row-gap: 2.5em;

				@media (width <= 1080px) {
					grid-column: 1 / span 5;
				}
				@media (width <= 678px) {
					grid-row: 1;
					grid-column: 1 / span 10;
					flex-direction: row;
					flex-wrap: wrap;
					row-gap: 0;
					
					.email {
						display: contents;
						h2 {
							margin: 0;
							width: 20vw;
						}
					}

					.instagram {
						display: contents;
						h2 {
							display: none;
						}
						a {
							flex-basis: 100%;
							margin-left: 20vw;
						}
					}
				}
			}
			.clients-wrapper {
				grid-column: 4 / span 3;

				@media (width <= 1080px) {
					grid-column: 6 / span 5;
				}
				@media (width <= 678px) {
					grid-column: 1 / span 10;
				}
			}
		}

		.right {
			width: 50%;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			column-gap: var(--sp-40);
			row-gap: 5em;

			@media (width <= 1080px) {
				width: 100%;
				column-gap: var(--sp-40);
			}
			@media (width <= 678px) {
				grid-template-columns: repeat(1, 1fr);
				row-gap: 0;
			}

			.prizes-wrapper {
				margin-top: 5em;

				@media (width <= 678px) {
					margin-top: 0;
				}
			}

			.publications {
				display: flex;
				flex-direction: column;
				row-gap: .428em;
			}
		}
	}
	
	.opener {
        @media (width <= 678px) {
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: var(--transition);
        }
    }

    .wrapper {
        &.active {
            .icon {
                .line.vertical {
                    transform: translateX(-50%) rotate(90deg);
                }
            }
            
            .opener {
                @media (width <= 678px) {
                    max-height: var(--maxHeight);
                    opacity: 1;
					padding-top: var(--sp-16);
					margin-bottom: var(--sp-60);
                }
            }
        }
    }
</style>