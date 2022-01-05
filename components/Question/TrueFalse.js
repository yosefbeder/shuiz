import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@yosefbeder/design-system/components';
import { P2, InlineCode } from '@yosefbeder/design-system/typography';
import { HiCheck as TrueIcon, HiX as FalseIcon } from 'react-icons/hi';
import { ButtonsGroup } from '..';

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

const TrueFalse = () => {
	const [selectedAnswer, setSelectedAnswer] = useState();

	return (
		<>
			{selectedAnswer && (
				<P2>
					<InlineCode>{selectedAnswer}</InlineCode> is the currently selected
					answer.
				</P2>
			)}
			<ButtonsGroup>
				<TrueButton
					leftIcon={<TrueIcon size={20} />}
					onClick={() => setSelectedAnswer('True')}
				>
					True
				</TrueButton>
				<FalseButton
					leftIcon={<FalseIcon size={20} />}
					onClick={() => setSelectedAnswer('False')}
				>
					False
				</FalseButton>
			</ButtonsGroup>
		</>
	);
};

export default TrueFalse;
