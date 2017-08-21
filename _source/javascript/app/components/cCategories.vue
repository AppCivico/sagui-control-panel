<script>
import cCategorie from './cCategorie.vue';
import cConfirm from './cConfirm.vue';

export default {
	name: 'cCategories',
	components: {
		cCategorie,
		cConfirm,
	},
	data() {
		return {
			isEditing: true,
			editingCategory: {},
			selected: -1,
		};
	},
	computed: {
		categories() {
			return this.$store.state.categories;
		},
		confirm() {
			return this.$store.state.confirm.state;
		},
		surveys() {
			return this.$store.state.surveys;
		},
	},
	watch: {
		confirm(newValue) {
			if (newValue === true) {
				this.deleteCategory(this.selected);
			}
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_CATEGORIES_LIST');
	},
	methods: {
		removeSurvey(id) {
			this.$store.dispatch('DELETE_SURVEY', id);
		},
		removeCategory(category) { // eslint-disable-line no-unused-vars
			this.$store.dispatch('CHANGE_CONFIRM_MESSAGE', { message: 'As enquetes cadastradas nesta categoria também serão excluídas, tem certeza que deseja deleter esta categoria?' });
			this.selected = category;
		},
		editCategorie(category) {
			this.isEditing = true;
			this.editingCategory = category;
			$('#new-category').modal('show'); // eslint-disable-line no-undef
		},
		addCategorie() {
			this.isEditing = false;
			$('#new-category').modal('show'); // eslint-disable-line no-undef
		},
		deleteCategory(id) {
			this.$store.dispatch('LOAD_SURVEYS_LIST', id);
			setTimeout(() => {
				if (this.surveys.length > 0) {
					this.surveys.map((survey) => { // eslint-disable-line array-callback-return
						this.removeSurvey(survey.id);
					});
				}
				this.$store.dispatch('DELETE_CATEGORY', id);
				setTimeout(() => {
					this.$store.dispatch('EDIT_CONFIRM_STATE', false);
					this.$store.dispatch('LOAD_CATEGORIES_LIST');
				}, 1000);
			}, 100);
		},
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'categories' | translate | capitalize }}
				<button type="button" class="btn btn-primary pull-right" @click="addCategorie()">
					{{ 'add' | translate | capitalize }} {{ 'categorie' | translate }}
				</button>
			</h1>
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
		<c-confirm></c-confirm>
		<!-- /.content -->
	</div>
</template>
