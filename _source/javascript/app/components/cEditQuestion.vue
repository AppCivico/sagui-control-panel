<script>
import Vue from 'vue';
import methods from '../methods';

export default {
	name: 'cEditQuestion',
	props: ['question'],
	data() {
		return {
			types: ['traffic_light', 'multiple', 'textarea'],
		};
	},
	computed: {
		selected() {
			return this.question.type;
		},
		options() {
			return this.question.answers;
		},
	},
	methods: {
		addOption() {
			this.options.push({});
		},
		removeOption(number) {
			this.options.splice(number, 1);
		},
		cleanFields() {
			const inputs = Array.from(document.querySelectorAll('#edit-question input'));
			// eslint-disable-next-line
			inputs.map(input => input.value = '');
			this.type = '';
			this.options = [{}];
		},
		editQuestion(modal) {
			const result = { answers: [] };
			result.title = modal.querySelector('input[name="title"]').value;
			result.type = modal.querySelector('select').value;

			if (result.type === 'traffic_light') {
				const answers = Array.from(modal.querySelectorAll('#traffic_light input[type="text"]'));
				answers.map((answer) => { // eslint-disable-line array-callback-return
					const item = {
						unit: answer.getAttribute('data-unit'),
						title: answer.value,
					};
					result.answers.push(item);
				});
			}

			if (result.type === 'multiple') {
				const answers = Array.from(modal.querySelectorAll('#multiple input[type="text"]'));
				answers.map((answer) => { // eslint-disable-line array-callback-return
					const item = {
						title: answer.value,
					};
					result.answers.push(item);
				});
			}

			this.$emit('editQuestion', result);
		},
		removeError(event) {
			methods.removeError(event);
		},
		validate() {
			let valid = true;
			const title = document.querySelector('#edit-question input[name="title"]');
			const type = document.querySelector('#edit-question select');

			methods.cleanAllErros(document.querySelector('#edit-question'));

			if (title.value === '') {
				methods.addError(title.parentNode, Vue.i18n.translate('required-field'));
				valid = false;
			}
			if (type.value === '') {
				methods.addError(type.parentNode, Vue.i18n.translate('required-type'));
				valid = false;
			}
			if (type.value === 'multiple' && this.options.length < 2) {
				methods.addError(document.querySelector('#multiple'), Vue.i18n.translate('required-option'));
				valid = false;
			}
			if (type.value === 'multiple') {
				const options = Array.from(document.querySelectorAll('#multiple input[type="text"]'));
				options.map((option) => { // eslint-disable-line array-callback-return
					if (option.value === '') {
						methods.addError(option.parentNode, Vue.i18n.translate('required-field'));
						valid = false;
					}
				});
			}
			if (type.value === 'traffic_light') {
				const options = Array.from(document.querySelectorAll('#traffic_light input[type="text"]'));
				options.map((option) => { // eslint-disable-line array-callback-return
					if (option.value === '') {
						methods.addError(option.parentNode, Vue.i18n.translate('required-field'));
						valid = false;
					}
				});
			}
			if (valid) {
				this.editQuestion(document.querySelector('#edit-question'));
				$('#edit-question').modal('hide'); // eslint-disable-line no-undef
				this.cleanFields();
			}
		},
	},
};
</script>

<template>
	<div class="modal fade in" id="edit-question">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Cancelar" @click="cleanFields()">
						<span aria-hidden="true">×</span></button>
					<h4 class="modal-title">{{ 'question' | translate  | capitalize }}</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label>{{ 'title' | translate  | capitalize }}</label>
						<input type="text" class="form-control" name="title" placeholder="Título" @focus="removeError($event)" :value="this.question.title">
					</div>
					<div class="form-group">
						<label>{{ 'type' | translate | capitalize }}</label>
						<select class="form-control" v-model="selected" @focus="removeError($event)" :value="selected">
							<option value="">Escolha um tipo de resposta</option>
							<option v-for="option in types" :value="option">{{ option | translate | capitalize }}</option>
						</select>
					</div>
					<hr>
					<div id="traffic_light" v-if="selected == 'traffic_light'">
						<div class="form-group" v-for="answer in this.question.answers">
							<label>{{ answer.unit | translate | capitalize }}</label>
							<input type="text" class="form-control" :data-unit="answer.unit" :placeholder="answer.unit" @focus="removeError($event)" :value="answer.title">
						</div>
					</div>
					<div id="multiple" v-if="selected == 'multiple'">
						<div class="form-group" v-for="(option, index) in this.options">
							<button type="button" aria-label="Excluir" class="close" @click="removeOption(index)"><span aria-hidden="true">×</span></button>
							<label>{{ 'option' | translate | capitalize }} {{ index + 1 }}</label>
							<input type="text" class="form-control" :placeholder="'insert_option' | translate | capitalize" @focus="removeError($event)" :value="option.title">
						</div>
						<button type="button" class="btn btn-primary" @click="addOption(); removeError($event)">{{ 'add' | translate | capitalize }} {{ 'option' | translate }}</button>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default pull-left" data-dismiss="modal" @click="cleanFields()">{{ 'cancel' | translate | capitalize }}</button>
					<button type="button" class="btn btn-primary" @click="validate()">{{ 'edit' | translate | capitalize }}</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</template>
