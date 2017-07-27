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

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'choose_enterprise' | translate }}</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-6" v-for="enterprise in enterprises">
					<div class="info-box">
						<span class="info-box-icon bg-aqua"><i class="ion ion-ios-gear-outline"></i></span>

						<div class="info-box-content">
							<span class="info-box-text">
								<router-link :to="'/enterprises/'+enterprise.id">{{ enterprise.name }}</router-link>
								<p>{{ enterprise.location.human_address }}</p>
								<ul class="list-unstyled">
									<li>{{ enterprise.data.complaints }} {{ 'complaints' | translate }}</li>
									<li>{{ enterprise.data.cases }} {{ 'cases' | translate }}</li>
									<li>{{ enterprise.data.actions }} {{ 'actions' | translate }}</li>
									<li>{{ enterprise.data.surveys }} {{ 'surveys_completed' | translate }}</li>
								</ul>
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
