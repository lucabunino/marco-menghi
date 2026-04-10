<script>
	import Head from '$lib/components/Head.svelte';
	import { urlFor } from '$lib/utils/image';
    import { PortableText } from '@portabletext/svelte';
    import PortableTextStyle from '$lib/components/portableTextStyles/PortableTextStyle.svelte';
	
    let { data } = $props();
	$inspect(data)
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
					<h2>Contact</h2>
					<a class="hover-underline" href="mailto:data.about.email">{data.about.email}</a>
				</div>
			{/if}
			{#if data.about.instagram}
				<div class="instagram">
					<h2>Instagram</h2>
					<a class="hover-underline" href={data.about.instagram.instagramHref} target="_blank" rel="noopener noreferrer">{data.about.instagram.instagramHandle}</a>
				</div>
			{/if}
		</div>
		{#if data.about.clients}
			<div class="clients">
				<h2>Selected clients</h2>
				{#each data.about.clients as client, i}
					{#if client.href}
						<a class="client" href={client.href} target="_blank" rel="noopener noreferrer">{client.title}</a>
					{:else}
						<h3 class="client">{client.title}</h3>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
	<div class="right">
		<div>
			{#if data.about.exhibitions}
				<h2>Exhibitions</h2>
				<div class="exhibitions portableText">
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
			{/if}
			{#if data.about.prizes}
				<div class="prizes portableText">
					<h2>Prizes</h2>
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
			{/if}
		</div>
		<div>
			{#if data.about.exhibitions}
				<div class="exhibitions portableText">
					<h2>Publications</h2>
					{#each data.about.publications as publication, i}
					{$inspect(publication)}
						{#if publication.href || publication.pdf}
							<a class="pubblication hover-underline" href={publication.href ? publication.href : publication.pdf} target="_blank" rel="noopener noreferrer">{publication.title}</a>
						{:else}
							<h3 class="pubblication">{publication.title}</h3>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
</main>

<style>
    #about {
		display: flex;
		column-gap: var(--sp-6);
		padding: var(--sp-100) var(--sp-16) var(--sp-16);
		min-height: calc(100vh - var(--footerHeight));

		@media (width <= 1080px) {
			flex-direction: column;
			row-gap: 5em;
		}

		h2 {
			margin-bottom: 1em;
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

			.content {
				grid-column: 1 / span 10;
				max-width: 600px;

				@media (width <= 678px) {
					grid-row: 2;
					margin-bottom: var(--sp-30);
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
			.clients {
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
			}

			.prizes {
				margin-top: 5em;
			}
		}
	}
</style>