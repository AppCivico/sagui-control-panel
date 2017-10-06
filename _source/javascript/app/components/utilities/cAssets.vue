<script>
export default {
	name: 'cAssets',
	props: ['file'],
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
				</div>
				<div class="modal-body">
					<img :src="this.file.path" class="img-responsive" v-if="this.file.type === 'image'">
					<div class="embed-responsive embed-responsive-16by9" v-if="this.file.type === 'video'">
						<video class="embed-responsive-item" :src="this.file.path" controls preload="none"></video>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</template>

<style scoped>
	#assets .modal-dialog {
		width: 60%;
		height: 60%;
	}
	#assets .modal-content {
		height: auto;
		min-height: 100%;
		border-radius: 0;
	}
</style>
