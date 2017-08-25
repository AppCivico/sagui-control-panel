<script>
export default {
	name: 'cCategories',
	computed: {
		agents() {
			return this.$store.state.agents;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_AGENTS_LIST');
	},
	methods: {
	},
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>{{ 'agents' | translate | capitalize }}
			</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="box box-solid">
				<div class="box-body">
					<template v-for="agent in agents">
						<div :class="'callout callout-info'">
							<h4>{{ agent.name }}</h4>
						</div>
					</template>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>

<style scoped>
	h4 {
		text-transform: uppercase;
	}
</style>
