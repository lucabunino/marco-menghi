<script>
	let { policies, logo } = $props()
</script>

<footer class="te-s">
	<div class="footer-left">
		{#if logo}
			<div class="logo">
				{@html logo}
			</div>
		{/if}
		<p>© {new Date().getFullYear()} Marco Menghi</p>
	</div>
	{#if policies}
		<div class="policies footer-right">
			{#each policies as policy, i}
				<a class="hover-underline" href="/policy/{policy.slug.current}">{policy.title}</a>
			{/each}
		</div>
	{/if}
</footer>

<style lang="scss">
footer {
	padding: var(--sp-100) var(--sp-16) var(--sp-24);
	height: var(--footerHeight);
	display: flex;
	align-items: baseline;
	flex-wrap: wrap;
	justify-content: space-between;
	position: relative;

	@media (width <= 1080px) {
		padding-bottom: calc(var(--footerHeight) + var(--sp-40) - var(--sp-12));
		height: unset;
		gap: var(--sp-6);
		justify-content: center;
	}

	.footer-left {
		display: flex;
		align-items: baseline;
		column-gap: var(--sp-16);
		height: 100%;

		@media (width <= 1080px) {
			flex-direction: column;
			align-items: center;
			row-gap: var(--sp-16);
		}

		.logo {
			height: 100%;
			width: auto;

			@media (width <= 1080px) {
				height: 5rem;
			}

			:global(svg) {
				fill: var(--black);
				height: 100%;
				width: auto;
			}
		}
	}

	.policies {
		display: flex;
		column-gap: var(--sp-20);

		@media (width <= 1080px) {
			position: relative;
			flex-basis: 100%;
			gap: var(--sp-6);
			justify-content: center;
			flex-direction: column;
			text-align: center;
			margin-bottom: var(--sp-12);
		}
	}
}
</style>