<script>
import cCategorie from './cCategorie.vue';

export default {
	name: 'cCategories',
	components: {
		cCategorie,
	},
	data() {
		return {
			isEditing: true,
			editingCategory: {},
		};
	},
	computed: {
		categories() {
			return this.$store.state.categories;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_CATEGORIES_LIST');
	},
	methods: {
		removeCategory(category) {
			this.$store.dispatch('DELETE_CATEGORY', category);
			// Using timeout because there's no real API and I need to simulate it
			setTimeout(() => {
				this.$store.dispatch('LOAD_CATEGORIES_LIST', this.id);
			}, 100);
		},
		editCategorie(category) {
			this.editingCategory = category;
			$('#new-category').modal('show'); // eslint-disable-line no-undef
		},
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
							<router-link :to="'/surveys/category/'+category.id">
								<i class="fa fa-list"></i> {{ category.title }}

								<button type="button" aria-label="Excluir" class="close" @click.stop.prevent="removeCategory(category.id)"><span aria-hidden="true">×</span></button>
								<button type="button" aria-label="Editar" data-toggle="modal" data-target="#new-category" class="edit-button" @click.stop.prevent="editCategorie(category)"><i class="fa fa-edit"></i></button>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</section>
		<c-categorie :category="this.editingCategory" :isEditing="this.isEditing"></c-categorie>
		<!-- /.content -->
	</div>
</template>

<style scoped>
	.edit-button {
		padding: 0;
		cursor: pointer;
		background: transparent;
		border: 0;
		-webkit-appearance: none;
		float: right;
		font-size: 21px;
		font-weight: 700;
		line-height: 1;
		color: #f39c12;
		text-shadow: 0 1px 0 #fff;
		margin-right: 1%;
	}
	.edit-button:hover {
		color: #000;
	}
</style>
