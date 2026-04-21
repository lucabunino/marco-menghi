<script>
    import Policy from '$lib/components/Policy.svelte';
	let { data } = $props()
	let policy = $derived(data.cookies[0]);
</script>

{#if policy}
	<Policy {policy} />
{/if}