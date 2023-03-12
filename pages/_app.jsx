import '../styles/global.css';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }) {
  return (
		<ThemeProvider defaultTheme = 'light'>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}