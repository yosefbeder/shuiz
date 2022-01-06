import styled from 'styled-components';

export const ButtonsGroup = styled.section`
	display: flex;
	margin: var(--space-2) 0;

	& > button {
		margin-right: var(--space-2);
	}
`;

export const Pre = styled.pre`
	line-height: 1.5;
	font-family: var(--font-mono);
	font-size: var(--font-sm);
`;
