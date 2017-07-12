<template>
	<div class="content-wrapper">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>
			Empreendimento {{ enterprise.name }}
		 	</h1>
			<ol class="breadcrumb">
				<li><router-link to="/"><i class="fa fa-dashboard"></i>Empreendimento</router-link></li>
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
	name: 'Enterprise',
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
