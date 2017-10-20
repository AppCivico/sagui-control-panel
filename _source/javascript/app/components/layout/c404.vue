<script>
export default {
	name: 'c404',
	mounted() {
		const body = document.querySelector('body');
		body.classList.add('login-page');
	},
};
</script>

<template>
	<div>
		<div class="error-page">
			<h2 class="headline text-yellow"> 404</h2>

			<div class="error-content">
				<h3><i class="fa fa-warning text-yellow"></i> {{ 'error404-title' | translate }}</h3>

				<p>
					{{ 'error404-text' | translate }}</p>
					<router-link to="/">{{ 'error404-link' | translate }}</router-link>.
				</p>
			</div>
		</div>
		<c-footer></c-footer>
	</div>
</template>

<style scoped>
	.error-page {
		background: #fff;
	    display: table;
	    padding: 20px;
	    border-radius: 1em;
	}
</style>
