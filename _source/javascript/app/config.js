const config = {
	url: 'http://dev-sagui-api.eokoe.com',
	name: 'Projeto Sagui',
};

if (process.env.NODE_ENV !== 'production') {
	config.api = 'http://dev-sagui-api.eokoe.com/v1';
} else {
	config.api = 'http://dev-sagui-api.eokoe.com/v1';
}

export { config as default };
