import db from './db';

import App from './App.svelte';

const app = new App({
	target: document.body,
	props: { db },
});

export default app;
