import DUMMY_DATA from '../dummy-data.json';
import { H2, P1, P2 } from '@yosefbeder/design-system/typography';

export const getStaticPaths = () => {
	return {
		paths: DUMMY_DATA.map(({ id }) => ({ params: { id } })),
		fallback: 'blocking',
	};
};

export const getStaticProps = ({ params: { id } }) => {
	return {
		props: DUMMY_DATA.find(quiz => id === quiz.id),
	};
};

const Quiz = ({ id, title, description }) => {
	return (
		<>
			<P2>{id}</P2>
			<H2>{title}</H2>
			<P1>{description}</P1>
		</>
	);
};

export default Quiz;
