<script>
import cAnswer from './cAnswer.vue';

export default {
	name: 'cComplaint',
	props: ['id'],
	components: {
		cAnswer,
	},
	data() {
		return {
			isEditing: false,
			editingAnswer: {},
			editingAnswerIndex: 0,
		};
	},
	computed: {
		complaint() {
			return this.$store.state.complaints.complaint;
		},
		comments() {
			return this.$store.state.complaints.complaint.comments;
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
		newAnswer() {
			this.isEditing = false;
		},
		addAnswer(result) {
			this.comments.push(result.newAnswer.data);
			this.comments[this.comments.length - 1].id = result.id;
		},
		editAnswer(result) {
			if (result) {
				this.comments.splice(this.editingAnswerIndex, 1, result.newAnswer);
			}
		},
		converteDate(timestamp) {
			return timestamp
				.split('T')[0]
				.split('-')
				.reverse()
				.join('/');
		},
		setEditingAnswer(answer, index) {
			this.editingAnswer = answer;
			this.editingAnswerIndex = index;
			this.isEditing = true;
		},
		deleteComplaint() {
			this.$store.dispatch('DELETE_COMPLAINT', this.id);
		},
		removeAnswer(answer, number) {
			const info = {
				id: this.id,
				answerId: answer.id,
			};
			this.$store.dispatch('DELETE_ANSWER', info).then(() => {
				this.comments.splice(number, 1);
			});
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
							<!-- adicionar v-if quando tiver flag de status -->
							<h3 class="box-title"><router-link to="/">{{ complaint.title | capitalize }}</router-link> <span v-if="remainingActions(complaint.confirmations)" class="remaining">Faltam: {{ remainingActions(complaint.confirmations) }} confirmações</span></h3>
						</div>
						<div class="box-body">
							<button type="button" class="btn btn-danger pull-right" @click="deleteComplaint()">{{ 'delete' | translate | capitalize }} {{ 'complaint' | translate }}</button>
							<span>{{ complaint.human_address }}</span><br>
							<span>{{ complaint.axis.name }}</span><br><br>
							<p>{{ complaint.description }}</p>
						</div>
						<div class="box-footer box-comments">
							<h5><strong>Respostas:</strong></h5>
							<div class="box-comment" v-for="(answer, index) in comments">
								<div class="comment-text" >
									<span class="username">
										<template v-if="answer.created_at">{{ converteDate(answer.created_at) }}</template>
										<button type="button" aria-label="Excluir" class="close" @click="removeAnswer(answer, index)"><span aria-hidden="true">×</span></button>
										<button type="button" aria-label="Editar" data-toggle="modal" data-target="#answer" class="edit-button" @click="setEditingAnswer(answer, index)"><i class="fa fa-edit"></i></button>
									</span>
									{{ answer.content }}
								</div>
							</div>
							<button type="button" class="btn btn-info" data-toggle="modal" data-target="#answer" @click="newAnswer()">{{ 'new' | translate | capitalize }} {{ 'answer' | translate }}</button>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /.content -->
		<c-answer :answer="this.editingAnswer" :complaintId="this.id" :isEditing="this.isEditing" v-on:newAnswer="addAnswer" v-on:editAnswer="editAnswer"></c-answer>
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
	.box-comments .comment-text {
		margin-left: 0;
	}
</style>
