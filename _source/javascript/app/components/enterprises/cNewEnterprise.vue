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
		};
	},
	mounted() {
		this.initAutocomplete();
	},
	methods: {
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
			const valuesArray = Array.from(form.querySelectorAll('input'));
			const values = {};
			valuesArray.map((el) => {
				values[el.name] = el.value;
			});

			values.addressPath = this.polygon;

			console.log(values);
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
						<div class="box-body">
							<div class="form-group">
								<label>{{ 'name' | translate | capitalize }}</label>
								<input type="text" class="form-control" name="name" @focus="removeError($event)">
			                </div>
			                <div class="form-group">
								<label>{{ 'short' | translate | capitalize }} {{ 'description' | translate }}</label>
								<input type="text" class="form-control" name="description" @focus="removeError($event)">
			                </div>
			                <div class="form-group">
								<label>{{ 'location' | translate | capitalize }}</label>
								<input type="text" class="form-control" id="autocomplete" name="location" @blur="setMap($event)" @focus="removeError($event)" :placeholder="'insert-address' | translate">
			                </div>
			                <div class="form-group">
								<label>{{ 'photos' | translate | capitalize }}</label>
								<input type="file" class="form-control" name="photos">
			                </div>
						</div>
					</div>

					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">{{ 'datas' | translate | capitalize }}  {{ 'of-m' | translate }} {{ 'responsable' | translate }}</h3>
						</div>
						<div class="box-body">
							<div class="form-group">
								<label>{{ 'name' | translate | capitalize }}</label>
								<input type="text" class="form-control" name="responsable" @focus="removeError($event)">
			                </div>
			                <div class="form-group">
								<label>{{ 'email' | translate | capitalize }}</label>
								<input type="email" class="form-control" name="email" @focus="removeError($event)">
			                </div>
			                <div class="form-group">
								<label>{{ 'password' | translate | capitalize }}</label>
								<input type="password" class="form-control" name="password" @focus="removeError($event)">
			                </div>
			                <div class="form-group">
								<label>{{ 'repeat' | translate | capitalize }} {{ 'password' | translate }}</label>
								<input type="password" class="form-control" name="repeat-password" @focus="removeError($event)">
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
