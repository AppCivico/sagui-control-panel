<script>
import Vue from 'vue';
import methods from '../../methods';
import cEnterpriseLocation from './cEnterpriseLocation.vue';

export default {
	name: 'cEditEnterprise',
	components: {
		cEnterpriseLocation,
	},
	data() {
		return {
			autocomplete: '',
			placeId: '',
			polygon: '',
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
			let result;
			if (event.target.value !== '') {
				result = this.autocomplete.getPlace();
				if (result) {
					if (result.place_id) {
						this.placeId = result.place_id;
						$('#enterprise-location').modal('show'); // eslint-disable-line no-undef
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
			const values = { active: 0 };

			enterpriseArray.map((el) => {
				if (el.type !== 'file') {
					values[el.name] = el.value;
				}
			});

			values.location = this.polygon;

			this.$store.dispatch('EDIT_ENTERPRISE', values);
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
			});

			if (valid) {
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
								<input type="text" class="form-control" id="autocomplete" name="human_address" @blur="setMap($event)" :placeholder="'insert-address' | translate">
			                </div>
			                <div class="form-group">
								<label>{{ 'photos' | translate | capitalize }}</label>
								<input type="file" class="form-control" name="photos">
			                </div>
						</div>
					</div>

					<button type="button" class="btn btn-block btn-success" @click="validate()">{{ 'register' | translate | capitalize }} {{ 'enterprise' | translate }}</button>
				</div>
			</div>
		</section>
		<!-- /.content -->
		<c-enterprise-location v-on:finalPath="addPath" :placeId="this.placeId"></c-enterprise-location>
	</div>
</template>
