<script>
import Vue from 'vue';
import methods from '../../methods';
import cQuestion from './cQuestion.vue';
import cEditQuestion from './cEditQuestion.vue';
import cCategory from './cCategory.vue';
import config from '../../config'; // eslint-disable-line no-unused-vars

export default{
	name: 'cNewSurvey',
	props: ['surveyCategory'],
	components: {
		cQuestion,
		cCategory,
		cEditQuestion,
	},
	computed: {
		categories() {
			return this.$store.state.categories.categories;
		},
		enterpriseId() {
			return this.$store.state.selectedEnterprise;
		},
		currentSurvey() {
			return this.$store.state.currentSurvey;
		},
	},
	mounted() {
		this.$store.dispatch('CHANGE_CURRENT_SURVEY', { id: '' });
		this.AddRemoveError();
	},
	data() {
		return {
			url: config.url,
			questions: [],
			question: {},
			questionIndex: 0,
			saved: false,
			selectedCategory: '',
		};
	},
	methods: {
		getSelectedCategory(id) {
			const selectedIndex = this.categories
				.findIndex(category => category.id === id);
			if (selectedIndex >= 0) {
				this.selectedCategory = this.categories[selectedIndex].name;
			}
		},
		addQuestion(result) {
			this.questions.push(result.newQuestion);
			this.questions[this.questions.length - 1].id = result.id;
		},
		editQuestion(result) {
			this.edited = true;
			this.questions.splice(this.questionIndex, 1, result);
		},
		removeQuestion(question, number) {
			this.$store.dispatch('DELETE_QUESTION', question.id).then(() => {
				this.questions.splice(number, 1);
			});
		},
		setEditingQuestion(question, index) {
			this.question = question;
			this.$store.dispatch('CHANGE_CURRENT_QUESTION', { id: question.id });
			this.questionIndex = index;
		},
		AddRemoveError() {
			const inputs = Array.from(document.querySelectorAll('#new-survey input'));

			inputs.map((input) => {
				input.addEventListener('focus', this.removeError);
			});
		},
		removeError(event) {
			methods.removeError(event);
		},
		createSurvey(title, category) {
			return {
				axis_id: category,
				enterprise_id: this.enterpriseId,
				name: title,
				description: title,
			};
		},
		validate() {
			let valid = true;
			const title = document.querySelector('.new-survey__title');
			const category = document.querySelector('.new-survey__category');

			methods.cleanAllErros(document.querySelector('#new-survey'));

			if (title.value === '') {
				methods.addError(title.parentNode, Vue.i18n.translate('required-field'));
				valid = false;
			}
			if (category.value === '') {
				methods.addError(category.parentNode, Vue.i18n.translate('required-category'));
				valid = false;
			}

			if (valid) {
				const newSurvey = this.createSurvey(title.value, category.value);
				this.$store.dispatch('SAVE_SURVEY', newSurvey).then(() => {
					this.getSelectedCategory(category.value);
					this.saved = true;
				});
			}
		},
		checkCategory(event) {
			if (event.target.value === 'new-category') {
				$('#new-category').modal('show');
			}
		},
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'new' | translate | capitalize }} {{ 'survey' | translate }}</h1>
		</section>

		<!-- Main content -->
		<section class="content" id="new-survey">
			<div class="row">
				<div class="col-md-6">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">{{ 'data' | translate | capitalize }}</h3>
						</div>
						<div class="box-body">
							<div class="form-group">
								<label>{{ 'title' | translate | capitalize }}</label>
								<input type="text" class="form-control new-survey__title" :placeholder="'title' | translate | capitalize">
			                </div>
			                <div class="form-group" v-if="saved">
								<label>{{ 'categoria' | translate | capitalize }}</label>
								<input type="text" class="form-control survey__category" :value="selectedCategory" disabled>
			                </div>
							<div class="form-group" v-else>
								<label>{{ 'categoria' | translate | capitalize }}</label>
								<select class="form-control new-survey__category" :value="this.surveyCategory" @change="checkCategory($event)"  @focus="removeError($event)">
									<option value="">{{ 'select' | translate | capitalize }} {{ 'category' | translate }}</option>
									<option v-for="(category, index) in categories" :value="category.id">{{ category.name }}</option>
									<option value="new-category">{{ 'insert' | translate | capitalize }} {{ 'new' | translate }} {{ 'category' | translate }}</option>
								</select>
			                </div>
							<button type="button" class="btn btn-block btn-success" @click="validate()">{{ 'register' | translate | capitalize }} {{ 'survey' | translate }}</button>
						</div>
					</div>
				</div>
				<div class="col-md-6" v-if="currentSurvey != ''">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">{{ 'questions' | translate | capitalize }}</h3>
						</div>
						<div class="box-body">
							<div class="box-group" id="accordion">
				                <!-- we are adding the .panel class so bootstrap.js collapse plugin detects it -->
				                <div class="panel box" v-for="(question, index) in questions">
				                	<div class="box-header with-border">
				                    	<h4 class="box-title">
				                    		<a data-toggle="collapse" data-parent="#accordion" :href="'#collapse'+index" aria-expanded="false" class="collapsed">
				                    			{{ question.name }}
				                    		</a>
				                    	</h4>
				                    	<button type="button" aria-label="Excluir" class="close" @click="removeQuestion(question, index)"><span aria-hidden="true">×</span></button>
				                    	<button type="button" aria-label="Editar" data-toggle="modal" data-target="#edit-question" class="edit-button" @click="setEditingQuestion(question, index)"><i class="fa fa-edit"></i></button>
				                	</div>
				                	<div :id="'collapse'+index" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
				                		<div class="box-body">
						                    <div class="row">
												<div class="col-md-12" v-if="question.type != 'textarea'">
													<h4>{{ 'answers' | translate | capitalize }}</h4>
												</div>

												<div class="col-md-4" v-for="answer in question.answers" v-if="question.type != 'textarea'">
													<h5>{{ answer.title }}</h5>
													<img :src="url+answer.image_path" alt="image" v-if="answer.image_path" class="answer_img">
												</div>
												<div class="col-md-12" v-if="question.type == 'textarea'">
													<h5>{{ 'textarea' | translate | capitalize }}</h5>
												</div>
											</div>
				                    	</div>
				                	</div>
				                </div>
				            </div>
							<button type="button" class="btn btn-block btn-warning" data-toggle="modal" data-target="#new-question">{{ 'add' | translate | capitalize }} {{ 'question' | translate }}</button>
						</div>
					</div>
				</div>

				<c-question v-on:newQuestion="addQuestion"></c-question>
				<c-edit-question v-on:editQuestion="editQuestion" :question="this.question"></c-edit-question>
				<c-category></c-category>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>

<style scoped>
	.answer_img {
		max-width: 100%;
	}
</style>
