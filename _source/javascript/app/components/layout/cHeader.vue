<script>
import config from '../../config'; // eslint-disable-line no-unused-vars

export default {
	name: 'cHeader',
	computed: {
		apiKey() {
			return this.$store.state.auth.apiKey;
		},
		user() {
			return this.$store.state.auth.user;
		},
		notifications() {
			return this.$store.state.notifications.notifications;
		},
		name() {
			let final = '';
			const fullName = config.name.split(' ');
			fullName.map((word, i) => {
				if (i === 0) {
					final = `<b>${word}</b>`;
				} else {
					final = `${final} ${word}`;
				}
			});
			return final;
		},
		initials() {
			let final = '';
			const fullName = config.name.split(' ');
			fullName.map((word, i) => {
				if (i === 0) {
					final = `<b>${word[0]}</b>`;
				} else {
					final = `${final} ${word[0]}`;
				}
			});
			return final;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_NOTIFICATIONS_LIST');

		// check if api-key exists, if yes, load user data
		if (Object.keys(this.user).length === 0 && this.apiKey) {
			this.$store.dispatch('LOAD_USER');
		}
	},
	methods: {
		logout() {
			sessionStorage.removeItem('api-key');
			this.$store.dispatch('SIGNOUT');
			this.$router.push('/');
		},
	},
};
</script>

<template>
	<header class="main-header">
		<!-- Logo -->
		<a href="/" class="logo">
			<!-- mini logo for sidebar mini 50x50 pixels -->
			<span class="logo-mini" v-html="initials"></span>
			<!-- logo for regular state and mobile devices -->
			<span class="logo-lg" v-html="name"></span>
		</a>
		<!-- Header Navbar: style can be found in header.less -->
		<nav class="navbar navbar-static-top">
			<!-- Sidebar toggle button-->
			<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
			<span class="sr-only">{{ 'toggle-navigation' | translate | capitalize }}</span>
			</a>

			<div class="navbar-custom-menu">
				<ul class="nav navbar-nav">
					<!-- Notifications: style can be found in dropdown.less -->
					<li class="dropdown notifications-menu">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<i class="fa fa-bell-o"></i>
							<span class="label label-warning">{{ notifications.length }}</span>
						</a>
						<ul class="dropdown-menu">
							<li class="header">{{ 'you-have' | translate | capitalize }} {{ notifications.length }} {{ 'notifications' | translate }}</li>
							<li>
								<!-- inner menu: contains the actual data -->
								<ul class="menu">
									<li v-for="notification in notifications">
										<router-link :to="notification.link">{{ notification.title }}</router-link>
								 	</li>
								</ul>
							</li>
							<li class="footer"><router-link to="notifications">{{ 'view-all' | translate }}</router-link></li>
						</ul>
					</li>
					<!-- User Account: style can be found in dropdown.less -->
					<li class="dropdown user user-menu">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<img src="dist/img/user-default.png" class="user-image" alt="User Image">
							<span class="hidden-xs">{{ user.name }}</span>
						</a>
						<ul class="dropdown-menu">
							<!-- Menu Footer-->
							<li class="user-body">
								{{ user.email }}
							</li>
							<li class="user-footer">
								<div class="pull-right">
									<a href="#" class="btn btn-default btn-flat" @click.prevent="logout()">{{ 'sign-out' | translate | capitalize }}</a>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>
