<script>
export default {
	name: 'cAssets',
	computed: {
	},
	methods: {
	},
};
</script>

<template>
	<div class="modal fade in" id="assets">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Cancelar">
						<span aria-hidden="true">×</span></button>
					<h4 class="modal-title">{{ 'alert' | translate  | capitalize }}</h4>
				</div>
				<div class="modal-body">
					<p>{{ message }}</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal" @click="ifRedirect()">{{ 'ok' | translate  | capitalize }}</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</template>
