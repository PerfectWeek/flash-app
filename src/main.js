import App from './App.svelte';
import { RequestPlugin } from './plugins/Request';
import { QRCodePlugin } from './plugins/QRCode';

const app = new App({
	target: document.body,
	props: {
		requestPlugin: new RequestPlugin(),
		QRCodePlugin: new QRCodePlugin(),
	}
});

export default app;
