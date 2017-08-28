<script>
import methods from '../../methods';

export default {
	name: 'cAgents',
	computed: {
		agents() {
			return this.$store.state.agents;
		},
		selectedEnterprise() {
			return this.$store.state.selectedEnterprise;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_AGENTS_LIST', this.selectedEnterprise);
	},
	methods: {
		removeError(event) {
			this.edited = true;
			methods.removeError(event);
		},
		validate() {

		},
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'agents' | translate | capitalize }}
			</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="box box-solid">
				<div class="box-body no-padding agents">
					<ul class="users-list clearfix">
						<li v-for="agent in agents">
							<div class="agents__code">{{ agent.number }}</div>
							<a class="users-list-name" href="#">{{ agent.gadget }}</a>
							<span class="users-list-date">{{ agent.surveys }} {{ 'answers' | translate }}</span>
						</li>
					</ul>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">{{ 'register' | translate | capitalize }} {{ 'agent' | translate }}</h3>
						</div>
						<div class="box-body">
							<div class="form-group">
								<label>{{ 'name' | translate | capitalize }}</label>
								<input type="text" class="form-control" name="name" @focus="removeError($event)">
					        </div>
					        <div class="form-group">
								<label>{{ 'gadget' | translate | capitalize }}</label>
								<input type="text" class="form-control" name="gadget" @focus="removeError($event)">
					        </div>
					        <button type="button" class="btn btn-block btn-success" @click="validate()">{{ 'register' | translate | capitalize }} {{ 'agent' | translate }}</button>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>

<style scoped>
	h4 {
		text-transform: uppercase;
	}
</style>
