<script>
/* eslint-disable no-undef, new-parens */
export default {
	name: 'cEnterprise',
	props: ['id'],
	computed: {
		enterprise() {
			return this.$store.state.enterprises.enterprise;
		},
		complaints() {
			return this.$store.state.complaints.complaints;
		},
		authorization() {
			return this.$store.state.auth.authorization;
		},
		complaintsUnanswered() {
			return this.complaints.filter(complaint => complaint.comments.length === 0).slice(0, 5);
		},
		top5Complaints() {
			const top5 = this.complaints.sort((a, b) => {
				if (a.confirmations > b.confirmations) {
					return -1;
				}
				if (a.confirmations < b.confirmations) {
					return 1;
				}

				return 0;
			});
			top5.map((complaint) => {
				/* eslint-disable no-param-reassign */
				complaint.width = (100 * complaint.confirmations.length) / complaint.num_to_became_cause;
				if (complaint.confirmations.length >= complaint.num_to_became_cause) {
					complaint.color = 'green';
				} else {
					complaint.color = 'aqua';
				}
			});

			return top5.slice(0, 5);
		},
	},
	data() {
		return {
			decodedPath: '',
		};
	},
	mounted() {
		this.$store.dispatch('LOAD_ENTERPRISE', this.id).then(() => {
			if (this.enterprise.location) {
				this.$store.dispatch('LOAD_COMPLAINTS_LIST', { status: '' }).then(() => {
					this.decodePath();
				});
			}
		});
		this.$store.dispatch('CHANGE_SELECTED_ENTERPRISE', this.id);
	},
	methods: {
		decodePath() {
			this.decodedPath = google.maps.geometry.encoding.decodePath(this.enterprise.location);
			this.initMap();
		},
		initMap() {
			const bounds = new google.maps.LatLngBounds();
			const map = new google.maps.Map(document.getElementById('enterprise__map'), {
				zoom: 11,
			});
			const polygon = new google.maps.Polygon({
				paths: this.decodedPath,
				draggable: false, // turn off if it gets annoying
				editable: false,
				strokeColor: '#FF0000',
				strokeOpacity: 0.1,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.1,
			});

			this.complaints.map((complaint) => {
				const marker = new google.maps.Marker({ // eslint-disable-line no-unused-vars
					position: {
						lat: complaint.location.lat,
						lng: complaint.location.long,
					},
					map,
					title: complaint.title,
				});
			});

			this.decodedPath.map((item) => {
				bounds.extend(item);
			});

			polygon.setMap(map);
			google.maps.event.trigger(map, 'resize');
			map.setCenter(bounds.getCenter());
		},
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1 class="pull-left">
				{{ 'enterprise' | translate | capitalize }}
				<small>{{ enterprise.name }}</small>
			</h1>
			<router-link :to="'/edit-enterprise/'+enterprise.id" class="btn btn-primary pull-right" v-if="authorization">{{ 'edit' | translate | capitalize }} {{ 'enterprise' | translate }}</router-link>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="info-box">
						<span class="info-box-icon bg-aqua"><span class="glyphicon glyphicon-hand-right"></span></span>

						<div class="info-box-content">
							<span class="info-box-text">{{ 'complaints' | translate }}</span>
							<span class="info-box-number">{{ enterprise.data ? enterprise.data.complaints : 0 }}</span>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="info-box">
						<span class="info-box-icon bg-red"><span class="glyphicon glyphicon-hand-right"></span></span>

						<div class="info-box-content">
							<span class="info-box-text">{{ 'cases' | translate }}</span>
							<span class="info-box-number">{{ enterprise.data ? enterprise.data.cases : 0 }}</span>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="info-box">
						<span class="info-box-icon bg-green"><span class="glyphicon glyphicon-thumbs-up"></span></i></span>

						<div class="info-box-content">
							<span class="info-box-text">{{ 'actions' | translate }}</span>
							<span class="info-box-number">{{ enterprise.data ? enterprise.data.actions : 0 }}</span>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-xs-12">
					<div class="info-box">
						<span class="info-box-icon bg-yellow"><span class="glyphicon glyphicon-ok"></span></i></span>

						<div class="info-box-content">
							<span class="info-box-text">{{ 'surveys_completed' | translate }}</span>
							<span class="info-box-number">{{ enterprise.data ? enterprise.data.surveys : 0 }}</span>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">{{ 'actions_unanswered' | translate | capitalize }}</h3>
						</div>
						<div class="box-body">
							<ul class="list-unstyled">
								<li class="clearfix" v-for="complaint in complaintsUnanswered">
									<h4 class="pull-left"><router-link :to="'/complaint/'+complaint.id">{{ complaint.title | capitalize }}</router-link></h4>
									<small class="pull-right" v-if="complaint.confirmations.length > 0">
										{{ complaint.confirmations.length }}
										<template v-if="complaint.confirmations.length === 1">{{ 'contribution' | translate }}</template>
										<template v-else>{{ 'contributions' | translate }}</template>
									</small>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="box box-solid">
						<div class="box-header with-border">
							<h3 class="box-title">{{ 'ranking' | translate | capitalize }} {{ 'complaints' | translate }}</h3>
						</div>
						<div class="box-body">
							<template v-for="complaint in top5Complaints">
								<router-link :to="'/complaint/'+complaint.id">{{ complaint.title | capitalize }}</router-link>
								<div class="progress">
									<div :class="'progress-bar progress-bar-'+complaint.color" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="'width: '+complaint.width+'%'">
										<span class="sr-only">{{ complaint.width }}% Complete (success)</span>
									</div>
								</div>
							</template>
						</div>
						<!-- /.box-body -->
					</div>
				</div>
			</div>

			<div class="row" v-if="this.enterprise.location">
				<div class="col-md-12">
					<div id="enterprise__map"></div>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>

<style scoped>
	.info-box-number {
		font-size: 40px;
	}
	.content-header {
		display: table;
		width: 100%;
	}
	#enterprise__map {
		height: 450px;
		width: 100%;
	}
</style>
