<script>
export default {
	name: 'cQuestion',
	data() {
		return {
			multiple: 1,
			type: '',
			types: ['farol', 'multiple', 'textarea'],
		};
	},
	methods: {
		addOption(event) {
			const target = event.target;
			const option = `<div class="form-group">
								<label>Opção ${this.multiple + 1}</label>
								<input type="text" class="form-control" placeholder="Digite aqui uma opção">
							</div>`;
			target.insertAdjacentHTML('beforebegin', option);
			this.multiple += 1;
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
					<h4 class="modal-title">Nova pergunta</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label>Título</label>
						<input type="text" class="form-control" name="title" placeholder="Título">
					</div>
					<div class="form-group">
						<label>Tipo</label>
						<select class="form-control" v-model="type">
							<option value="">Escolha um tipo de resposta</option>
							<option v-for="option in types" :value="option">{{ option }}</option>
						</select>
					</div>
					<hr>
					<div v-if="type == 'farol'">
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
						<div class="form-group">
							<label>Opção 1</label>
							<input type="text" class="form-control" placeholder="Digite aqui uma opção">
						</div>
						<button type="button" class="btn btn-primary" @click="addOption($event)">Adicionar opção</button>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default pull-left" data-dismiss="modal" @click="cleanFields()">Cancelar</button>
					<button type="button" class="btn btn-primary">Adicionar</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</template>
