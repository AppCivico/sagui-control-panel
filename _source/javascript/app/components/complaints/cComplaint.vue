<script>
import Vue from 'vue';
import cAnswer from './cAnswer.vue';
import cAssets from '../utilities/cAssets.vue';
import cConfirm from '../utilities/cConfirm.vue';

export default {
	name: 'cComplaint',
	props: ['id'],
	components: {
		cAnswer,
		cAssets,
		cConfirm,
	},
	data() {
		return {
			isEditing: false,
			editingAnswer: {},
			editingAnswerIndex: 0,
			remainingActions: 0,
			fileTypes: {
				jpg: 'image',
				png: 'image',
				jpeg: 'image',
				mp4: 'video',
				mp3: 'audio',
			},
			file: {},
			ready: false,
			selected: -1,
		};
	},
	computed: {
		complaint() {
			return this.$store.state.complaints.complaint;
		},
		comments() {
			return this.$store.state.complaints.complaint.comments;
		},
		confirm() {
			return this.$store.state.confirm.state;
		},
	},
	watch: {
		confirm(newValue) {
			if (newValue === true) {
				this.deleteAsset(this.selected);
			}
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_COMPLAINT', this.id).then(() => {
			this.getRemainingActions();
			this.getFileType();
		});
	},
	methods: {
		getRemainingActions() {
			const confirmationsQtd = this.complaint.confirmations.length;
			const limit = this.complaint.num_to_became_cause;

			if (confirmationsQtd > 0 && confirmationsQtd < limit) {
				this.remainingActions = limit - confirmationsQtd;
			}
		},
		getFileType() {
			if (this.complaint.files.length > 0) {
				this.complaint.files.map((file) => {
					file.type = file.content_type.split('/')[0]; // eslint-disable-line no-param-reassign
				});
				this.ready = true;
			}
		},
		newAnswer() {
			this.isEditing = false;
		},
		addAnswer(result) {
			this.comments.push(result.newAnswer.data);
			this.comments[this.comments.length - 1].id = result.id;
			this.comments[this.comments.length - 1].created_at = result.created_at;
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
		setAsset(file) {
			this.file = file;
		},
		removeAsset(index) {
			this.$store.dispatch('CHANGE_CONFIRM_MESSAGE', { message: Vue.i18n.translate('remove-asset') });
			this.selected = index;
		},
		deleteAsset(index) {
			const data = {
				id: this.complaint.files[index].id,
				resource_id: this.complaint.files[index].resource_id,
				resource_type: this.complaint.files[index].resource_type,
			};
			this.$store.dispatch('DELETE_IMAGE', data).then(() => {
				this.complaint.files.splice(index, 1);
				this.$store.dispatch('EDIT_CONFIRM_STATE', false);
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
							<h3 class="box-title">
								<router-link to="/">{{ complaint.title | capitalize }}</router-link>
								<span v-if="remainingActions > 0" class="remaining">
									{{ 'remain' | translate | capitalize }} {{ remainingActions }}
									<template v-if="remainingActions === 1">{{ 'contribution' | translate }}</template>
									<template v-else>{{ 'contributions' | translate }}</template>
								</span>
							</h3>
						</div>
						<div class="box-body">
							<button v-if="complaint.is_cause === 0"  type="button" class="btn btn-danger pull-right" @click="deleteComplaint()">{{ 'delete' | translate | capitalize }} {{ 'complaint' | translate }}</button>
							<button v-else  type="button" class="btn btn-danger pull-right" @click="deleteComplaint()">{{ 'delete' | translate | capitalize }} {{ 'case' | translate }}</button>
							<span>{{ complaint.human_address }}</span><br>
							<span>{{ complaint.axis.name }}</span><br><br>
							<p>{{ complaint.description }}</p>
							<hr>
							<template v-if="complaint.files.length > 0 && this.ready">
								<h5><strong>{{ 'files' | translate | capitalize }}</strong></h5>
								<div class="row">
									<div class="col-md-2" v-for="(file, index) in complaint.files">
										<button type="button" aria-label="Excluir" class="close" @click="removeAsset(index)"><span aria-hidden="true">×</span></button>
										<template v-if="file.type === 'application'">
											<a :href="file.path" download target="_blank"><img src="../dist/img/video-default.png" class="img-responsive" alt="Download áudio"></a>
										</template>
										<template v-else>
											<a href="#" data-toggle="modal" data-target="#assets" @click.prevent="setAsset(file)">
												<template v-if="file.thumbnail">
													<img :src="file.thumbnail" class="img-responsive">
												</template>
												<template v-else>
													<img :src="file.path" class="img-responsive" v-if="file.type === 'image'">
													<img src="../dist/img/video-default.png" class="img-responsive" alt="Abrir vídeo" v-else-if="file.type === 'video'">
												</template>
											</a>
										</template>
									</div>
								</div>
							</template>
						</div>
						<div class="box-footer box-comments">
							<h5><strong>{{ 'answers' | translate | capitalize }}</strong></h5>
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
							<button type="button"class="btn btn-info" data-toggle="modal" data-target="#answer" @click="newAnswer()">{{ 'new' | translate | capitalize }} {{ 'answer' | translate }}</button>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /.content -->
		<c-answer :answer="this.editingAnswer" :complaintId="this.id" :isEditing="this.isEditing" v-on:newAnswer="addAnswer" v-on:editAnswer="editAnswer"></c-answer>
		<c-assets :file="this.file"></c-assets>
		<c-confirm></c-confirm>
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
