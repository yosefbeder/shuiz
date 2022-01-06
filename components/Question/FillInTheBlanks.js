import React, { useState, useEffect } from 'react';
import { Input } from '@yosefbeder/design-system/components';
import styled from 'styled-components';
import { Container, Header } from './shared-components';

const Form = styled.form`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: max-content;
	grid-gap: var(--space-2);
`;

const FillInTheBlanks = ({
	id,
	number,
	title,
	description,
	tags,
	hint,
	blanks,
}) => {
	let [answers, setAnswers] = useState(
		blanks.map(blank => ({
			position: blank.position,
			correctAnswers: blank.answers,
			answer: '',
		})),
	);

	return (
		<Container>
			<Header
				number={number}
				title={title
					.split(' ')
					.map((word, index) => {
						let blankIndex = blanks.findIndex(
							({ position }) => position === index,
						);

						return blankIndex !== -1
							? `____(${blankIndex + 1})____ ${word}`
							: word;
					})
					.join(' ')}
				description={description}
				tags={tags}
				hint={hint}
			/>
			<Form>
				{blanks.map((_, index) => (
					<Input
						key={index}
						placeholder={`blank ${index + 1}`}
						value={answers[index].answer}
						onChange={e =>
							setAnswers(prev => {
								return [
									...prev.slice(0, index),
									{ ...prev[index], answer: e.target.value },
									...prev.slice(index + 1),
								];
							})
						}
					/>
				))}
			</Form>
		</Container>
	);
};

export default FillInTheBlanks;
