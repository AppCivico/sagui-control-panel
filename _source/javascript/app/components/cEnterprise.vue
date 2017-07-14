<template>
	<div class="content-wrapper">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>
			{{ 'enterprise' | translate | capitalize }}
			<small>{{ enterprise.name }}</small>
			</h1>
			<ol class="breadcrumb">
				<li><router-link to="/"><i class="fa fa-dashboard"></i>{{ 'enterprises' | translate | capitalize }}</router-link></li>
				<li class="active">{{ enterprise.name }}</li>
			</ol>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="info-box">
						<span class="info-box-icon bg-aqua"><i class="ion ion-ios-gear-outline"></i></span>

						<div class="info-box-content">
							<span class="info-box-text">{{ 'complaints' | translate }}</span>
							<span class="info-box-number">{{ enterprise.data ? enterprise.data.complaints : 0 }}</span>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="info-box">
						<span class="info-box-icon bg-red"><i class="ion ion-ios-gear-outline"></i></span>

						<div class="info-box-content">
							<span class="info-box-text">{{ 'cases' | translate }}</span>
							<span class="info-box-number">{{ enterprise.data ? enterprise.data.cases : 0 }}</span>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="info-box">
						<span class="info-box-icon bg-green"><i class="ion ion-ios-gear-outline"></i></span>

						<div class="info-box-content">
							<span class="info-box-text">{{ 'actions' | translate }}</span>
							<span class="info-box-number">{{ enterprise.data ? enterprise.data.actions : 0 }}</span>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="info-box">
						<span class="info-box-icon bg-yellow"><i class="ion ion-ios-gear-outline"></i></span>

						<div class="info-box-content">
							<span class="info-box-text">{{ 'surveys_completed' | translate }}</span>
							<span class="info-box-number">{{ enterprise.data ? enterprise.data.surveys : 0 }}</span>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">{{ 'actions_unanswered' | translate | capitalize }}</h3>
						</div>
						<div class="box-body">
							<ul class="list-unstyled">
								<li class="clearfix">
									<h4 class="pull-left">Lorem ipsum dolor</h4>
									<small class="pull-right">37 {{ 'contributions' | translate }}</small>
								</li>
								<li class="clearfix">
									<h4 class="pull-left">Lorem ipsum dolor</h4>
									<small class="pull-right">37 {{ 'contributions' | translate }}</small>
								</li>
								<li class="clearfix">
									<h4 class="pull-left">Lorem ipsum dolor</h4>
									<small class="pull-right">37 {{ 'contributions' | translate }}</small>
								</li>
								<li class="clearfix">
									<h4 class="pull-left">Lorem ipsum dolor</h4>
									<small class="pull-right">37 {{ 'contributions' | translate }}</small>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">{{ 'ranking' | translate | capitalize }} {{ 'complaints' | translate }}</h3>
						</div>
						<div class="box-body">
							<p>Text 1</p>
							<div class="progress">
								<div class="progress-bar progress-bar-green" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
									<span class="sr-only">40% Complete (success)</span>
								</div>
							</div>
							<p>Text 2</p>
							<div class="progress">
								<div class="progress-bar progress-bar-aqua" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
									<span class="sr-only">20% Complete</span>
								</div>
							</div>
							<p>Text 3</p>
							<div class="progress">
								<div class="progress-bar progress-bar-yellow" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
									<span class="sr-only">60% Complete (warning)</span>
								</div>
							</div>
							<p>Text 4</p>
							<div class="progress">
								<div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
									<span class="sr-only">80% Complete</span>
								</div>
							</div>
						</div>
						<!-- /.box-body -->
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">{{ 'agents' | translate | capitalize }}</h3>
						</div>
						<div class="box-body no-padding">
							<ul class="users-list clearfix">
								<li>
									<div class="agent-code">LID01</div>
									<a class="users-list-name" href="#">Tablet Samsung 02</a>
									<span class="users-list-date">37 {{ 'answers' | translate }}</span>
								</li>
								<li>
									<div class="agent-code">LID02</div>
									<a class="users-list-name" href="#">Tablet Samsung 02</a>
									<span class="users-list-date">37 {{ 'answers' | translate }}</span>
								</li>
								<li>
									<div class="agent-code">LID03</div>
									<a class="users-list-name" href="#">Tablet Samsung 02</a>
									<span class="users-list-date">37 {{ 'answers' | translate }}</span>
								</li>
								<li>
									<div class="agent-code">LID04</div>
									<a class="users-list-name" href="#">Tablet Samsung 02</a>
									<span class="users-list-date">37 {{ 'answers' | translate }}</span>
								</li>
								<li>
									<div class="agent-code">LID05</div>
									<a class="users-list-name" href="#">Tablet Samsung 02</a>
									<span class="users-list-date">37 {{ 'answers' | translate }}</span>
								</li>
								<li>
									<div class="agent-code">LID06</div>
									<a class="users-list-name" href="#">Tablet Samsung 02</a>
									<span class="users-list-date">37 {{ 'answers' | translate }}</span>
								</li>
								<li>
									<div class="agent-code">LID07</div>
									<a class="users-list-name" href="#">Tablet Samsung 02</a>
									<span class="users-list-date">37 {{ 'answers' | translate }}</span>
								</li>
								<li>
									<div class="agent-code">LID08</div>
									<a class="users-list-name" href="#">Tablet Samsung 02</a>
									<span class="users-list-date">37 {{ 'answers' | translate }}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>

<script>
export default {
	name: 'cEnterprise',
	props: ['id'],
	computed: {
		enterprise() {
			return this.$store.state.enterprise;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_ENTERPRISE', this.id);
	},
	filters: {
		capitalize(value) {
			if (!value) return '';
			return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
		},
	},
};
</script>

<style scoped>
	.info-box-number {
		font-size: 40px;
	}
	.agent-code {
		border-radius: 50%;
	    max-width: 100%;
	    width: 100px;
	    height: 100px;
	    background: #ccc;
	    text-align: center;
	    margin: 0 auto;
	}
</style>
