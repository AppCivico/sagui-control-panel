<script>
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
	methods: {
		addOption() {
			this.options.push({});
		},
		removeOption(number) {
			console.log(number);
			this.options.splice(1, 1);
			console.log(this.options);
		},
		cleanFields() {
			const title = document.querySelector('#new-question input[name="title"]');
			title.value = '';
			this.type = '';
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
						<select class="form-control" v-model="type">
							<option value="">Escolha um tipo de resposta</option>
							<option v-for="option in types" :value="option">{{ option | translate | capitalize }}</option>
						</select>
					</div>
					<hr>
					<div v-if="type == 'traffic_light'">
						<div class="form-group">
							<label>Verde</label>
							<input type="text" class="form-control" placeholder="Verde">
						</div>
						<div class="form-group">
							<label>Amarelo</label>
							<input type="text" class="form-control" placeholder="Amarelo">
						</div>
						<div class="form-group">
							<label>Vermelho</label>
							<input type="text" class="form-control" placeholder="Vermelho">
						</div>
					</div>
					<div v-if="type == 'multiple'">
						<div class="form-group" v-for="(option, index) in options">
							<button type="button" aria-label="Excluir" class="close" @click="removeOption(index)"><span aria-hidden="true">×</span></button>
							<label>{{ 'option' | translate | capitalize }} {{ index + 1 }}</label>
							<input type="text" class="form-control" :placeholder="'insert_option' | translate | capitalize">
						</div>
						<button type="button" class="btn btn-primary" @click="addOption()">{{ 'add' | translate | capitalize }} {{ 'option' | translate }}</button>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default pull-left" data-dismiss="modal" @click="cleanFields()">{{ 'cancel' | translate | capitalize }}</button>
					<button type="button" class="btn btn-primary">{{ 'add' | translate | capitalize }}</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</template>
