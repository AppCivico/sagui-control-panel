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
			<li class="treeview">
				<router-link to="/">
					<i class="fa fa-file-text-o"></i>
					<span>{{ 'enterprises' | translate | capitalize }}</span>
				</router-link>
			</li>
			<li class="treeview">
				<a href="#">
					<i class="fa fa-pie-chart"></i>
					<span>{{ 'surveys' | translate | capitalize }}</span>
					<span class="pull-right-container">
						<i class="fa fa-angle-left pull-right"></i>
					</span>
				</a>
				<ul class="treeview-menu">
					<li><router-link to="/categories"><i class="fa fa-circle-o"></i> {{ 'categories' | translate | capitalize }}</router-link></li>
					<li><router-link to=""><i class="fa fa-circle-o"></i> {{ 'results' | translate | capitalize }}</router-link></li>
				</ul>
			</li>
		</ul>
	</section>
	<!-- /.sidebar -->
</aside>
</template>
