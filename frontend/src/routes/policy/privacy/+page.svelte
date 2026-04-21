<script>
    import Policy from '$lib/components/Policy.svelte';
	let { data } = $props()
	let policy = $derived(data.privacy[0]);
</script>

{#if policy}
	<Policy {policy} />
{/if}