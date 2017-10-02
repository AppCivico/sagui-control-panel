<script>
export default{
	name: 'cMenu',
	data() {
		return {
			selected: false,
		};
	},
	computed: {
		selectedEnterprise() {
			return this.$store.state.selectedEnterprise;
		},
		authorization() {
			return this.$store.state.auth.authorization;
		},
	},
	watch: {
		selectedEnterprise() {
			this.selected = true;
		},
	},
};
</script>

<template>
<aside class="main-sidebar">
	<!-- sidebar: style can be found in sidebar.less -->
	<section class="sidebar">
		<!-- sidebar menu: : style can be found in sidebar.less -->
		<ul class="sidebar-menu">
			<li class="treeview active">
				<a href="#">
					<i class="fa fa-file-text-o"></i>
					<span>{{ 'enterprises' | translate | capitalize }}</span>
				</a>
				<ul class="treeview-menu menu-open" v-if="selected">
					<li><router-link to="/enterprises"><i class="fa fa-circle-o"></i>{{ 'switch' | translate | capitalize }} {{ 'of-n' | translate }} {{ 'enterprise' | translate }}</router-link></li>
					<li><router-link :to="'/enterprises/'+selectedEnterprise"><i class="fa fa-circle-o"></i>{{ 'enterprise' | translate | capitalize }} {{ 'current' | translate }}</router-link></li>
				</ul>
			</li>
			<template v-if="selected">
				<li class="treeview">
					<a href="#">
						<i class="fa fa-pie-chart"></i>
						<span>{{ 'surveys' | translate | capitalize }}</span>
						<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
						</span>
					</a>
					<ul class="treeview-menu">
						<li><router-link to="/categories" v-if="authorization"><i class="fa fa-circle-o"></i>{{ 'categories' | translate | capitalize }}</router-link></li>
						<li><router-link to="/results"><i class="fa fa-circle-o"></i>{{ 'results' | translate | capitalize }}</router-link></li>
					</ul>
				</li>
				<li class="treeview">
					<router-link to="/complaints/0">
						<i class="fa fa-hand-o-right"></i>
						<span>{{ 'complaints' | translate | capitalize }}</span>
					</router-link>
				</li>
				<li class="treeview">
					<router-link to="/complaints/1">
						<i class="fa fa-hand-grab-o"></i>
						<span>{{ 'cases' | translate | capitalize }}</span>
					</router-link>
				</li>
				<li class="treeview">
					<router-link to="/notifications">
						<i class="fa fa-bell"></i>
						<span>{{ 'notifications' | translate | capitalize }}</span>
					</router-link>
				</li>
			</template>
		</ul>
	</section>
	<!-- /.sidebar -->
</aside>
</template>
