<script>
import Vue from 'vue';
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
		this.AddRemoveError();
	},
	methods: {
		AddRemoveError() {
			const inputs = Array.from(document.querySelectorAll('#new-agent input'));

			inputs.map((input) => {
				input.addEventListener('focus', this.removeError);
			});
		},
		removeError(event) {
			methods.removeError(event);
		},
		validate() {
			let valid = true;
			const inputs = Array.from(document.querySelectorAll('#new-agent input'));

			inputs.map((input) => {
				if (input.value === '') {
					methods.addError(input.parentNode, Vue.i18n.translate('required-field'));
					valid = false;
				}
			});

			if (valid) {
				const agent = {};
				inputs.map((input) => {
					agent[input.getAttribute('name')] = input.value;
				});
				// insert here function to save the new agent, then dispatch load agents again
			}
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
						<div class="box-body" id="new-agent">
							<div class="form-group">
								<label>{{ 'name' | translate | capitalize }}</label>
								<input type="text" class="form-control" name="name">
					        </div>
					        <div class="form-group">
								<label>{{ 'gadget' | translate | capitalize }}</label>
								<input type="text" class="form-control" name="gadget">
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
