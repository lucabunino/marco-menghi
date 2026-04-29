<script>
	import "../scss/typography.scss";
	import "../scss/reset.scss";
	import "../scss/main.scss";

	import favicon from '$lib/assets/favicon.svg';
    import Header from '$lib/components/Header.svelte';
	import { getMenu } from '$lib/stores/menu.svelte.js';
    import Footer from "$lib/components/Footer.svelte";
    import { page } from "$app/state";
    let menuer = getMenu();
	let { data, children } = $props();
	$inspect(data.logo)
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="site-wrapper" class="te-m" style="--white: {menuer.dark ? '#000' : '#fff'}; --black: {menuer.dark ? '#fff' : '#000'}">
	<Header />
	{@render children()}
	{#if page.url.pathname === '/works' || page.url.pathname === '/about' || page.url.pathname.startsWith('/policy')}
		<Footer policies={data.policies} logo={data.logo}/>
	{/if}
</div>

<style>
#site-wrapper {
	color: var(--black);
	background-color: var(--white);
	min-height: 100vh;
	top: 0;
	position: absolute;
	width: 100%;
}
</style>