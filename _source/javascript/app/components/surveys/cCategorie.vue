<script>
import Vue from 'vue';
import methods from '../../methods';
import cIconPicker from '../utilities/iconPicker/index.vue';

export default {
	name: 'cCategorie',
	props: {
		category: Object,
		isEditing: Boolean,
	},
	data() {
		return {
			selectedIcon: '',
		};
	},
	components: {
		cIconPicker,
	},
	computed: {
		selectedEnterprise() {
			return this.$store.state.selectedEnterprise;
		},
	},
	mounted() {
		this.AddRemoveError();
	},
	methods: {
		AddRemoveError() {
			const inputs = Array.from(document.querySelectorAll('#new-category input'));

			inputs.map((input) => {
				input.addEventListener('focus', this.removeError);
			});
		},
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
				methods.addError(title.parentNode, Vue.i18n.translate('required-field'));
				valid = false;
			}
			if (this.selectedIcon === '') {
				this.$store.dispatch('CHANGE_ALERT_MESSAGE', Vue.i18n.translate('no-icon'));
				valid = false;
			}
			if (valid) {
				if (this.isEditing) {
					const category = {
						name: title.value,
						id: this.category.id,
						icon_code: this.selectedIcon,
					};
					this.$store.dispatch('EDIT_CATEGORY', category);
				} else {
					const category = {
						name: title.value,
						dimension: 'category',
						icon_code: this.selectedIcon,
					};
					this.$store.dispatch('ADD_CATEGORY', category);
				}
			}
		},
		selectIcon(value) {
			const icon = document.querySelector('#new-category .showIcon');
			icon.classList.add(value.className);
			this.selectedIcon = value.cssValue;
		},
		showIconPicker() {
			const el = document.querySelector('#new-category #iconPicker');
			if (el.ownerDocument.defaultView.getComputedStyle(el, null).display === 'none') {
				el.style.display = 'block';
			} else {
				el.style.display = 'none';
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
						<span aria-hidden="true">×</span>
					</button>
					<h4 v-if="this.isEditing" class="modal-title">{{ 'edit' | translate  | capitalize }} {{ 'categorie' | translate }}</h4>
					<h4 v-else class="modal-title">{{ 'new' | translate  | capitalize }} {{ 'categorie' | translate }}</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label>{{ 'title' | translate  | capitalize }}</label>
						<input v-if="this.isEditing" type="text" class="form-control" name="title" placeholder="Título" :value="this.category.name">
						<input v-else type="text" class="form-control" name="title" placeholder="Título">
						<hr>
						<label>{{ 'icon' | translate  | capitalize }}</label>
						<div>
							<i :class="'fa showIcon '+this.category.icon" v-if="this.isEditing"></i>
							<i class="fa showIcon" v-else></i>
						</div>

						<button type="button" class="btn btn-default" @click="showIconPicker()" v-if="this.isEditing">{{ 'edit' | translate  | capitalize }} {{ 'icon' | translate }}</button>
						<button type="button" class="btn btn-default" @click="showIconPicker()" v-else>{{ 'select' | translate  | capitalize }} {{ 'icon' | translate }}</button>
						<c-icon-picker :seachbox="'search' | translate  | capitalize" v-on:selectIcon="selectIcon"></c-icon-picker>
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

<style scope>
	#iconPicker {
		display: none;
	}
	.showIcon {
	    width: 40px;
	    height: 40px;
	    padding: 12px;
	    margin: 0 12px 12px 0;
	    text-align: center;
	    border-radius: 3px;
	    font-size: 14px;
	    box-shadow: 0 0 0 1px #ddd;
	    color: inherit;
	}
</style>
