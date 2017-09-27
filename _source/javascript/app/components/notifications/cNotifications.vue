<script>
export default {
	name: 'cNotifications',
	computed: {
		notifications() {
			return this.$store.state.notifications.notifications;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_NOTIFICATIONS_LIST');
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'notifications' | translate | capitalize }}
			</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="box box-solid">
				<div class="box-body">
					<h4>{{ 'not-read' | translate }}</h4>
					<template v-for="notification in notifications">
						<div :class="'callout callout-'+ notification.level">
							<h4><router-link :to="notification.link">{{ notification.title }}</router-link></h4>
							<p><router-link :to="notification.link">{{ notification.description }}</router-link></p>
						</div>
					</template>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>

<style scoped>
	h4 {
		text-transform: uppercase;
	}
</style>
