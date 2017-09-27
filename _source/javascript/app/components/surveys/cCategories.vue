<script>
import Vue from 'vue';
import cCategory from './cCategory.vue';
import cConfirm from '../utilities/cConfirm.vue';

export default {
	name: 'cCategories',
	components: {
		cCategory,
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
			return this.$store.state.categories.categories;
		},
		confirm() {
			return this.$store.state.confirm.state;
		},
		surveys() {
			return this.$store.state.surveys.surveys;
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
			this.$store.dispatch('CHANGE_CONFIRM_MESSAGE', { message: Vue.i18n.translate('remove-category') });
			this.selected = category;
		},
		editCategory(category) {
			this.isEditing = true;
			this.editingCategory = category;
			$('#new-category').modal('show');
		},
		addCategory() {
			this.isEditing = false;
			$('#new-category').modal('show');
		},
		deleteCategory(id) {
			this.$store.dispatch('LOAD_SURVEYS_LIST', id);
			setTimeout(() => {
				if (this.surveys.length > 0) {
					this.surveys.map((survey) => {
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
				<button type="button" class="btn btn-primary pull-right" @click="addCategory()">
					{{ 'add' | translate | capitalize }} {{ 'category' | translate }}
				</button>
			</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="box box-solid">
				<div v-if="categories.length < 1" class="alert alert-info">
					{{ 'no-categories' | translate }}
				</div>
				<div class="box-body no-padding" v-else>
					<ul class="nav nav-pills nav-stacked">
						<li v-for="category in categories">
							<router-link :to="'/surveys/category/'+category.id">
								<i :class="'fa '+category.icon_name"></i> {{ category.name }}

								<button type="button" aria-label="Editar" data-toggle="modal" data-target="#new-category" class="edit-button" @click.stop.prevent="editCategory(category)"><i class="fa fa-edit"></i></button>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</section>
		<c-category :category="this.editingCategory" :isEditing="this.isEditing"></c-category>
		<c-confirm></c-confirm>
		<!-- /.content -->
	</div>
</template>
