<script>
/* eslint-disable no-undef, new-parens */
export default {
	name: 'cEnterpriseLocation',
	props: ['placeId'],
	data() {
		return {
			map: '',
			polygon: '',
		};
	},
	computed: {
	},
	mounted() {
		this.initMap();
	},
	methods: {
		centerMap() {
			$('#enterprise-location').on('shown.bs.modal', () => {
				const geocoder = new google.maps.Geocoder;
				geocoder.geocode({ placeId: this.placeId }, (results, status) => {
					if (status === 'OK') {
						if (results[0]) {
							const center = results[0].geometry.location;
							this.map.setZoom(14);
							this.generatePolygon(center);
						} else {
							window.alert('No results found');
						}
					} else {
						window.alert(`Geocoder failed due to: ${status}`);
					}
				});
			});
		},
		generatePolygon(center) {
			// clear previous polylines
			if (typeof this.polygon !== 'string') {
				this.polygon.setMap(null);
			}

			// get polygon points
			const spherical = google.maps.geometry.spherical;
			const triangleCoords = [
				spherical.computeOffset(center, 1000, 0),
				spherical.computeOffset(center, 1000, -90),
				spherical.computeOffset(center, 1000, 180),
				spherical.computeOffset(center, 1000, 90),
			];

			// create polygon
			this.polygon = new google.maps.Polygon({
				paths: triangleCoords,
				draggable: true, // turn off if it gets annoying
				editable: true,
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#FF0000',
				fillOpacity: 0.35,
			});

			this.polygon.setMap(this.map);

			google.maps.event.trigger(this.map, 'resize');
			this.map.setCenter(center);
		},
		initMap() {
			this.map = new google.maps.Map(document.getElementById('enterprise-location__map'));
			this.centerMap();
		},
		savePolygon() {
			const finalPath = this.polygon.getPath();
			const encodedPath = google.maps.geometry.encoding.encodePath(finalPath);
			this.$emit('finalPath', encodedPath);

			$('#enterprise-location').modal('hide');
		},
	},
};
</script>

<template>
	<div class="modal fade in" id="enterprise-location">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Cancelar">
						<span aria-hidden="true">×</span></button>
					<h4 class="modal-title">Escolher pontos</h4>
				</div>
				<div class="modal-body">
					<div id="enterprise-location__map"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" @click="savePolygon()">Salvar</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
</template>

<style scoped>
	#enterprise-location__map {
		height: 400px;
		width: 100%;
	}
</style>
