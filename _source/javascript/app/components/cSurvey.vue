<script>
import methods from '../methods';
import cQuestion from './cQuestion.vue';
import cCategorie from './cCategorie.vue';

export default{
	name: 'cSurvey',
	props: ['id'],
	components: {
		cQuestion,
		cCategorie,
	},
	data() {
		return {
			edited: false,
		};
	},
	computed: {
		categories() {
			return this.$store.state.categories;
		},
		survey() {
			return this.$store.state.survey;
		},
		questions() {
			return this.$store.state.survey.questions;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_CATEGORIES_LIST');
		this.$store.dispatch('LOAD_SURVEY', this.id);
	},
	methods: {
		addQuestion(result) {
			this.edited = true;
			this.questions.push(result);
		},
		removeQuestion(number) {
			this.questions.splice(number, 1);
		},
		removeError(event) {
			this.edited = true;
			methods.removeError(event);
		},
		createSurvey(title, category) {
			return {
				title,
				category,
				questions: this.questions,
			};
		},
		validate() {
			let valid = true;
			const title = document.querySelector('.survey__title');
			const category = document.querySelector('.survey__category');

			methods.cleanAllErros(document.querySelector('#survey'));

			if (title.value === '') {
				methods.addError(title.parentNode, 'Este campo é obrigatório.');
				valid = false;
			}
			if (category.value === '') {
				methods.addError(category.parentNode, 'É necessário selecionar a categoria da enquete.');
				valid = false;
			}
			if (this.questions.length < 1) {
				this.$store.dispatch('CHANGE_ALERT_MESSAGE', 'É obrigatório inserir pelo menos uma pergunta.');
				valid = false;
			}

			if (valid) {
				if (this.edited) {
					const edited = this.createSurvey(title.value, category.value);
					this.$store.dispatch('EDIT_SURVEY', { id: this.survey.id, survey: edited });
				} else {
					this.$store.dispatch('CHANGE_ALERT_MESSAGE', 'Nenhuma alteração foi efetuada.');
				}
			}
		},
		checkCategorie(event) {
			if (event.target.value === 'new-category') {
				$('#new-category').modal('show'); // eslint-disable-line no-undef
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
		<section class="content" id="survey">
			<div class="row">
				<div class="col-md-6">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">Dados</h3>
						</div>
						<div class="box-body">
							<div class="form-group">
								<label>{{ 'title' | translate | capitalize }}</label>
								<input type="text" class="form-control survey__title" :placeholder="'title' | translate | capitalize" @focus="removeError($event)" :value="survey.title">
			                </div>
							<div class="form-group">
								<label>{{ 'categoria' | translate | capitalize }}</label>
								<select class="form-control survey__category" @focus="removeError($event)" :value="survey.category" @change="checkCategorie($event)">
									<option value="">Selecione a categoria</option>
									<option v-for="(category, index) in categories" :value="index + 1">{{ category.title }}</option>
									<option value="new-category">Inserir nova categoria</option>
								</select>
			                </div>
			                <button type="button" class="btn btn-block btn-success" @click="validate()">{{ 'save' | translate | capitalize }} {{ 'edits' | translate }}</button>
						</div>
					</div>
				</div>
				<div class="col-md-6">
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
				                    			{{ question.title }}
				                    		</a>
				                    	</h4>
				                    	<button type="button" aria-label="Excluir" class="close" @click="removeQuestion(index)"><span aria-hidden="true">×</span></button>
				                	</div>
				                	<div :id="'collapse'+index" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
				                		<div class="box-body">
						                    <div class="row">
												<div class="col-md-12" v-if="question.type != 'textarea'">
													<h4>{{ 'answers' | translate | capitalize }}</h4>
												</div>

												<div class="col-md-4" v-for="answer in question.answers" v-if="question.type != 'textarea'">
													<h5>{{ answer.title }}</h5>
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
				<c-categorie></c-categorie>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
