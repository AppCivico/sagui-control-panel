<script>
export default {
	name: 'cAlert',
	computed: {
		message() {
			return this.$store.state.alertMessage;
		},
	},
};
</script>

<template>
	<div class="modal fade in" id="alert">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Cancelar">
						<span aria-hidden="true">×</span></button>
					<h4 class="modal-title">Alerta</h4>
				</div>
				<div class="modal-body">
					<p>{{ message }}</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default pull-left" data-dismiss="modal">{{ 'cancel' | translate | capitalize }}</button>
					<button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</template>
