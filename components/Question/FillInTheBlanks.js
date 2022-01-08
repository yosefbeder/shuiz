import React, { useState, useEffect } from 'react';
import { Input } from '@yosefbeder/design-system/components';
import styled from 'styled-components';
import { Container, Header } from './shared-components';
import { turnToAnswer } from '../../utils';

const Form = styled.form`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: max-content;
	grid-gap: var(--space-2);
`;

const FillInTheBlanks = ({
	id,
	type,
	number,
	title,
	description,
	tags,
	hint,
	blanks,
	onChange,
}) => {
	let [state, setState] = useState(turnToAnswer({ id, type, blanks }));

	useEffect(() => {
		onChange(state);
	}, [state]);

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
						value={state.fields[index].answer}
						onChange={e =>
							setState(prev => {
								return {
									...prev,
									fields: [
										...prev.fields.slice(0, index),
										{ ...prev.fields[index], answer: e.target.value },
										...prev.fields.slice(index + 1),
									],
								};
							})
						}
					/>
				))}
			</Form>
		</Container>
	);
};

export default FillInTheBlanks;
