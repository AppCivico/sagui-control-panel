<script>
export default {
	name: 'cResults',
};
</script>

<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>
				{{ 'results' | translate | capitalize }}
			</h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="box box-solid">
				<div class="box-body">
					<button type="button" class="btn btn-primary">
						{{ 'download-csv' | translate | capitalize }}
					</button>
				</div>
			</div>
		</section>
		<!-- /.content -->
	</div>
</template>
