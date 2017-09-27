<script>
import Vue from 'vue';
import methods from '../../methods';
import cEnterpriseLocation from './cEnterpriseLocation.vue';
import config from '../../config';  // eslint-disable-line no-unused-vars

export default {
	name: 'cEditEnterprise',
	props: ['id'],
	computed: {
		enterprise() {
			return this.$store.state.enterprises.enterprise;
		},
	},
	components: {
		cEnterpriseLocation,
	},
	data() {
		return {
			url: config.url,
			autocomplete: '',
			placeId: '',
			polygon: '',
			hasAddress: false,
		};
	},
	mounted() {
		this.initAutocomplete();
		this.AddRemoveError();
		this.$store.dispatch('LOAD_ENTERPRISE', this.id).then(() => {
			this.polygon = this.enterprise.location;
		});
	},
	methods: {
		AddRemoveError() {
			const inputs = Array.from(document.querySelectorAll('#new-enterprise input'));

			inputs.map((input) => {
				input.addEventListener('focus', this.removeError);
			});
		},
		removeError(event) {
			this.edited = true;
			methods.removeError(event);
		},
		initAutocomplete() {
			const options = {
				types: ['geocode'],
				componentRestrictions: { country: 'br' },
				placeIdOnly: true,
			};
			// eslint-disable-next-line
			this.autocomplete = new google.maps.places.Autocomplete(
				(document.getElementById('autocomplete')),
				options,
			);
		},
		setMap(event) {
			const autocompleteInput = document.querySelector('#autocomplete');
			let result;
			if (autocompleteInput.value !== '') {
				result = this.autocomplete.getPlace();
				if (result) {
					if (result.place_id) {
						this.placeId = result.place_id;
						$('#enterprise-location').modal('show');
					}
				} else {
					methods.addError(event.target.parentNode, Vue.i18n.translate('invalid-location'));
				}
			}
		},
		addPath(path) {
			this.polygon = path;
		},
		createEnterprise(form) {
			const enterpriseArray = Array.from(form.querySelectorAll('#enterprise-data input'));
			const status = form.querySelector('#enterprise-data .enterprise-data__status');
			const values = {};
			const promises = [];
			let photos = false; // eslint-disable-line prefer-const

			enterpriseArray.map((el) => {
				if (el.type !== 'file') {
					values[el.name] = el.value;
				} else {
					if (el.files.length > 0) { // eslint-disable-line no-lonely-if
						photos = true;

						const images = Array.from(el.files);
						images.map((img) => {
							const imgData = new FormData();
							imgData.append('file', img);
							promises.push(this.$store.dispatch('UPLOAD_IMAGE', imgData));
						});
					}
				}
			});

			values.images = this.enterprise.images;
			values.location = this.polygon;
			values.public = status.value;

			if (photos) {
				Promise.all(promises)
					.then((res) => {
						res.map((item) => {
							const newPhoto = {
								image_path: item.data.path,
								image_id: item.data.id,
							};
							values.images.push(newPhoto);
						});
						this.$store.dispatch('EDIT_ENTERPRISE', values).then(() => {
							document.querySelector('.new-enterprise__button').removeAttribute('disabled');
						});
					})
					.catch((e) => {
						console.error(e);
					});
			} else {
				this.$store.dispatch('EDIT_ENTERPRISE', values).then(() => {
					document.querySelector('.new-enterprise__button').removeAttribute('disabled');
				});
			}
		},
		validate() {
			let valid = true;
			const form = document.querySelector('#new-enterprise');
			const inputs = Array.from(form.querySelectorAll('input'));

			methods.cleanAllErros(form);

			inputs.map((input) => { // eslint-disable-line
				// check for empty fields
				if (input.value === '' && input.type !== 'file') {
					methods.addError(input.parentNode, Vue.i18n.translate('required-field'));
					valid = false;
				}
				// check for password fields equivalence
				if (input.name === 'repeat-password' && input.value !== form.querySelector('input[name="password"]').value) {
					methods.addError(input.parentNode, Vue.i18n.translate('password-match'));
					valid = false;
				}

				// check for files amount
				if (input.type === 'file') {
					if ((this.enterprise.images.length + input.files.length) > 5) {
						methods.addError(input.parentNode, Vue.i18n.translate('max-photos'));
						valid = false;
					}
				}
			});

			if (this.polygon === '') {
				this.$store.dispatch('CHANGE_ALERT_MESSAGE', Vue.i18n.translate('no-area'));
				valid = false;
			}

			if (valid) {
				event.target.setAttribute('disabled', 'disabled');
				this.createEnterprise(form);
			}
		},
		removeImage(index) {
			this.enterprise.images.splice(index, 1);
		},
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'edit' | translate | capitalize }} {{ 'enterprise' | translate }}</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-6" id="new-enterprise">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">{{ 'datas' | translate | capitalize }} {{ 'of-m' | translate }} {{ 'enterprise' | translate }}</h3>
						</div>
						<div class="box-body" id="enterprise-data">
							<div class="form-group">
								<label>{{ 'status' | translate | capitalize }}</label>
								<!-- change value to enterprise.public when available -->
								<select class="form-control enterprise-data__status" :value="enterprise.public" @focus="removeError($event)">
									<option value="0">{{ 'no' | translate | capitalize }} {{ 'public' | translate }}</option>
									<option value="1">{{ 'public' | translate | capitalize }}</option>
								</select>
							</div>
							<div class="form-group">
								<label>{{ 'name' | translate | capitalize }}</label>
								<input type="text" class="form-control" name="name" :value="enterprise.name">
							</div>
							<div class="form-group">
								<label>{{ 'short' | translate | capitalize }} {{ 'description' | translate }}</label>
								<input type="text" class="form-control" name="description" :value="enterprise.description">
							</div>
							<div class="form-group">
								<label>{{ 'name' | translate | capitalize }} {{ 'of' | translate }} {{ 'company' | translate }}</label>
								<input type="text" class="form-control" name="company_name" :value="enterprise.company_name">
							</div>
							<div class="form-group">
								<label>{{ 'contact' | translate | capitalize }} {{ 'of' | translate }} {{ 'company' | translate }}</label>
								<input type="text" class="form-control" name="company_contact" :value="enterprise.company_contact">
							</div>
							<div class="form-group">
								<label>{{ 'location' | translate | capitalize }}</label>
								<input type="text" class="form-control" id="autocomplete" name="human_address" @blur="hasAddress = true" :placeholder="'insert-address' | translate" :value="enterprise.human_address">
								<button type="button" class="btn btn-block btn-success" @click.prevent="setMap()" v-if="hasAddress">{{ 'limit' | translate | capitalize }} {{ 'area' | translate }}</button>
							</div>
							<div class="form-group">
								<label>{{ 'photos' | translate | capitalize }}</label>
								<div class="row" v-if="enterprise.images">
									<div class="col-md-4" v-for="image in enterprise.images">
										<button type="button" aria-label="Excluir" class="close" @click="removeImage(index)"><span aria-hidden="true">×</span></button>
										<img :src="url+image.image_path" alt="foto do empreendimento" class="img-responsive">
									</div>
								</div>
								<input type="file" class="form-control" name="photos" v-if="enterprise.images.length < 5" multiple>
								<p class="help-block">{{ 'max-photos-helper' | translate }}</p>
							</div>
						</div>
					</div>

					<button type="button" class="btn btn-block btn-success new-enterprise__button" @click="validate()">{{ 'edit' | translate | capitalize }} {{ 'enterprise' | translate }}</button>
				</div>
			</div>
		</section>
		<!-- /.content -->
		<c-enterprise-location v-on:finalPath="addPath" :placeId="this.placeId"></c-enterprise-location>
	</div>
</template>
