import React, { useState } from 'react';
import { H4, Ol, P1, P2, Ul } from '@yosefbeder/design-system/typography';
import styled from 'styled-components';
import { getTitleWithBlanks } from '../utils';

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

const Container = styled.section`
	background-color: var(--color-blue-50);
	padding: var(--space-2) var(--space-4);
	margin: var(--space-8) 0;
	border-radius: var(--rounded);
`;

const MultipleChoiceSummary = props => {
	return (
		<>
			<P2>Correct answers</P2>
			<Ul>
				{props.fields.map(field => (
					<P2 key={field.value} as="li">
						{field.label} {field.correct && '👈'}
					</P2>
				))}
			</Ul>
			{props.fields.filter(field => field.selected).length > 0 && (
				<>
					<P2>Your answers</P2>
					<Ul>
						{props.fields.map(field => (
							<P2 key={field.value} as="li">
								{field.label} {field.selected && '👈'}
							</P2>
						))}
					</Ul>
				</>
			)}
		</>
	);
};

const FillInTheBlanksSummary = props => {
	return (
		<>
			<P2>Your answers</P2>
			<Ul>
				{props.fields.map((field, index) => (
					<P2 key={index} as="li">
						({index + 1}): {field.answer ? field.answer : 'Empty'}{' '}
						{field.correctAnswers.includes(field.answer)
							? '👌'
							: `👎 (Possible answers: ${field.correctAnswers.join(', ')})`}
					</P2>
				))}
			</Ul>
		</>
	);
};

const getEmoji = percentage =>
	percentage > 0.8 ? '👌' : percentage > 0.5 ? '👍' : '👎';

const Summary = ({ answers }) => {
	const score = evalScore(answers);

	return (
		<Container>
			<H4>
				Your score: {score[0]}/ {score[1]} - {getEmoji(score[0] / score[1])}
			</H4>
			<Ol>
				{answers.map((answer, index) => {
					let isTrue;

					switch (answer.type) {
						case 'true-false':
							isTrue =
								answer !== undefined && answer.answer === answer.correctAnswer;
							break;
						case 'multiple-choice':
							isTrue =
								answer.fields.filter(field => field.correct !== field.selected)
									.length === 0;
							break;
						case 'fill-in-the-blanks':
							isTrue =
								answer.fields.filter(
									field => !field.correctAnswers.includes(field.answer),
								).length === 0;
							break;
					}

					return (
						<li key={answer.id}>
							<P1>
								{answer.title} {isTrue ? '👌' : '👎'}
							</P1>
							{answer.type === 'multiple-choice' && !isTrue && (
								<MultipleChoiceSummary {...answer} />
							)}
							{answer.type === 'fill-in-the-blanks' && !isTrue && (
								<FillInTheBlanksSummary {...answer} />
							)}
						</li>
					);
				})}
			</Ol>
		</Container>
	);
};

export default Summary;
