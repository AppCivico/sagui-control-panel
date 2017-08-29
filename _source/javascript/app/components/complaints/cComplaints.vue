<script>
export default {
	name: 'cComplaints',
	props: ['status'],
	computed: {
		complaints() {
			return this.$store.state.complaints;
		},
		selectedEnterprise() {
			return this.$store.state.selectedEnterprise;
		},
		categories() {
			return this.$store.state.categories;
		},
	},
	watch: {
		status() {
			this.$store.dispatch('LOAD_COMPLAINTS_LIST', { enterprise: this.selectedEnterprise, status: this.status });
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_CATEGORIES_LIST', this.selectedEnterprise);
		this.$store.dispatch('LOAD_COMPLAINTS_LIST', { enterprise: this.selectedEnterprise, status: this.status });
	},
	methods: {
		remainingActions(actions) {
			if (actions < 30) {
				return 30 - actions;
			}
			return false;
		},
		categoryName(id) {
			const category = this.categories.filter((cat) => {
				return cat.id === id;
			});
			return category[0].title;
		},
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'complaints' | translate | capitalize }}
			</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="box box-solid">
				<div class="box-body">
					<div class="row">
						<div class="col-md-6" v-for="complaint in complaints">
							<h4><router-link to="/">{{ complaint.title }}</router-link> <span v-if="remainingActions(complaint.actions)">Faltam: {{ remainingActions(complaint.actions) }} confirmações</span></h4>
							<span>{{ complaint.address }}</span><br>
							<span><strong>Categoria:</strong> {{ categoryName(complaint.category) }}</span>
							<p>{{ complaint.description }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
