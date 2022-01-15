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
	number,
	title,
	description,
	tags,
	hint,
	fields,
}) => {
	return (
		<Container>
			<Header
				number={number}
				title={title}
				description={description}
				tags={tags}
				hint={hint}
			/>
			<Form>
				{fields.map(({ answer }, index) => (
					<Input key={index} placeholder={`(${index + 1})`} value={answer} />
				))}
			</Form>
		</Container>
	);
};

export default FillInTheBlanks;
