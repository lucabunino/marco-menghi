<script>
    import Head from '$lib/components/Head.svelte';
    import Policy from '$lib/components/Policy.svelte';
	let { data } = $props()
	let policy = $derived(data.privacy[0]);
</script>

<Head/>

{#if policy}
	<Policy {policy} />
{/if}