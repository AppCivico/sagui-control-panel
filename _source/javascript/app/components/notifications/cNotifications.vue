<script>
import Vue from 'vue';

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
				confirmation: 'complaint',
				submission: 'results',
				survey: 'surveys',
			},
		};
	},
	mounted() {
		this.$store.dispatch('LOAD_NOTIFICATIONS_LIST');
	},
	methods: {
		createLink(i) {
			let link = '';
			if (this.notifications[i].resource_type !== 'submission') {
				if (this.types[this.notifications[i].resource_type]) {
					link = `${this.types[this.notifications[i].resource_type]}/${this.notifications[i].resource_id}`;
				}
			} else {
				link = 'results';
			}

			return link;
		},
		clearNotifications() {
			this.$store.dispatch('UPDATE_NOTIFICATIONS').then(() => {
				this.$store.dispatch('LOAD_NOTIFICATIONS_LIST');
			});
		},
		changeEnterprise(id, index) {
			const link = this.createLink(index);

			if (id) {
				this.$store.dispatch('CHANGE_SELECTED_ENTERPRISE', id).then(() => {
					this.$router.push(link);
				});
			} else {
				this.$store.dispatch('CHANGE_ALERT_MESSAGE', Vue.i18n.translate('request-error'));
			}
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
					<h4>{{ 'not-read' | translate | capitalize }}</h4>
					<template v-for="(notification, index) in notifications">
						<div class="callout callout-info" @click="changeEnterprise(notification.context_id, index)">
							<h4>{{ notification.title }}</h4>
							<p>{{ notification.content }}</p>
						</div>
					</template>
					<button type="button" class="btn btn-danger pull-right" @click="clearNotifications()">{{ 'mark-as-read' | translate | capitalize }}</button>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
