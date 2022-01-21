import { H2, H3, P1, Link } from '@yosefbeder/design-system/typography';
import NextLink from 'next/link';

const Home = () => {
	return (
		<>
			<H2>Shuiz</H2>
			<P1>
				A simple application for creating quiz and sharing them with others.
			</P1>
			<H3>Solving quiz</H3>
			<P1>
				After anyone finishes creating a quiz the quiz gets its own id and your
				friend (the person who created the quiz) can share that id (the url of
				the quiz) with you.
			</P1>
			<P1>
				After that you can solve the quiz once and your answers will be stored
				on your browser's local storage.
			</P1>
			<P1>
				If you want to experament with the idea visit{' '}
				<NextLink href="/mgwEbR5vw6" passHref>
					<Link>/mgwEbR5vw6</Link>
				</NextLink>
			</P1>
			<H3>Creating quiz</H3>
			<P1>Not implemented yet!</P1>
		</>
	);
};

export default Home;
