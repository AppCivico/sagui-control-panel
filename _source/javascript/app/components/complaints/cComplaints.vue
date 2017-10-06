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
			this.$store.dispatch('LOAD_COMPLAINTS_LIST', this.status);
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_COMPLAINTS_LIST', this.status);
	},
	methods: {
		remainingActions(i) {
			const confirmationsQtd = this.complaints[i].confirmations.length;
			const limit = this.complaints[i].num_to_became_cause;

			if (confirmationsQtd > 0 && confirmationsQtd < limit) {
				return limit - confirmationsQtd;
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
			<h1 v-if="status === '0'">{{ 'complaints' | translate | capitalize }}
			</h1>
			<h1 v-else>{{ 'cases' | translate | capitalize }}
			</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div v-if="complaints.length < 1" class="alert alert-info">
				<template v-if="status === '0'">{{ 'no-complaints' | translate }}</template>
				<template v-else>{{ 'no-cases' | translate }}</template>
			</div>
			<div class="row" v-else>
				<div class="col-md-4" v-for="(complaint, index) in complaints">
					<div class="box box-solid complaint">
						<div class="box-header with-border">
							<h3 class="box-title">
								<router-link :to="'/complaint/'+complaint.id">{{ complaint.title | capitalize }}</router-link>
								<span v-if="remainingActions(index)" class="remaining">
									{{ 'remain' | translate | capitalize }} {{ remainingActions(index) }}
									<template v-if="remainingActions(index) === 1">{{ 'contribution' | translate }}</template>
									<template v-else>{{ 'contributions' | translate }}</template>
								</span>
							</h3>
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
