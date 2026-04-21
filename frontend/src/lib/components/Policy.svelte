<script>
    import { PortableText } from "@portabletext/svelte";
    import PortableTextStylePolicy from "./portableTextStyles/PortableTextStylePolicy.svelte";

    let { policy } = $props()
</script>

<main id="policy">
	{#if policy.title}
		<h1 class="te-l">{policy.title}</h1>
	{/if}
	{#if policy.content}
		<div class="portableText policy">
			<PortableText value={policy.content}
			components={{
				block: {
					normal: PortableTextStylePolicy,
					h3: PortableTextStylePolicy,
					h4: PortableTextStylePolicy,
				},
				listItem: PortableTextStylePolicy,
				marks: {
					link: PortableTextStylePolicy,
				},
			}}/>
		</div>
	{/if}
</main>

<style>
	#policy {
		padding: var(--sp-100) var(--sp-16) var(--sp-16);
		min-height: calc(100vh - var(--footerHeight));
		max-width: 700px;

		h1 {
			margin-bottom: var(--sp-30);
		}
	}
</style>