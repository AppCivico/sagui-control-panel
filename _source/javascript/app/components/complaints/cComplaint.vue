<script>
export default {
	name: 'cComplaints',
	props: ['id'],
	computed: {
		complaint() {
			return this.$store.state.complaints.complaint;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_COMPLAINT', this.id);
	},
	methods: {
		remainingActions(actions) {
			if (actions < 30) {
				return 30 - actions;
			}
			return false;
		},
	},
};
</script>

<template>
	<div>
		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-solid complaint">
						<div class="box-header with-border">
							<h3 class="box-title"><router-link to="/">{{ complaint.title }}</router-link> <span v-if="remainingActions(complaint.confirmations)" class="remaining">Faltam: {{ remainingActions(complaint.confirmations) }} confirmações</span></h3>
						</div>
						<div class="box-body">
							<span>{{ complaint.human_address }}</span><br>
							<span>{{ complaint.axis.name }}</span><br><br>
							<p>{{ complaint.description }}</p>

							<h4>Respostas:</h4>
							<template v-if="complaint.comments.length > 1">
								<div v-for="comment in comments" >
									<span>{{ comment.created_at }}</span>
									<p>{{ comment.content }}</p>
								</div>
							</template>
							<template v-else>
								<div class="alert alert-info">
									{{ 'no-answers' | translate }}
								</div>
							</template>
							<button type="button" class="btn btn-info">{{ 'new' | translate | capitalize }} {{ 'answer' | translate }}</button>
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
		min-height: 150px;
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
