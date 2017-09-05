<script>
export default {
	name: 'cLogin',
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
	<div class="login-box">
		<div class="login-logo">
			<a href="../../index2.html"><b>Projeto</b>Sagui</a>
		</div>

		<div class="login-box-body">
			<div class="form-group has-feedback">
				<input type="email" class="form-control login-email" placeholder="E-mail">
				<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
			</div>
			<div class="form-group has-feedback">
				<input type="password" class="form-control login-password" placeholder="Senha">
				<span class="glyphicon glyphicon-lock form-control-feedback"></span>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<button class="btn btn-primary btn-block btn-flat" @click="authenticate()">Entrar</button>
				</div>
			</div>
			<br>
			<router-link to="/enterprises">Esqueci minha senha</router-link>
		</div>
	</div>
</template>
