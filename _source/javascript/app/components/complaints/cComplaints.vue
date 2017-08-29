<script>
export default {
	name: 'cComplaints',
	props: ['status'],
	computed: {
		complaints() {
			return this.$store.state.complaints;
		},
		selectedEnterprise() {
			return this.$store.state.selectedEnterprise;
		},
	},
	watch: {
		status() {
			console.log('mudou');
			this.$store.dispatch('LOAD_COMPLAINTS_LIST', { enterprise: this.selectedEnterprise, status: this.status });
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_COMPLAINTS_LIST', { enterprise: this.selectedEnterprise, status: this.status });
	},
	methods: {
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'complaints' | translate | capitalize }}
			</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="box box-solid">
				<div class="box-body">
					<template v-for="complaint in complaints">
						<div>
							<h4><router-link to="/">{{ complaint.title }}</router-link></h4>
							<p>{{ complaint.description }}</p>
						</div>
					</template>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
