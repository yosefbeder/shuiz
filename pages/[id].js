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

const Action = { INITIALIZE: 0, RESTORE: 1, SOLVE: 2, CHANGE: 3 };

const Status = { NOT_INITIALIZED: 0, NOT_SOLVED: 1, SOLVED: 2 };

const reducer = (state, action) => {
	if (action.type === Action.INITIALIZE) {
		return { status: Status.NOT_SOLVED, answers: action.payload };
	}

	if (action.type === Action.RESTORE) {
		return { status: Status.SOLVED, answers: action.payload };
	}

	if (action.type === Action.SOLVE) {
		return { ...state, status: Status.SOLVED };
	}

	if (state.status === Status.NOT_SOLVED) {
		if (action.type === Action.CHANGE) {
			const index = state.answers.findIndex(
				answer => answer.id === action.payload.id,
			);

			if (state.answers[index].type === 'true-false') {
				return {
					...state,
					answers: [
						...state.answers.slice(0, index),
						{ ...state.answers[index], answer: action.payload.answer },
						...state.answers.slice(index + 1),
					],
				};
			}
			if (state.answers[index].type === 'multiple-choice') {
				const singleAnswer =
					state.answers[index].fields.filter(field => field.correct).length ===
					1;

				if (!singleAnswer) {
					return {
						...state,
						answers: [
							...state.answers.slice(0, index),
							{
								...state.answers[index],
								fields: state.answers[index].fields.map(field =>
									field.value == action.payload.value
										? { ...field, selected: !field.selected }
										: field,
								),
							},
							...state.answers.slice(index + 1),
						],
					};
				} else {
					return {
						...state,
						answers: [
							...state.answers.slice(0, index),
							{
								...state.answers[index],
								fields: state.answers[index].fields.map(field =>
									field.value === action.payload.value
										? { ...field, selected: true }
										: { ...field, selected: false },
								),
							},
							...state.answers.slice(index + 1),
						],
					};
				}
			}
			if (state.answers[index].type === 'fill-in-the-blanks') {
				return {
					...state,
					answers: [
						...state.answers.slice(0, index),
						{
							...state.answers[index],
							fields: state.answers[index].fields.map(field =>
								field.position === action.payload.position
									? { ...field, answer: action.payload.answer }
									: field,
							),
						},
						...state.answers.slice(index + 1),
					],
				};
			}
		}
	}

	return state;
};

const Quiz = ({ id, title, description, questions }) => {
	const [state, dispatch] = useReducer(reducer, {
		status: Status.NOT_INITIALIZED,
		answers: null,
	});

	useEffect(() => {
		hljs.highlightAll();

		let localStorageAnswers = localStorage.getItem('answers');

		if (localStorageAnswers) {
			dispatch({
				type: Action.RESTORE,
				payload: JSON.parse(localStorageAnswers),
			});
		} else {
			dispatch({
				type: Action.INITIALIZE,
				payload: questions.map(turnToAnswer),
			});
		}
	}, []);

	return (
		<>
			<P2>{id}</P2>
			<H2>{title}</H2>
			<P1>{description}</P1>
			{state.status !== Status.NOT_INITIALIZED &&
				state.answers.map(({ id, type, ...props }) => {
					switch (type) {
						case 'true-false':
							return (
								<TrueFalse
									key={id}
									disabled={state.status !== Status.NOT_SOLVED}
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
									disabled={state.status !== Status.NOT_SOLVED}
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
									disabled={state.status !== Status.NOT_SOLVED}
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

			{state.status === Status.SOLVED && <Summary answers={state.answers} />}

			<ButtonsGroup>
				<Button
					leftIcon={<CheckIcon size={20} />}
					onClick={() => {
						const answer = prompt(
							'You won\'t be able to re-take the quiz again, so check your answers again.\nIf you\'re sure type "SURE"',
						);

						if (answer && answer.trim() === 'SURE') {
							localStorage.setItem('answers', JSON.stringify(state.answers));
							dispatch({ type: Action.SOLVE });
						}
					}}
					disabled={state.status !== Status.NOT_SOLVED}
				>
					Check
				</Button>
				<Button
					variant="secondary"
					leftIcon={<ForkIcon size={20} />}
					disabled={state.status !== Status.SOLVED}
				>
					Fork
				</Button>
			</ButtonsGroup>
		</>
	);
};

export default Quiz;
