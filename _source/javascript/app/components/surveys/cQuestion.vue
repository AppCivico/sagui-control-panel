<script>
import Vue from 'vue';
import methods from '../../methods';

export default {
	name: 'cQuestion',
	data() {
		return {
			type: '',
			types: ['traffic_light', 'multiple', 'textarea'],
			options: [
				{},
			],
		};
	},
	mounted() {
		this.AddRemoveError();
	},
	computed: {
		currentSurvey() {
			return this.$store.state.currentSurvey;
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
			const inputs = Array.from(document.querySelectorAll('#new-question input'));
			// eslint-disable-next-line
			inputs.map(input => input.value = '');
			this.type = '';
			this.options = [{}];
		},
		newQuestion(modal, hasImage) {
			const result = { answers: [] };
			result.survey_id = this.currentSurvey;
			result.name = modal.querySelector('input[name="title"]').value;
			result.description = modal.querySelector('input[name="title"]').value;
			result.type = modal.querySelector('select').value;

			if (result.type === 'multiple') {
				const answers = Array.from(modal.querySelectorAll('#multiple input[type="text"]'));
				answers.map((answer) => {
					const item = {
						title: answer.value,
					};
					result.answers.push(item);
				});
			}

			if (result.type === 'traffic_light') {
				const answers = Array.from(modal.querySelectorAll('#traffic_light input[type="text"]'));
				answers.map((answer) => {
					const item = {
						unit: answer.getAttribute('data-unit'),
						title: answer.value,
					};
					result.answers.push(item);
				});
			}

			if (hasImage) {
				const images = Array.from(document.querySelectorAll('#traffic_light input[type="file"]'));
				images.map((img, i) => {
					const imgData = new FormData();
					imgData.append('file', img.files[0]);
					this.$store.dispatch('UPLOAD_IMAGE', imgData).then((res) => {
						result.answers[i].image_path = res.data.path;
						result.answers[i].image_id = res.data.id;
					});
				});
				this.saveQuestion(result);
			} else {
				this.saveQuestion(result);
			}
		},
		saveQuestion(result) {
			this.$store.dispatch('SAVE_QUESTION', result).then((res) => {
				this.$emit('newQuestion', { newQuestion: result, id: res.data.id });
				$('#new-question').modal('hide'); // eslint-disable-line no-undef
				this.cleanFields();
			});
		},
		AddRemoveError() {
			const inputs = Array.from(document.querySelectorAll('#new-question input'));

			inputs.map((input) => {
				input.addEventListener('focus', this.removeError);
			});
		},
		removeError(event) {
			methods.removeError(event);
		},
		validate() {
			let valid = true;
			let imageFile = 0;
			const title = document.querySelector('#new-question input[name="title"]');
			const type = document.querySelector('#new-question select');

			methods.cleanAllErros(document.querySelector('#new-question'));

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
				options.map((option) => {
					if (option.value === '') {
						methods.addError(option.parentNode, 'Este campo é obrigatório');
						valid = false;
					}
				});
			}
			if (type.value === 'traffic_light') {
				const options = Array.from(document.querySelectorAll('#traffic_light input[type="text"]'));
				options.map((option) => {
					if (option.value === '') {
						methods.addError(option.parentNode, Vue.i18n.translate('required-field'));
						valid = false;
					}
				});

				const images = Array.from(document.querySelectorAll('#traffic_light input[type="file"]'));
				images.map((img) => {
					if (img.value !== '') {
						imageFile += 1;
					}
				});
				if (imageFile > 0 && imageFile < 3) {
					this.$store.dispatch('CHANGE_ALERT_MESSAGE', Vue.i18n.translate('minimum-images'));
					valid = false;
				}
			}
			if (valid) {
				if (imageFile === 3) {
					this.newQuestion(document.querySelector('#new-question'), true);
				} else {
					this.newQuestion(document.querySelector('#new-question'), false);
				}
			}
		},
	},
};
</script>

<template>
	<div class="modal fade in" id="new-question">
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
						<input type="text" class="form-control" name="title" placeholder="Título">
					</div>
					<div class="form-group">
						<label>{{ 'type' | translate | capitalize }}</label>
						<select class="form-control" v-model="type" @focus="removeError($event)">
							<option value="">Escolha um tipo de resposta</option>
							<option v-for="option in types" :value="option">{{ option | translate | capitalize }}</option>
						</select>
					</div>
					<hr>
					<div id="traffic_light" v-if="type == 'traffic_light'">
						<div class="form-group">
							<label>Verde</label>
							<input type="text" class="form-control" data-unit="green" placeholder="Verde">
							<input type="file" id="green-image">
						</div>
						<div class="form-group">
							<label>Amarelo</label>
							<input type="text" class="form-control" data-unit="yellow" placeholder="Amarelo">
							<input type="file" id="yellow-image">
						</div>
						<div class="form-group">
							<label>Vermelho</label>
							<input type="text" class="form-control" data-unit="red" placeholder="Vermelho">
							<input type="file" id="red-image">
						</div>
					</div>
					<div id="multiple" v-if="type == 'multiple'">
						<div class="form-group" v-for="(option, index) in options">
							<button type="button" aria-label="Excluir" class="close" @click="removeOption(index)"><span aria-hidden="true">×</span></button>
							<label>{{ 'option' | translate | capitalize }} {{ index + 1 }}</label>
							<input type="text" class="form-control" :placeholder="'insert_option' | translate | capitalize">
						</div>
						<button type="button" class="btn btn-primary" @click="addOption(); removeError($event)">{{ 'add' | translate | capitalize }} {{ 'option' | translate }}</button>
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
