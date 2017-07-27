<script>
import methods from '../methods';

export default {
	name: 'cCategorie',
	methods: {
		cleanFields() {
			const inputs = Array.from(document.querySelectorAll('#new-category input'));
			// eslint-disable-next-line
			inputs.map(input => input.value = '');
			this.type = '';
			this.options = [{}];
		},
		removeError(event) {
			methods.removeError(event);
		},
		validate() {
			let valid = true;
			const title = document.querySelector('#new-category input[name="title"]');

			methods.cleanAllErros(document.querySelector('#new-category'));

			if (title.value === '') {
				methods.addError(title.parentNode, 'Este campo é obrigatório');
				valid = false;
			}
			if (valid) {
				this.$store.dispatch('ADD_CATEGORY', { title: title.value });
				/* this.newQuestion(document.querySelector('#new-category'));
				$('#new-category').modal('hide'); // eslint-disable-line no-undef
				this.cleanFields(); */
			}
		},
	},
};
</script>

<template>
	<div class="modal fade in" id="new-category">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Cancelar" @click="cleanFields()">
						<span aria-hidden="true">×</span></button>
					<h4 class="modal-title">{{ 'new' | translate  | capitalize }} {{ 'categorie' | translate }}</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label>{{ 'title' | translate  | capitalize }}</label>
						<input type="text" class="form-control" name="title" placeholder="Título" @focus="removeError($event)">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default pull-left" data-dismiss="modal" @click="cleanFields()">{{ 'cancel' | translate | capitalize }}</button>
					<button type="button" class="btn btn-primary" @click="validate()">{{ 'add' | translate | capitalize }}</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</template>
