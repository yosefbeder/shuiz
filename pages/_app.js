import '@yosefbeder/design-system/index.css';
import '../index.css';
import '@yosefbeder/design-system/colors/green.css';
import '@yosefbeder/design-system/colors/amber.css';
import '@yosefbeder/design-system/colors/red.css';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
