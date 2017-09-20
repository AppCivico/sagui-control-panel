<script>
export default {
	name: 'cListEnterprises',
	data() {
		return {
			thumbnails: [],
		};
	},
	computed: {
		enterprises() {
			return this.$store.state.enterprises;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_ENTERPRISES_LIST').then(() => {
			this.getThumbnails();
		});
		// jQuery.AdminLTE.layout.activate();
	},
	methods: {
		getThumbnails() {
			this.enterprises.map((item) => {
				if (item.images[0]) {
					const thumbnail = `background-image: url(http://dev-sagui-api.eokoe.com/${item.images[0].image_path})`;
					this.thumbnails.push(thumbnail);
				} else {
					this.thumbnails.push('');
				}
			});
		},
		/* fix() {
			// Remove overflow from .wrapper if layout-boxed exists
			$('.layout-boxed > .wrapper').css('overflow', 'hidden');
			// Get window height and the wrapper height
			const footerHeight = $('.main-footer').outerHeight() || 0;
			const neg = $('.main-header').outerHeight() + footerHeight;
			const windowHeight = $(window).height();
			const sidebarHeight = $('.sidebar').height() || 0;
			// Set the min-height of the content and sidebar based on the
			// the height of the document.
			if ($('body').hasClass('fixed')) {
				$('.content-wrapper, .right-side').css('min-height', windowHeight - footerHeight);
			} else {
				let postSetWidth;
				if (windowHeight >= sidebarHeight) {
				$('.content-wrapper, .right-side').css('min-height', windowHeight - neg);
				postSetWidth = windowHeight - neg;
			} else {
				$('.content-wrapper, .right-side').css('min-height', sidebarHeight);
				postSetWidth = sidebarHeight;
			}

			// Fix for the control sidebar height
			const controlSidebar = $($.AdminLTE.options.controlSidebarOptions.selector);
			if (typeof controlSidebar !== 'undefined') {
				if (controlSidebar.height() > postSetWidth)
					$('.content-wrapper, .right-side').css('min-height', controlSidebar.height());
				}
			}
		},
		fixSidebar() {
			// Make sure the body tag has the .fixed class
			if (!$('body').hasClass('fixed')) {
				if (typeof $.fn.slimScroll !== 'undefined') {
					$('.sidebar').slimScroll({ destroy: true }).height('auto');
				}
				return;
			} else if (typeof $.fn.slimScroll === 'undefined' && window.console) {
				window.console.error('Error: the fixed layout requires the slimscroll plugin!');
			}
			// Enable slimscroll for fixed layout
			if ($.AdminLTE.options.sidebarSlimScroll) {
				if (typeof $.fn.slimScroll !== 'undefined') {
					// Destroy if it exists
					$('.sidebar').slimScroll({ destroy: true }).height('auto');
					// Add slimscroll
					$('.sidebar').slimScroll({
						height: `${($(window).height() - $('.main-header').height())}px`,
						color: 'rgba(0,0,0,0.2)',
						size: '3px',
					});
				}
			}
		}, */
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
								<router-link :to=''/enterprises/'+enterprise.id'>{{ enterprise.name }}</router-link>
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
