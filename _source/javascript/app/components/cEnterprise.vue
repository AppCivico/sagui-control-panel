<template>
	<div class="content-wrapper">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>
			{{ 'enterprise' | translate }}
			<small>{{ enterprise.name }}</small>
		 	</h1>
			<ol class="breadcrumb">
				<li><router-link to="/"><i class="fa fa-dashboard"></i>{{ 'enterprises' | translate }}</router-link></li>
				<li class="active">{{ enterprise.name }}</li>
			</ol>
		</section>

		<!-- Main content -->
		<section class="content">
		</section>
		<!-- /.content -->
	</div>
</template>

<script>
export default {
	name: 'cEnterprise',
	props: ['id'],
	computed: {
		enterprise() {
			return this.$store.state.enterprise;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_ENTERPRISE', this.id);
	},
};
</script>
