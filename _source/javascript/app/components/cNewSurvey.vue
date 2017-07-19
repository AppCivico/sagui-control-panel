<script>
import cQuestion from './cQuestion.vue';

export default{
	name: 'cNewSurvey',
	components: {
		cQuestion,
	},
	data() {
		return {
			oi: 'oi',
			categories: ['Moradia', 'Alimentação', 'Locomoção'],
			questions: [
				{
					type: 'farol',
					title: 'Esta satisfeito com a sua moradia?',
					answers: [
						{
							unit: 'red',
							title: 'Não',
						},
						{
							unit: 'yellow',
							title: 'Médio',
						},
						{
							unit: 'green',
							title: 'Sim',
						},
					],
				},
				{
					type: 'farol',
					title: 'Esta satisfeito com a sua moradia?',
					answers: [
						{
							unit: 'red',
							title: 'Não',
						},
						{
							unit: 'yellow',
							title: 'Médio',
						},
						{
							unit: 'green',
							title: 'Sim',
						},
					],
				},
				{
					type: 'farol',
					title: 'Esta satisfeito com a sua moradia?',
					answers: [
						{
							unit: 'red',
							title: 'Não',
						},
						{
							unit: 'yellow',
							title: 'Médio',
						},
						{
							unit: 'green',
							title: 'Sim',
						},
					],
				},
			],
		};
	},
};
</script>

<template>
	<div class="content-wrapper">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'surveys_new' | translate }}</h1>
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
								<label>Text</label>
								<input type="text" class="form-control" placeholder="Nome">
			                </div>
							<div class="form-group">
								<label>Categoria</label>
								<select class="form-control">
									<option v-for="categorie in categories">{{ categorie }}</option>
								</select>
			                </div>
			                <button type="button" class="btn btn-block btn-success">Cadastrar enquete</button>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">Perguntas</h3>
						</div>
						<div class="box-body">
							<div class="box box-warning" v-for="question in questions">
								<div class="box-header with-border">
									<h3 class="box-title">{{ question.title }}</h3>
								</div>
								<div class="box-body">
									<div class="row">
										<div class="col-md-12">
											<h4>Opções de resposta</h4>
										</div>

										<div class="col-md-4" v-for="answer in question.answers">
											<h5>{{ answer.title }}</h5>
										</div>
									</div>
								</div>
							</div>
							<button type="button" class="btn btn-block btn-warning" data-toggle="modal" data-target="#modal-default">Adicionar pergunta</button>
						</div>
					</div>
				</div>
				<c-question></c-question>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>

<style scoped>
	.content-header {
		text-transform: capitalize;
	}
</style>
