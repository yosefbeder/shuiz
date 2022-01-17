import styled from 'styled-components';
import { Button } from '@yosefbeder/design-system/components';
import { P2, InlineCode } from '@yosefbeder/design-system/typography';
import { HiCheck as TrueIcon, HiX as FalseIcon } from 'react-icons/hi';
import { ButtonsGroup } from '..';
import { Container, Header } from './shared-components';

const TrueButton = styled(Button)`
	&:enabled {
		background-color: var(--color-green-400);
		border-color: var(--color-green-400);

		&:hover,
		&:focus {
			background-color: var(--color-green-500);
			border-color: var(--color-green-500);
		}

		&:active {
			background-color: var(--color-green-600);
			border-color: var(--color-green-600);
		}
	}
`;

const FalseButton = styled(Button)`
	&:enabled {
		background-color: var(--color-red-400);
		border-color: var(--color-red-400);

		&:hover,
		&:focus {
			background-color: var(--color-red-500);
			border-color: var(--color-red-500);
		}

		&:active {
			background-color: var(--color-red-600);
			border-color: var(--color-red-600);
		}
	}
`;

const TrueFalse = ({
	number,
	title,
	description,
	tags,
	hint,
	answer,
	onChange,
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
			{answer !== undefined && (
				<P2>
					<InlineCode>{answer ? 'True' : 'False'}</InlineCode> is the currently
					selected answer.
				</P2>
			)}
			<ButtonsGroup>
				<TrueButton
					leftIcon={<TrueIcon size={20} />}
					onClick={() => onChange(true)}
				>
					True
				</TrueButton>
				<FalseButton
					leftIcon={<FalseIcon size={20} />}
					onClick={() => onChange(false)}
				>
					False
				</FalseButton>
			</ButtonsGroup>
		</Container>
	);
};

export default TrueFalse;
