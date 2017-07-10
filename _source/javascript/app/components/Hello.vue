<template>
	<div id="hello">
		<img src="http://vuejs.org/images/logo.png">
		<h1>{{ msg }}</h1>
		<h2>Essential Links</h2>
		<ul>
			<li> <router-link to="/oi">Go to Foo</router-link></li>
			<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
			<li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
			<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
		</ul>
		<h2>Ecosystem</h2>
		<ul>
			<li v-for="enterprise in enterprises">{{ enterprise.name }}</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'hello',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App',
		};
	},
	computed: {
		enterprises() {
			return this.$store.state.enterprises;
		},
	},
	mounted() {
		this.$store.dispatch('LOAD_ENTERPRISES_LIST');
	},
};
</script>

<style scoped>
#hello {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

h1, h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
</style>
