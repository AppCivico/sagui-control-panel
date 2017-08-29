<script>
export default {
	name: 'cComplaints',
	computed: {
		notifications() {
			return this.$store.state.complaints;
		},
		selectedEnterprise() {
			return this.$store.state.selectedEnterprise;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_COMPLAINTS_LIST', { enterprise: this.selectedEnterprise, status: 'complaint' });
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
					<!--<template v-for="notification in notifications">
						<div :class="'callout callout-'+ notification.level">
							<h4><router-link :to="notification.link">{{ notification.title }}</router-link></h4>
							<p><router-link :to="notification.link">{{ notification.description }}</router-link></p>
						</div>
					</template>-->
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
