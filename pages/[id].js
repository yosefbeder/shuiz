import { useEffect, useState, useReducer } from 'react';
import DUMMY_DATA from '../dummy-data.json';
import { H2, P1, P2 } from '@yosefbeder/design-system/typography';
import {
	TrueFalse,
	MultipleChoice,
	FillInTheBlanks,
} from '../components/Question';
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

const Action = { INITIALIZE: 0, CHANGE: 1 };

const reducer = (state, action) => {
	if (action.type === Action.INITIALIZE) {
		return action.payload;
	}

	if (action.type === Action.CHANGE) {
		const index = state.findIndex(answer => answer.id === action.payload.id);

		if (state[index].type === 'true-false') {
			return [
				...state.slice(0, index),
				{ ...state[index], answer: action.payload.answer },
				...state.slice(index + 1),
			];
		}
		if (state[index].type === 'multiple-choice') {
			const singleAnswer =
				state[index].fields.filter(field => field.correct).length === 1;

			if (!singleAnswer) {
				return [
					...state.slice(0, index),
					{
						...state[index],
						fields: state[index].fields.map(field =>
							field.value == action.payload.value
								? { ...field, selected: !field.selected }
								: field,
						),
					},
					...state.slice(index + 1),
				];
			} else {
				return [
					...state.slice(0, index),
					{
						...state[index],
						fields: state[index].fields.map(field =>
							field.value === action.payload.value
								? { ...field, selected: true }
								: { ...field, selected: false },
						),
					},
					...state.slice(index + 1),
				];
			}
		}
		if (state[index].type === 'fill-in-the-blanks') {
			return [
				...state.slice(0, index),
				{
					...state[index],
					fields: state[index].fields.map(field =>
						field.position === action.payload.position
							? { ...field, answer: action.payload.answer }
							: field,
					),
				},
				...state.slice(index + 1),
			];
		}
	}

	return state;
};

const Quiz = ({ id, title, description, questions }) => {
	const [answers, dispatch] = useReducer(reducer, questions.map(turnToAnswer));

	useEffect(() => {
		hljs.highlightAll();
	}, []);

	return (
		<>
			<P2>{id}</P2>
			<H2>{title}</H2>
			<P1>{description}</P1>
			{answers.map(({ id, type, ...props }) => {
				switch (type) {
					case 'true-false':
						return (
							<TrueFalse
								key={id}
								{...props}
								onChange={answer =>
									dispatch({
										type: Action.CHANGE,
										payload: { id, type, answer },
									})
								}
							/>
						);
					case 'multiple-choice':
						return (
							<MultipleChoice
								key={id}
								{...props}
								onChange={value =>
									dispatch({ type: Action.CHANGE, payload: { id, value } })
								}
							/>
						);
					case 'fill-in-the-blanks':
						return (
							<FillInTheBlanks
								key={id}
								{...props}
								onChange={({ position, answer }) =>
									dispatch({
										type: Action.CHANGE,
										payload: { id, position, answer },
									})
								}
							/>
						);
				}
			})}
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
				>
					Check
				</Button>
				<Button variant="secondary" leftIcon={<ForkIcon size={20} />}>
					Fork
				</Button>
			</ButtonsGroup>
		</>
	);
};

export default Quiz;
