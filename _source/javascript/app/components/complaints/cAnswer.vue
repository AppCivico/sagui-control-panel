<script>
import Vue from 'vue';
import methods from '../../methods';

export default {
	name: 'cAnswer',
	props: {
		answer: Object,
		isEditing: Boolean,
		complaintId: String,
	},
	mounted() {
		this.AddRemoveError();
	},
	methods: {
		AddRemoveError() {
			const textarea = document.querySelector('#answer textarea');

			textarea.addEventListener('focus', this.removeError);
		},
		cleanFields() {
			const textarea = document.querySelector('#answer textarea');
			textarea.value = '';
		},
		removeError(event) {
			methods.removeError(event);
		},
		validate() {
			let valid = true;
			const textarea = document.querySelector('#answer textarea');

			methods.cleanAllErros(document.querySelector('#answer'));

			if (textarea.value === '') {
				methods.addError(textarea.parentNode, Vue.i18n.translate('required-field'));
				valid = false;
			}
			if (valid) {
				const result = {
					id: this.complaintId,
					data: {
						content: textarea.value,
					},
				};

				if (this.isEditing) {
					result.answerId = this.answer.id;

					this.$store.dispatch('EDIT_ANSWER', result).then((res) => {
						this.$emit('editAnswer', { newAnswer: res.data });
						$('#answer').modal('hide');
						this.cleanFields();
					});
				} else {
					this.$store.dispatch('SAVE_ANSWER', result).then((res) => {
						this.$emit('newAnswer', { newAnswer: result, id: res.data.id });
						$('#answer').modal('hide');
						this.cleanFields();
					});
				}
			}
		},
	},
};
</script>

<template>
	<div class="modal fade in" id="answer">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Cancelar" @click="cleanFields()">
						<span aria-hidden="true">×</span>
					</button>
					<h4 v-if="this.isEditing" class="modal-title">{{ 'edit' | translate  | capitalize }} {{ 'answer' | translate }}</h4>
					<h4 v-else class="modal-title">{{ 'new' | translate  | capitalize }} {{ 'answer' | translate }}</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label>{{ 'answer' | translate  | capitalize }}</label>
						<textarea v-if="this.isEditing" class="form-control" rows="3" v-model="this.answer.content"></textarea>
						<textarea v-else class="form-control" rows="3"></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default pull-left" data-dismiss="modal" @click="cleanFields()">{{ 'cancel' | translate | capitalize }}</button>
					<button v-if="this.isEditing" type="button" class="btn btn-primary" @click="validate()">{{ 'edit' | translate | capitalize }}</button>
					<button v-else type="button" class="btn btn-primary" @click="validate()">{{ 'add' | translate | capitalize }}</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</template>
