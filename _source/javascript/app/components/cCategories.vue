<script>
export default {
	name: 'cCategories',
	computed: {
		categories() {
			return this.$store.state.categories;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_CATEGORIES_LIST');
	},
};
</script>

<template>
	<div class="content-wrapper">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'categories' | translate | capitalize }}</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-12" v-for="category in categories">
					<div class="info-box">
						<span class="info-box-icon bg-aqua"><i class="ion ion-ios-gear-outline"></i></span>

						<div class="info-box-content">
							<span class="info-box-text">
								<router-link :to="'/surveys/category/'+category.id">{{ category.title }}</router-link>
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
