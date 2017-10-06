<script>
import cHeader from './components/layout/cHeader.vue';
import cMenu from './components/layout/cMenu.vue';
import cAlert from './components/utilities/cAlert.vue';


export default {
	name: 'app',
	components: {
		cHeader,
		cMenu,
		cAlert,
	},
	computed: {
		user() {
			return this.$store.state.auth.user;
		},
	},
	beforeCreate() {
		const apiKey = sessionStorage.getItem('api-key');

		// check if api-key exists, if negative, send user to login page
		if (!apiKey) {
			this.$router.push('/');
		} else {
			this.$store.dispatch('EDIT_APIKEY', apiKey);
		}
	},
};
</script>

<template>
	<div id="app">
		<template v-if="$route.path !== '/'">
			<div class="loading">
				<i class="fa fa-refresh fa-spin"></i>
			</div>
			<div class="wrapper">
				<c-header ></c-header>
				<c-menu></c-menu>
				<div class="content-wrapper">
					<router-view></router-view>
				</div>
			</div>
		</template>
		<template v-else>
			<router-view></router-view>
		</template>
		<c-alert></c-alert>
	</div>
</template>
