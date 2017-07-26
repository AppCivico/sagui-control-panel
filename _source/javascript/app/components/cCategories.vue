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
			<div class="box box-solid">
				<div class="box-body no-padding">
					<ul class="nav nav-pills nav-stacked">
						<li v-for="category in categories">
							<router-link :to="'/surveys/category/'+category.id"><i class="fa fa-list"></i> {{ category.title }}</router-link>
						</li>
					</ul>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
