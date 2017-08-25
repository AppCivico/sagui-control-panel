<script>
export default {
	name: 'cCategories',
	computed: {
		notifications() {
			return this.$store.state.notifications;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_NOTIFICATIONS_LIST');
	},
	methods: {
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
				<div class="box-body no-padding">
					<ul class="nav nav-pills nav-stacked">
						<li v-for="notification in notifications">
							<router-link :to="notification.link">
								<i class="fa fa-list"></i> {{ notification.title }}
							</router-link>
							<p>{{ notification.description }}</p>
						</li>
					</ul>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
