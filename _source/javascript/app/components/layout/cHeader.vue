<script>
export default {
	name: 'cHeader',
	computed: {
		user() {
			return this.$store.state.user;
		},
		notifications() {
			return this.$store.state.notifications;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_NOTIFICATIONS_LIST');
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
			<span class="logo-mini"><b>P</b>S</span>
			<!-- logo for regular state and mobile devices -->
			<span class="logo-lg"><b>Projeto</b>Sagui</span>
		</a>
		<!-- Header Navbar: style can be found in header.less -->
		<nav class="navbar navbar-static-top">
			<!-- Sidebar toggle button-->
			<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
			<span class="sr-only">Toggle navigation</span>
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
							<li class="header">You have {{ notifications.length }} notifications</li>
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
							<img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
							<span class="hidden-xs">{{ user.name }}</span>
						</a>
						<ul class="dropdown-menu">
							<!-- Menu Footer-->
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
