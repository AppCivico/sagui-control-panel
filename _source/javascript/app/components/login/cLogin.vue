<script>
import config from '../../config'; // eslint-disable-line no-unused-vars
import cFooter from '../layout/cFooter.vue';

export default {
	name: 'cLogin',
	components: {
		cFooter,
	},
	beforeCreate() {
		const apiKey = sessionStorage.getItem('api-key');
		if (apiKey) {
			this.$router.push('enterprises');
		}
	},
	computed: {
		user() {
			return this.$store.state.auth.user;
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
	},
	mounted() {
		const body = document.querySelector('body');
		body.classList.add('login-page');
	},
	watch: {
		user() {
			this.$router.push('enterprises');
		},
	},
	methods: {
		authenticate() {
			const user = {
				email: document.querySelector('.login-email').value,
				password: document.querySelector('.login-password').value,
			};
			this.$store.dispatch('AUTHENTICATION', user);
		},
	},
};
</script>

<template>
	<div>
		<div class="login-box">
			<div class="login-logo">
				<a href="../../index2.html" v-html="name"></a>
			</div>

			<div class="login-box-body">
				<form>
					<div class="form-group has-feedback">
						<input type="email" class="form-control login-email" :placeholder="'email' | translate | capitalize">
						<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
					</div>
					<div class="form-group has-feedback">
						<input type="password" class="form-control login-password" :placeholder="'password' | translate | capitalize">
						<span class="glyphicon glyphicon-lock form-control-feedback"></span>
					</div>
					<div class="row">
						<div class="col-xs-12">
							<button class="btn btn-primary btn-block btn-flat" @click.prevent="authenticate()">{{ 'login' | translate | capitalize }}</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<c-footer></c-footer>
	</div>
</template>
