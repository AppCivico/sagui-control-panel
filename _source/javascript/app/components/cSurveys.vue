<script>
export default {
	name: 'cSurveys',
	props: ['id'],
	computed: {
		surveys() {
			return this.$store.state.surveys;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_SURVEYS_LIST', this.id);
	},
	methods: {
		removeSurvey(id) {
			console.log(id);
		},
	},
};
</script>

<template>
	<div class="content-wrapper">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'surveys' | translate | capitalize }}</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="box box-solid">
				<div class="box-body no-padding">
					<ul class="nav nav-pills nav-stacked">
						<li v-for="survey in surveys">
							<router-link :to="'/surveys/'+survey.id">
								<i class="fa fa-file-text-o"></i> {{ survey.title }}
								<button type="button" aria-label="Excluir" class="close" @click.stop.prevent="removeSurvey(survey.id)"><span aria-hidden="true">×</span></button>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
