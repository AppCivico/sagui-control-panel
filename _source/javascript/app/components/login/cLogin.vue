<script>
export default {
	name: 'cLogin',
};
</script>

<template>
	<div class="login-box">
		<div class="login-logo">
			<a href="../../index2.html"><b>Projeto</b>Sagui</a>
		</div>

		<div class="login-box-body">
			<form>
				<div class="form-group has-feedback">
					<input type="email" class="form-control" placeholder="E-mail">
					<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
				</div>
				<div class="form-group has-feedback">
					<input type="password" class="form-control" placeholder="Senha">
					<span class="glyphicon glyphicon-lock form-control-feedback"></span>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<button type="submit" class="btn btn-primary btn-block btn-flat">Entrar</button>
					</div>
				</div>
			</form>
			<br>
			<router-link to="/enterprises">Esqueci minha senha</router-link>
		</div>
	</div>
</template>
