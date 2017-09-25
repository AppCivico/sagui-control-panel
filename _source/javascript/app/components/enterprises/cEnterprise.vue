<script>
/* eslint-disable no-undef, new-parens */
export default {
	name: 'cEnterprise',
	props: ['id'],
	computed: {
		enterprise() {
			return this.$store.state.enterprise;
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
				this.decodePath();
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
				zoom: 14,
			});
			const polygon = new google.maps.Polygon({
				paths: this.decodedPath,
				draggable: true, // turn off if it gets annoying
				editable: true,
				strokeColor: '#FF0000',
				strokeOpacity: 0.1,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.1,
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
			<router-link :to="'/edit-enterprise/'+enterprise.id" class="btn btn-primary pull-right">{{ 'edit' | translate | capitalize }} {{ 'enterprise' | translate }}</router-link>
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
								<li class="clearfix">
									<h4 class="pull-left">Lorem ipsum dolor</h4>
									<small class="pull-right">37 {{ 'contributions' | translate }}</small>
								</li>
								<li class="clearfix">
									<h4 class="pull-left">Lorem ipsum dolor</h4>
									<small class="pull-right">37 {{ 'contributions' | translate }}</small>
								</li>
								<li class="clearfix">
									<h4 class="pull-left">Lorem ipsum dolor</h4>
									<small class="pull-right">37 {{ 'contributions' | translate }}</small>
								</li>
								<li class="clearfix">
									<h4 class="pull-left">Lorem ipsum dolor</h4>
									<small class="pull-right">37 {{ 'contributions' | translate }}</small>
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
							<p>Text 1</p>
							<div class="progress">
								<div class="progress-bar progress-bar-green" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
									<span class="sr-only">40% Complete (success)</span>
								</div>
							</div>
							<p>Text 2</p>
							<div class="progress">
								<div class="progress-bar progress-bar-aqua" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
									<span class="sr-only">20% Complete</span>
								</div>
							</div>
							<p>Text 3</p>
							<div class="progress">
								<div class="progress-bar progress-bar-yellow" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
									<span class="sr-only">60% Complete (warning)</span>
								</div>
							</div>
							<p>Text 4</p>
							<div class="progress">
								<div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
									<span class="sr-only">80% Complete</span>
								</div>
							</div>
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
