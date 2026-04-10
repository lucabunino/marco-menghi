<script>
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { innerWidth } from "svelte/reactivity/window";
    import { getMenu } from '$lib/stores/menu.svelte.js';
    let menuer = getMenu();

	let view = $derived(page.url.searchParams.get('view') || 'grid');
</script>

<header>
    <nav class="{menuer.open ? 'open' : 'closed'}" aria-label="Main navigation">
        <a href="/" class="logo menu-item hover-underline" aria-label="Marco Menghi" onclick={() => {menuer.setOpen(false);}}>Marco Menghi</a>
		{#if !page.url.pathname.startsWith('/works/')}
			<ul id="main-menu" class="menu {menuer.open ? 'open' : 'closed'}">
				<li class="works">
					<a class="menu-item hover-underline" aria-current={page.url.pathname.startsWith('/works') ? 'page' : undefined} href="/works" onclick={() => {menuer.setOpen(false)}}>Works</a>
					{#if page.url.pathname === '/works'}
						<ul id="secondary-menu" class="submenu {menuer.open ? 'open' : 'closed'}">
							<li><a class="menu-item hover-underline" aria-current={view == 'grid' ? true : undefined} href="?view=grid" onclick={() => {menuer.setOpen(false)}}>Grid</a><span class="comma">,</span></li>
							<li><a class="menu-item hover-underline" aria-current={view == 'list' ? true : undefined} href="?view=list" onclick={() => {menuer.setOpen(false)}}>List</a></li>
						</ul>
					{/if}
				</li>
				<li class="about"><a class="menu-item hover-underline" aria-current={page.url.pathname.startsWith('/about') ? 'page' : undefined} href="/about" onclick={() => {menuer.setOpen(false)}}>About</a></li>
				<li class="video"><a class="menu-item hover-underline" aria-current={page.url.pathname.startsWith('/video') ? 'page' : undefined} href="/video" onclick={() => {menuer.setOpen(false)}}>Video</a></li>
			</ul>
		{/if}
		<div class="right-menu">
			{#if page.url.pathname.startsWith('/works/')}
				<a class="close menu-item hover-underline" href="/works" onclick={() => {menuer.setOpen(false)}}>Close</a>
			{/if}
			<button class="menu-item hover-underline mode-switch" aria-pressed={menuer.dark} onclick={() => {menuer.setDark(!menuer.dark);}}>Dark mode</button>
		</div>
    </nav>
</header>

<style>
header {
    nav {
		mix-blend-mode: difference;
		color: white;
        display: flex;
        justify-content: space-between;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        align-items: center;
        z-index: 10;
		padding: var(--sp-24) var(--sp-16);

		@media (width <= 1080px) {
			color: var(--black);
			mix-blend-mode: normal;
			background-color: var(--white);
			padding: var(--sp-40) var(--sp-12) var(--sp-20);
			column-gap: var(--sp-12);
			flex-wrap: wrap;
		}

        .menu {
            display: flex;
            list-style: none;
            margin: 0;
			column-gap: var(--sp-40);
			position: fixed;
			top: var(--sp-24);
			left: 50%;
			transform: translateX(-50%);
			z-index: 11;

			@media (width <= 1080px) {
				position: fixed;
				bottom: 0;
				top: unset;
				padding: var(--sp-20) var(--sp-12) var(--sp-40);
				background-color: var(--white);
				width: 100%;
				justify-content: space-between;
				column-gap: var(--sp-12);
				flex-wrap: wrap;
				transform: none;
				left: 0;
			}

			.submenu {
				margin-top: 1em;
				position: absolute;
				left: 0;
				display: flex;
				width: fit-content;
				column-gap: var(--sp-6);

				@media (width <= 1080px) {
					bottom: unset;
					position: fixed;
					top: 0;
					margin-top: var(--headerHeight);
					left: 50%;
					transform: translateX(-50%);
					column-gap: var(--sp-30);
					display: flex;

					.comma {
						display: none;
					}
				}
			}
			.works {
				>a {
					direction: rtl;
					width: 2.6em;
				}
			}
			.video>a {
				width: 2.6em;
			}
        }

		.right-menu {
			display: flex;
			column-gap: var(--sp-40);

			.close {
				@media (width <= 1080px) {
					position: fixed;
					top: calc(var(--headerHeight) + var(--sp-12));
					right: 0;
					padding: var(--sp-24) var(--sp-12);
				}
			}
		}

		.menu-item {
			&[aria-current=true],
			&[aria-current="page"],
			&[aria-pressed=true] {
				text-decoration: underline;
			}
		}
    }
}
</style>