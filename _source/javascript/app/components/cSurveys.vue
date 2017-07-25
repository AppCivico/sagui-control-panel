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
			<div class="row">
				<div class="col-md-12" v-for="survey in surveys">
					<div class="info-box">
						<span class="info-box-icon bg-aqua"><i class="ion ion-ios-gear-outline"></i></span>

						<div class="info-box-content">
							<span class="info-box-text">
								<router-link :to="'/surveys/'+survey.id">{{ survey.title }}</router-link>
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
