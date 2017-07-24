<script>
import cQuestion from './cQuestion.vue';

export default{
	name: 'cNewSurvey',
	components: {
		cQuestion,
	},
	data() {
		return {
			categories: ['Moradia', 'Alimentação', 'Locomoção'],
			questions: [],
		};
	},
	methods: {
		addQuestion(result) {
			this.questions.push(result);
		},
	},
};
</script>

<template>
	<div class="content-wrapper">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'new' | translate | capitalize }} {{ 'survey' | translate }}</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-6">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">Dados</h3>
						</div>
						<div class="box-body">
							<div class="form-group">
								<label>{{ 'title' | translate | capitalize }}</label>
								<input type="text" class="form-control" :placeholder="'title' | translate | capitalize">
			                </div>
							<div class="form-group">
								<label>{{ 'categoria' | translate | capitalize }}</label>
								<select class="form-control">
									<option v-for="categorie in categories">{{ categorie }}</option>
								</select>
			                </div>
			                <button type="button" class="btn btn-block btn-success">{{ 'register' | translate | capitalize }} {{ 'survey' | translate }}</button>
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
				                    	<button type="button" aria-label="Excluir" class="close"><span aria-hidden="true">×</span></button>
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
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
