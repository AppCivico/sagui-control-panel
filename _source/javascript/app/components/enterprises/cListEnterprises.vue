<script>
import config from '../../config'; // eslint-disable-line no-unused-vars

export default {
	name: 'cListEnterprises',
	data() {
		return {
			url: config.url,
			thumbnails: [],
		};
	},
	computed: {
		enterprises() {
			return this.$store.state.enterprises.enterprises;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_ENTERPRISES_LIST').then(() => {
			this.getThumbnails();
		});
	},
	methods: {
		getThumbnails() {
			this.enterprises.map((item) => {
				if (item.images[0]) {
					const thumbnail = `background-image: url(${this.url}/${item.images[0].image_path})`;
					this.thumbnails.push(thumbnail);
				} else {
					this.thumbnails.push('');
				}
			});
		},
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class='content-header'>
			<h1 class='pull-left'>{{ 'choose_enterprise' | translate }}</h1>
			<router-link to='/new-enterprise' class='btn btn-primary pull-right'>{{ 'new-m' | translate | capitalize }} {{ 'enterprise' | translate }}</router-link>
		</section>

		<!-- Main content -->
		<section class='content'>
			<div class='row'>
				<div class='col-md-6' v-for='(enterprise, i) in enterprises'>
					<div class='info-box'>
						<div class='col-md-3 info-box-image' :style='thumbnails[i]'></div>

						<div class='col-md-9 info-box-content'>
							<span class='info-box-text'>
								<router-link :to="'/enterprises/'+enterprise.id">{{ enterprise.name }}</router-link>
								<p>{{ enterprise.human_address }}</p>
								<ul class='list-unstyled'>
									<li>{{ enterprise.data.complaints }} {{ 'complaints' | translate }}</li>
									<li>{{ enterprise.data.cases }} {{ 'cases' | translate }}</li>
									<li>{{ enterprise.data.actions }} {{ 'actions' | translate }}</li>
									<li>{{ enterprise.data.surveys }} {{ 'surveys_completed' | translate }}</li>
								</ul>
							</span>
						</div>

					</div>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>

<style scoped>
	.content-header {
		display: table;
		width: 100%;
	}
	.info-box {
		display: table;
	}
	.info-box-image {
		background-color: #ccc;
		background-position: center;
	    background-size: cover;
	    height: 200px;
	    display: inline-block;
	}
	.info-box-content {
   		margin: 0;
	}
</style>
