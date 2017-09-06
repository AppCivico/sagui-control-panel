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
			return this.$store.state.user;
		},
	},
	beforeCreate() {
		// check if api-key exists, if negative, send user to login page
		const apiKey = sessionStorage.getItem('api-key');
		if (!apiKey) {
			this.$router.push('/');
		}
	},
	mounted() {
		// check if api-key exists, if yes, load user data
		if (Object.keys(this.user).length === 0 && sessionStorage.getItem('api-key')) {
			this.getUser(sessionStorage.getItem('api-key'));
		}
	},
	methods: {
		getUser(apiKey) {
			this.$store.dispatch('LOAD_USER', apiKey);
		},
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
