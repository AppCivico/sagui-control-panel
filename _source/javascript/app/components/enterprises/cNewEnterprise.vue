<script>
import Vue from 'vue';
import methods from '../../methods';
import cEnterpriseLocation from './cEnterpriseLocation.vue';

export default {
	name: 'cNewEnterprise',
	components: {
		cEnterpriseLocation,
	},
	data() {
		return {
			autocomplete: '',
			placeId: '',
			polygon: '',
			hasAddress: false,
		};
	},
	mounted() {
		this.initAutocomplete();
		this.AddRemoveError();
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
			const responsibleArray = Array.from(form.querySelectorAll('#responsible-data input'));
			const values = { public: 0, images: [] };
			const responsible = {};
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

			responsibleArray.map((el) => {
				if (el.name !== 'repeat-password') {
					responsible[el.name] = el.value;
				}
			});

			values.responsible = responsible;
			values.location = this.polygon;

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
						this.$store.dispatch('SAVE_ENTERPRISE', values).then(() => {
							document.querySelector('.new-enterprise__button').removeAttribute('disabled');
						});
					})
					.catch((e) => {
						console.error(e);
					});
			} else {
				this.$store.dispatch('SAVE_ENTERPRISE', values).then(() => {
					document.querySelector('.new-enterprise__button').removeAttribute('disabled');
				});
			}
		},
		validate(event) {
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
					if (input.files.length > 5) {
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
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'register' | translate | capitalize }} {{ 'enterprise' | translate }}</h1>
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
								<label>{{ 'name' | translate | capitalize }}</label>
								<input type="text" class="form-control" name="name">
			                </div>
			                <div class="form-group">
								<label>{{ 'short' | translate | capitalize }} {{ 'description' | translate }}</label>
								<input type="text" class="form-control" name="description">
			                </div>
			                <div class="form-group">
								<label>{{ 'name' | translate | capitalize }} {{ 'of' | translate }} {{ 'company' | translate }}</label>
								<input type="text" class="form-control" name="company_name">
			                </div>
			                <div class="form-group">
								<label>{{ 'contact' | translate | capitalize }} {{ 'of' | translate }} {{ 'company' | translate }}</label>
								<input type="text" class="form-control" name="company_contact">
			                </div>
			                <div class="form-group">
								<label>{{ 'location' | translate | capitalize }}</label>
								<input type="text" class="form-control" id="autocomplete" name="human_address" @blur="hasAddress = true" :placeholder="'insert-address' | translate">
								<button type="button" class="btn btn-block btn-success" @click.prevent="setMap()" v-if="hasAddress">{{ 'limit' | translate | capitalize }} {{ 'area' | translate }}</button>
			                </div>
			                <div class="form-group">
								<label>{{ 'photos' | translate | capitalize }}</label>
								<input type="file" class="form-control" name="photos" multiple>
								<p class="help-block">{{ 'max-photos-helper' | translate }}</p>
			                </div>
						</div>
					</div>

					<div class="box box-solid" id="responsible-data">
						<div class="box-header with-border">
							<h3 class="box-title">{{ 'datas' | translate | capitalize }}  {{ 'of-m' | translate }} {{ 'responsible' | translate }}</h3>
						</div>
						<div class="box-body">
							<div class="form-group">
								<label>{{ 'name' | translate | capitalize }}</label>
								<input type="text" class="form-control" name="name">
			                </div>
			                <div class="form-group">
								<label>{{ 'email' | translate | capitalize }}</label>
								<input type="email" class="form-control" name="email">
			                </div>
			                <div class="form-group">
								<label>{{ 'password' | translate | capitalize }}</label>
								<input type="password" class="form-control" name="password">
			                </div>
			                <div class="form-group">
								<label>{{ 'repeat' | translate | capitalize }} {{ 'password' | translate }}</label>
								<input type="password" class="form-control" name="repeat-password">
			                </div>
						</div>
					</div>

					<button type="button" class="btn btn-block btn-success new-enterprise__button" @click="validate($event)">{{ 'register' | translate | capitalize }} {{ 'enterprise' | translate }}</button>
				</div>
			</div>
		</section>
		<!-- /.content -->
		<c-enterprise-location v-on:finalPath="addPath" :placeId="this.placeId"></c-enterprise-location>
	</div>
</template>
