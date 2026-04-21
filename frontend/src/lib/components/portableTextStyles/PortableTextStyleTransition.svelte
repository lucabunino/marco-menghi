<script>
	import { fade } from 'svelte/transition';
	
    let { 
        portableText,
        children,
    } = $props();

    const value = $derived(portableText.value);
    const style = $derived(value?.style);
    const listItem = $derived(value?.listItem);
	
	const index = $derived.by(() => {
        const blocks = portableText.global.ptBlocks || [];
        return blocks.findIndex(block => block._key === value._key);
    });

	const transitionParams = $derived({
        delay: 100 + (Math.max(0, index) * 30),
        duration: 100
    });
</script>

{#if listItem === 'bullet'}
    <li in:fade|global={transitionParams}>{@render children()}</li>
{:else if value._type === 'link'}
    <a in:fade|global={transitionParams} href={value?.url} target={value?.blank ? '_blank' : undefined}>
        {@render children()}
    </a>
{:else if style === 'normal'}
    <p in:fade|global={transitionParams}>{@render children()}</p>
{:else}
    {@render children()}
{/if}

<style>
    :global(.portableText p + p) {
        margin-top: .428em;
    }
	:global(.portableText ul) {
        margin: 1.1em 0 1.1em 2em;
		list-style: disc;
    }
</style>