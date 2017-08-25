<script>
export default {
	name: 'cEnterpriseLocation',
	props: ['placeId'],
	data() {
		return {
			map: '',
		};
	},
	computed: {
	},
	mounted() {
		this.initMap();
	},
	methods: {
		centerMap() {
			$('#enterprise-location').on('shown.bs.modal', () => { // eslint-disable-line no-undef
				// eslint-disable-next-line no-undef, new-parens
				const geocoder = new google.maps.Geocoder;
				geocoder.geocode({ placeId: this.placeId }, (results, status) => {
					if (status === 'OK') {
						if (results[0]) {
							this.map.setZoom(15);

							// eslint-disable-next-line no-undef, no-unused-vars
							const marker = new google.maps.Marker({
								map: this.map,
								position: results[0].geometry.location,
							});

							// eslint-disable-next-line no-undef
							google.maps.event.trigger(this.map, 'resize');
							this.map.setCenter(results[0].geometry.location);
						} else {
							window.alert('No results found');
						}
					} else {
						window.alert(`Geocoder failed due to: ${status}`);
					}
				});
			});
		},
		initMap() {
			// eslint-disable-next-line no-undef
			this.map = new google.maps.Map(document.getElementById('enterprise-location__map'));
			this.centerMap();
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
					<button type="button" class="btn btn-primary" data-dismiss="modal">Salvar</button>
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
