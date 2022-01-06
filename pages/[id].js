import { useEffect, useState } from 'react';
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

const Quiz = ({ id, title, description, questions }) => {
	const [answers, setAnswers] = useState(
		questions.map(question => turnToAnswer(question)),
	);

	console.log(answers);

	useEffect(() => {
		hljs.highlightAll();
	}, []);

	return (
		<>
			<P2>{id}</P2>
			<H2>{title}</H2>
			<P1>{description}</P1>
			{questions.map((question, index) => {
				switch (question.type) {
					case 'true-false':
						return (
							<TrueFalse
								key={question.id}
								number={index + 1}
								{...question}
								onChange={state =>
									setAnswers(prev => [
										...prev.slice(0, index),
										state,
										...prev.slice(index + 1),
									])
								}
							/>
						);
					case 'multiple-choice':
						return (
							<MultipleChoice
								key={question.id}
								number={index + 1}
								{...question}
								onChange={state =>
									setAnswers(prev => [
										...prev.slice(0, index),
										state,
										...prev.slice(index + 1),
									])
								}
							/>
						);
					case 'fill-in-the-blanks':
						return (
							<FillInTheBlanks
								key={question.id}
								number={index + 1}
								{...question}
								onChange={state =>
									setAnswers(prev => [
										...prev.slice(0, index),
										state,
										...prev.slice(index + 1),
									])
								}
							/>
						);
				}
			})}
			<ButtonsGroup>
				<Button leftIcon={<CheckIcon size={20} />}>Check</Button>
				<Button variant="secondary" leftIcon={<ForkIcon size={20} />}>
					Fork
				</Button>
			</ButtonsGroup>
		</>
	);
};

export default Quiz;
