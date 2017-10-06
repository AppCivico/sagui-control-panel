<script>
import config from '../../config'; // eslint-disable-line no-unused-vars

export default {
	name: 'cResults',
	data() {
		return {
			url: config.url,
		};
	},
	computed: {
		surveys() {
			return this.$store.state.surveys.surveys;
		},
		apiKey() {
			return this.$store.state.auth.apiKey;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_SURVEYS_LIST_BY_ENTERPRISE');
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>
				{{ 'results' | translate | capitalize }}
			</h1>
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
							<a :href="url+ '/v1/surveys/'+survey.id+'/reports?api_key='+apiKey" target="_blank">
								<i class="fa fa-file-text-o"></i> {{ survey.name }}
							</a>
						</li>
					</ul>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
