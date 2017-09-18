<script>
import Vue from 'vue';
import methods from '../../methods';

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
	mounted() {
		this.AddRemoveError();
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
		editQuestion(modal, hasImage) {
			const result = { answers: [] };
			result.name = modal.querySelector('input[name="title"]').value;
			result.type = modal.querySelector('select').value;

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

			if (result.type === 'multiple') {
				const answers = Array.from(modal.querySelectorAll('#multiple input[type="text"]'));
				answers.map((answer) => {
					const item = {
						title: answer.value,
					};
					result.answers.push(item);
				});
			}

			if (hasImage) {
				const images = Array.from(document.querySelectorAll('#traffic_light input[type="file"]'));
				const promises = [];
				images.map((img) => {
					const imgData = new FormData();
					imgData.append('file', img.files[0]);
					promises.push(this.$store.dispatch('UPLOAD_IMAGE', imgData));
				});
				Promise.all(promises)
					.then((res) => {
						res.map((item, i) => {
							result.answers[i].image_path = item.data.path;
							result.answers[i].image_id = item.data.id;
						});
						this.saveQuestion(result);
					})
					.catch((e) => {
						console.error(e);
					});
			} else {
				this.saveQuestion(result);
			}
		},
		saveQuestion(result) {
			this.$store.dispatch('EDIT_QUESTION', { question: result, id: this.question.id }).then(() => {
				this.$emit('editQuestion', result);
				$('#edit-question').modal('hide'); // eslint-disable-line no-undef
				this.cleanFields();
			});
		},
		AddRemoveError() {
			const inputs = Array.from(document.querySelectorAll('#edit-question input'));

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
				options.map((option) => {
					if (option.value === '') {
						methods.addError(option.parentNode, Vue.i18n.translate('required-field'));
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
				if (images) {
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
			}
			if (valid) {
				if (imageFile === 3) {
					this.editQuestion(document.querySelector('#edit-question'), true);
				} else {
					this.editQuestion(document.querySelector('#edit-question'), false);
				}
			}
		},
		removeImage(index) {
			this.question.answers[index].image_path = '';
			this.question.answers[index].image_id = '';
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
						<input type="text" class="form-control" name="title" placeholder="Título" :value="this.question.name">
					</div>
					<div class="form-group">
						<label>{{ 'type' | translate | capitalize }}</label>
						<select class="form-control" v-model="selected" :value="selected" @focus="removeError($event)">
							<option value="">Escolha um tipo de resposta</option>
							<option v-for="option in types" :value="option">{{ option | translate | capitalize }}</option>
						</select>
					</div>
					<hr>
					<div id="traffic_light" v-if="selected == 'traffic_light'">
						<div class="form-group" v-for="(answer, index) in this.question.answers">
							<label>{{ answer.unit | translate | capitalize }}</label>
							<input type="text" class="form-control" :data-unit="answer.unit" :placeholder="answer.unit" :value="answer.title">
							<div class="traffic_light__image">
								<template v-if="answer.image_path">
									<button type="button" aria-label="Excluir" class="close" @click="removeImage(index)"><span aria-hidden="true">×</span></button>
									<img :src="'http://dev-sagui-api.eokoe.com'+answer.image_path" :alt="answer.unit">
								</template>
								<template v-else>
									<input type="file" id="traffic_light__image-option">
								</template>
							</div>
						</div>
					</div>
					<div id="multiple" v-if="selected == 'multiple'">
						<div class="form-group" v-for="(option, index) in this.options">
							<button type="button" aria-label="Excluir" class="close" @click="removeOption(index)"><span aria-hidden="true">×</span></button>
							<label>{{ 'option' | translate | capitalize }} {{ index + 1 }}</label>
							<input type="text" class="form-control" :placeholder="'insert_option' | translate | capitalize" :value="option.title">
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

<style scoped>
	.traffic_light__image {
	    display: inline-block;
		margin: 10px 0;
    }
</style>
