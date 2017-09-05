<script>
import cHeader from './components/layout/cHeader.vue';
import cMenu from './components/layout/cMenu.vue';
import cAlert from './components/utilities/cAlert.vue';


export default {
	name: 'app',
	components: {
		cHeader,
		cMenu,
		cAlert,
	},
};
</script>

<template>
	<div id="app">
		<template v-if="$route.path !== '/'">
			<div class="loading">
				<i class="fa fa-refresh fa-spin"></i>
			</div>
			<div class="wrapper">
				<c-header ></c-header>
				<c-menu></c-menu>
				<div class="content-wrapper">
					<router-view></router-view>
				</div>
			</div>
		</template>
		<template v-else>
			<router-view></router-view>
		</template>
		<c-alert></c-alert>
	</div>
</template>
