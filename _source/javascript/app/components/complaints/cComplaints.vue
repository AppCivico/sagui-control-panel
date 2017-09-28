<script>
export default {
	name: 'cComplaints',
	props: ['status'],
	computed: {
		complaints() {
			return this.$store.state.complaints.complaints;
		},
	},
	watch: {
		status() {
			this.$store.dispatch('LOAD_COMPLAINTS_LIST', { status: this.status });
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_COMPLAINTS_LIST', { status: this.status });
	},
	methods: {
		remainingActions(actions) {
			if (actions < 30) {
				return 30 - actions;
			}
			return false;
		},
		shortDescription(description) {
			return description.replace(/^(.{100}[^\s]*).*/, '$1');
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
			<h1 v-else>{{ 'cases' | translate | capitalize }}
			</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div v-if="complaints.length < 1" class="alert alert-info">
				<template v-if="status === 'complaint'">{{ 'no-complaints' | translate }}</template>
				<template v-else>{{ 'no-cases' | translate }}</template>
			</div>
			<div class="row" v-else>
				<div class="col-md-4" v-for="complaint in complaints">
					<div class="box box-solid complaint">
						<div class="box-header with-border">
							<h3 class="box-title"><router-link :to="'/complaint/'+complaint.id">{{ complaint.title }}</router-link> <span v-if="remainingActions(complaint.confirmations)" class="remaining">Faltam: {{ remainingActions(complaint.confirmations) }} confirmações</span></h3>
						</div>
						<div class="box-body">
							<span>{{ complaint.human_address }}</span><br>
							<span>{{ complaint.axis.name }}</span><br><br>
							<p>{{ shortDescription(complaint.description) }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>

<style scoped>
	.complaint {
		min-height: 180px;
	}
	.complaint .box-title {
		width: 100%;
		display: table;
	}
	.complaint .remaining {
		float: right;
		font-size: 0.8em;
	}
	.complaint .box-body span {
		font-size: 0.9em;
	}
</style>
