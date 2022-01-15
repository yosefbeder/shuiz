import { useEffect, useState, useRef } from 'react';
import DUMMY_DATA from '../dummy-data.json';
import { H2, P1, P2 } from '@yosefbeder/design-system/typography';
import Question from '../components/Question';
import { ButtonsGroup } from '../components';
import { Button } from '@yosefbeder/design-system/components';
import {
	HiOutlineCheck as CheckIcon,
	HiOutlineDuplicate as ForkIcon,
} from 'react-icons/hi';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/atom-one-light.css';
import { turnToAnswer } from '../utils';
import Summary from '../components/Summary';

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

const evalScore = answers => {
	let points = answers.reduce((acc, answer) => {
		switch (answer.type) {
			case 'true-false':
				return acc + answer.answer !== undefined
					? answer.answer === answer.correctAnswer
						? 1
						: 0
					: 0;
			case 'multiple-choice':
				return (
					acc +
					answer.fields.filter(field => field.correct && field.selected).length
				);
			case 'fill-in-the-blanks':
				return (
					acc +
					answer.fields.filter(field =>
						field.correctAnswers.includes(field.answer),
					).length
				);
		}
	}, 0);

	let totalPoints = answers.reduce((acc, answer) => {
		switch (answer.type) {
			case 'true-false':
				return acc + 1;
			case 'multiple-choice':
				return acc + answer.fields.filter(field => field.correct).length;
			case 'fill-in-the-blanks':
				return acc + answer.fields.length;
		}
	}, 0);

	return [points, totalPoints];
};

const Quiz = ({ id, title, description, questions }) => {
	const [answers, setAnswers] = useState(() => questions.map(turnToAnswer));
	const score = useState();

	useEffect(() => {
		hljs.highlightAll();
	}, []);

	return (
		<>
			<P2>{id}</P2>
			<H2>{title}</H2>
			<P1>{description}</P1>
			{answers.map(answer => (
				<Question key={answer.id} {...answer} />
			))}
			{/* {score && (
				<Summary
					score={score}
					answers={answers.current}
					questions={questions}
				/>
			)} */}
			<ButtonsGroup>
				<Button
					leftIcon={<CheckIcon size={20} />}
					onClick={() => {
						const answer = prompt(
							'You won\'t be able to re-take the quiz again, so check your answers again.\nIf you\'re sure type "SURE"',
						);

						if (answer && answer.trim() === 'SURE') {
							const score = evalScore(answers.current);
							setScore(score);
						}
					}}
					disabled={score != undefined}
				>
					Check
				</Button>
				<Button
					variant="secondary"
					leftIcon={<ForkIcon size={20} />}
					disabled={score == undefined}
				>
					Fork
				</Button>
			</ButtonsGroup>
		</>
	);
};

export default Quiz;
