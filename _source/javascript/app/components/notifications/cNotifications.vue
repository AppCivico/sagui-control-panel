<script>
export default {
	name: 'cNotifications',
	computed: {
		notifications() {
			return this.$store.state.notifications.notifications;
		},
	},
	data() {
		return {
			types: {
				enterprise: 'enterprises',
				complaint: 'complaint',
				complaint_comment: 'complaint',
				comment: 'complaint',
			},
		};
	},
	mounted() {
		this.$store.dispatch('LOAD_NOTIFICATIONS_LIST');
	},
	methods: {
		createLink(i) {
			let link = '';
			if (this.types[this.notifications[i].resource_type]) {
				link = `${this.types[this.notifications[i].resource_type]}/${this.notifications[i].resource_id}`;
			}

			return link;
		},
		clearNotifications() {
			this.$store.dispatch('UPDATE_NOTIFICATIONS').then(() => {
				this.$store.dispatch('LOAD_NOTIFICATIONS_LIST');
			});
		},
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
				<div v-if="notifications.length <= 0" class="alert alert-info">
					{{ 'no-notifications' | translate | capitalize }}
				</div>
				<div class="box-body" v-else>
					<h4>{{ 'not-read' | translate }}</h4>
					<template v-for="(notification, index) in notifications">
						<div class="callout callout-info">
							<h4><router-link :to="createLink(index)">{{ notification.title }}</router-link></h4>
							<p><router-link :to="createLink(index)">{{ notification.content }}</router-link></p>
						</div>
					</template>
					<button type="button" class="btn btn-danger pull-right" @click="clearNotifications()">{{ 'mark-as-read' | translate | capitalize }}</button>
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
