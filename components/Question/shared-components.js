import React from 'react';
import styled, { css } from 'styled-components';
import { Tooltip } from '@yosefbeder/design-system/components';
import { HiOutlineInformationCircle as HintIcon } from 'react-icons/hi';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { H3, P2 } from '@yosefbeder/design-system/typography';
import components from '../../constants/components';

export const Container = styled.article`
	margin: var(--space-8) 0;
`;

const Tag = styled(P2)`
	display: inline-block;
	padding: var(--space-0-5) var(--space-1);
	border-radius: var(--rounded);
	margin: 0;

	${({ children }) => {
		const map = new Map([
			['easy', 'green'],
			['medium', 'amber'],
			['hard', 'red'],
		]);

		const color = map.has(children) ? map.get(children) : 'gray';

		return css`
			background-color: var(--color-${color}-500);

			&:hover {
				background-color: var(--color-${color}-600);
			}
		`;
	}}
	color: var(--color-white);
	user-select: none;
	transition: background-color 100ms;

	&::before {
		content: '#';
	}
`;

const TagsContainer = styled.section`
	display: flex;
	margin: var(--space-2) 0;

	& > ${Tag} {
		margin-right: var(--space-2);
	}
`;

export const Header = ({ number, title, hint, tags, description }) => (
	<>
		<H3>
			#{number} - {title}
		</H3>
		{hint && (
			<Tooltip content={hint} position="right">
				<HintIcon size={20} />
			</Tooltip>
		)}

		<TagsContainer>
			{tags.map((tag, index) => (
				<Tag key={index}>{tag}</Tag>
			))}
		</TagsContainer>

		{description && (
			<ReactMarkdown components={components}>{description}</ReactMarkdown>
		)}
	</>
);
