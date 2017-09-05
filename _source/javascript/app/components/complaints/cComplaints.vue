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
			const category = this.categories.filter((cat) => { // eslint-disable-line arrow-body-style
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
			<h1 v-if="status === 'complaint'">{{ 'complaints' | translate | capitalize }}
			</h1>
			<h1 v-if="status === 'case'">{{ 'cases' | translate | capitalize }}
			</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div v-if="complaints.length < 1" class="alert alert-info">
				<template v-if="status === 'complaint'">{{ 'no-complaints' | translate }}</template>
				<template v-if="status === 'case'">{{ 'no-cases' | translate }}</template>
			</div>
			<div class="row">
				<div class="col-md-6" v-for="complaint in complaints">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title"><router-link to="/">{{ complaint.title }}</router-link> <span v-if="remainingActions(complaint.actions)">Faltam: {{ remainingActions(complaint.actions) }} confirmações</span></h3>
						</div>
						<div class="box-body">
							<span>{{ complaint.address }}</span><br>
							<span><strong>Categoria:</strong> {{ categoryName(complaint.category) }}</span><br><br>
							<p>{{ complaint.description }}</p>

							<template v-if="status === 'case'">
								<h4>Respostas:</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices ante nec tristique placerat. Mauris lacus elit, sagittis sit amet neque vel, malesuada ultrices elit. Praesent hendrerit viverra elit sit amet accumsan.</p>
								<button type="button" class="btn btn-info">{{ 'new' | translate | capitalize }} {{ 'answer' | translate }}</button>
							</template>
						</div>
					</div>

				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
