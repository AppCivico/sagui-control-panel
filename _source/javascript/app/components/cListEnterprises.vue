<template>
	<div class="content-wrapper">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'enterprises' | translate }}</h1>
			<ol class="breadcrumb">
				<li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
				<li class="active">Empreendimentos</li>
			</ol>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="col-md-6" v-for="enterprise in enterprises" style="border: 1px solid #000;"><router-link :to="'/enterprises/'+enterprise.id">{{ enterprise.name }}</router-link></div>
		</section>
		<!-- /.content -->
	</div>
</template>

<script>
export default {
	name: 'clistEnterprises',
	computed: {
		enterprises() {
			return this.$store.state.enterprises;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_ENTERPRISES_LIST');
	},
};
</script>
