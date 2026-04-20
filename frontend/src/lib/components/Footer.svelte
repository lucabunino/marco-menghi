<script>
	let { policies } = $props()
</script>

<footer class="te-s">
	<p>© {new Date().getFullYear()} Marco Menghi</p>
	{#if policies}
		<div class="policies">
			{#each policies as policy, i}
				<a class="hover-underline" href="/policy/{policy.slug.current}">{policy.title}</a>
			{/each}
		</div>
	{/if}
</footer>

<style lang="scss">
footer {
	padding: var(--sp-100) var(--sp-16) var(--sp-24);
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	position: relative;

	@media (width <= 1080px) {
		padding-bottom: calc(var(--footerHeight) + var(--sp-40) - var(--sp-12));
		gap: var(--sp-6);
		justify-content: center;
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