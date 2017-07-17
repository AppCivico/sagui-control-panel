<template>
	<div class="content-wrapper">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'surveys' | translate }}</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="row">
				<c-question></c-question>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>

<script>
import cQuestion from './cQuestion.vue';

export default{
	name: 'cNewSurvey',
	components: {
		cQuestion,
	},
};
</script>
