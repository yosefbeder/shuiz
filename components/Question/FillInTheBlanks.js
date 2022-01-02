import React from 'react';
import { Input } from '@yosefbeder/design-system/components';
import styled from 'styled-components';

const Form = styled.form`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: max-content;
	grid-gap: var(--space-2);
`;

const FillInTheBlanks = ({ blanks }) => {
	return (
		<Form>
			{blanks.map((_, index) => (
				<Input key={index} placeholder={`answer ${index + 1}`} />
			))}
		</Form>
	);
};

export default FillInTheBlanks;
