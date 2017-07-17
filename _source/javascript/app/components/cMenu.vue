<script>
export default{
	name: 'cMenu',
};
</script>

<template>
<aside class="main-sidebar">
	<!-- sidebar: style can be found in sidebar.less -->
	<section class="sidebar">
		<!-- sidebar menu: : style can be found in sidebar.less -->
		<ul class="sidebar-menu">
			<li class="header">MENU</li>
			<li>
				<a href="pages/widgets.html">
					<i class="fa fa-th"></i> <span>Widgets</span>
					<span class="pull-right-container">
						<small class="label pull-right bg-green">new</small>
					</span>
				</a>
			</li>
			<li class="treeview">
				<a href="#">
					<i class="fa fa-pie-chart"></i>
					<span>{{ 'surveys' | translate }}</span>
					<span class="pull-right-container">
						<i class="fa fa-angle-left pull-right"></i>
					</span>
				</a>
				<ul class="treeview-menu">
					<li><router-link to="/new-survey"><i class="fa fa-circle-o"></i> Nova enquete</router-link></li>
				</ul>
			</li>
		</ul>
	</section>
	<!-- /.sidebar -->
</aside>
</template>

<style scoped>
	ul.sidebar-menu {
		text-transform: capitalize;
	}
</style>
