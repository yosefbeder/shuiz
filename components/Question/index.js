import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
	H3,
	H4,
	H5,
	H6,
	P1,
	P2,
	Blockquote,
	Strong,
	Italic,
	InlineCode,
	Link,
	Ul,
	Ol,
} from '@yosefbeder/design-system/typography';
import { Tooltip } from '@yosefbeder/design-system/components';
import { HiOutlineInformationCircle as HintIcon } from 'react-icons/hi';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/atom-one-light.css';
import TrueFalse from './TrueFalse';
import MultipleChoice from './MultipleChoice';

const Container = styled.article`
	margin: var(--space-8) 0;
`;

const Pre = styled.pre`
	line-height: 1.5;
	font-family: var(--font-mono);
	font-size: var(--font-sm);
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

const Question = ({
	number,
	type,
	title,
	blanks,
	hint,
	tags,
	description,
	options,
	answers,
}) => {
	useEffect(() => {
		hljs.highlightAll();
	}, []);

	return (
		<Container>
			<H3>
				#{number}{' '}
				{type === 'fill-in-the-blanks'
					? title
							.split(' ')
							.map((word, index) => {
								let blankIndex = blanks.findIndex(
									({ position }) => position === index,
								);

								return blankIndex !== -1
									? `____(${blankIndex + 1})____ ${word}`
									: word;
							})
							.join(' ')
					: title}
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
				<ReactMarkdown
					components={{
						h1: H4,
						h2: H5,
						h3: H6,
						p: P1,
						a: Link,
						blockquote: Blockquote,
						strong: Strong,
						em: Italic,
						ul: Ul,
						ol: Ol,
						code({ node, inline, className, children, ...props }) {
							return !inline ? (
								<Pre className={className}>
									<code {...props}>{children}</code>
								</Pre>
							) : (
								<InlineCode {...props}>{children}</InlineCode>
							);
						},
					}}
				>
					{description}
				</ReactMarkdown>
			)}

			{type === 'true-false' && <TrueFalse />}
			{type === 'multiple-choice' && (
				<MultipleChoice options={options} answers={answers} />
			)}
		</Container>
	);
};

export default Question;
