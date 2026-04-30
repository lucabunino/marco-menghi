<script>
	import "../scss/typography.scss";
	import "../scss/reset.scss";
	import "../scss/main.scss";

	import favicon from '$lib/assets/favicon.svg';
    import Header from '$lib/components/Header.svelte';
	import { getMenu } from '$lib/stores/menu.svelte.js';
    import Footer from "$lib/components/Footer.svelte";
    import { page } from "$app/state";
    import { onMount } from "svelte";
	
    let menuer = getMenu();
	let { data, children } = $props();
	let cookieAccepted = $state(true);

    onMount(() => {
        if (localStorage.getItem('cookie-accepted') !== 'true') {
            cookieAccepted = false;
        }
    });

    function acceptCookies() {
        localStorage.setItem('cookie-accepted', 'true');
        cookieAccepted = true;
    }
</script>

<svelte:head>
	<script defer src="https://cloud.umami.is/script.js" data-website-id="bce2337a-0ae8-416c-bd60-d4f1c0bc8028"></script>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="site-wrapper" class="te-m" style="--white: {menuer.dark ? '#000' : '#fff'}; --black: {menuer.dark ? '#fff' : '#000'}">
	<Header />
	{@render children()}
	{#if !cookieAccepted}
        <div class="cookie-banner">
            <p>This website uses only technical cookies, which are necessary for its proper functioning. No profiling or third-party cookies are used. For more details, please consult our <a class="underline" href="/policy/cookies">cookies</a> and <a class="underline" href="/policy/privacy">privacy</a> policies.</p>
            <button class="hover-underline" onclick={acceptCookies}>
                Ok, I understand
            </button>
        </div>
    {/if}
	{#if page.url.pathname === '/works' || page.url.pathname === '/about' || page.url.pathname.startsWith('/policy')}
		<Footer policies={data.policies} logo={data.logo}/>
	{/if}
</div>

<style lang="scss">
#site-wrapper {
	color: var(--black);
	background-color: var(--white);
	min-height: 100vh;
	top: 0;
	position: absolute;
	width: 100%;

	.cookie-banner {
		position: fixed;
		bottom: var(--sp-24);
		left: var(--sp-16);
		z-index: 10;
		max-width: 600px;
		background: var(--white);
		padding: var(--sp-16);
		display: flex;
		flex-direction: column;
		gap: var(--sp-16);
		box-shadow: 0 4px 12px color-mix(in srgb, var(--black), transparent 90%);

		@media (width <= 678px) {
			left: 0;
			bottom: 0;
			max-width: unset;
			gap: var(--sp-24);
			padding: var(--sp-24) var(--sp-16);
		}
		
		button {
			align-self: flex-start;
		}
	}
}
</style>