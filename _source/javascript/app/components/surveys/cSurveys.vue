<script>
export default {
	name: 'cSurveys',
	props: ['id'],
	computed: {
		surveys() {
			return this.$store.state.surveys.surveys;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_SURVEYS_LIST', this.id);
	},
	methods: {
		removeSurvey(survey) {
			this.$store.dispatch('DELETE_SURVEY', survey).then(() => {
				this.$store.dispatch('LOAD_SURVEYS_LIST', this.id);
			});
		},
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'surveys' | translate | capitalize }}</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="box box-solid">
				<div v-if="surveys.length < 1" class="alert alert-info">
					{{ 'no-survey' | translate }}
				</div>
				<div class="box-body no-padding" v-else>
					<ul class="nav nav-pills nav-stacked">
						<li v-for="survey in surveys">
							<router-link :to="'/surveys/'+survey.id">
								<i class="fa fa-file-text-o"></i> {{ survey.name }}
								<button type="button" aria-label="Excluir" class="close" @click.stop.prevent="removeSurvey(survey.id)"><span aria-hidden="true">×</span></button>
							</router-link>
						</li>
					</ul>
				</div>

				<router-link :to="`/new-survey/category/${this.id}`" class="btn btn-primary pull-right">{{ 'new' | translate | capitalize }} {{ 'survey' | translate | capitalize }}</router-link>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>

<style scoped>
	.btn-primary {
		margin-top: 20px;
	}
</style>
