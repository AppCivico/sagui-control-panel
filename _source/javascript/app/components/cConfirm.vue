<script>
import router from '../router';

export default {
	name: 'cConfirm',
	computed: {
		confirm() {
			return this.$store.state.confirm;
		},
		redirect() {
			return this.$store.state.redirect;
		},
	},
	methods: {
		changeState(choice) {
			this.$store.dispatch('EDIT_CONFIRM_STATE', choice);
		},
		positive() {
			this.changeState(true);
			if (this.redirect.state === true) {
				const path = this.redirect.path;
				this.$store.dispatch('CHANGE_REDIRECT', { state: false, path: '' });
				router.go(path);
			}
		},
	},
};
</script>

<template>
	<div class="modal fade in" id="confirm">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Cancelar">
						<span aria-hidden="true">×</span></button>
					<h4 class="modal-title">Alerta</h4>
				</div>
				<div class="modal-body">
					<p>{{ this.confirm.message }}</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default pull-left" data-dismiss="modal" @click="changeState(false)">{{ 'cancel' | translate | capitalize }}</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal" @click="positive()">Ok</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</template>
