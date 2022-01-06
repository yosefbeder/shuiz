import {
	H3,
	H4,
	H5,
	H6,
	P1,
	Blockquote,
	Strong,
	Italic,
	InlineCode,
	Link,
	Ul,
	Ol,
} from '@yosefbeder/design-system/typography';
import { Pre } from '../components';

const components = {
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
};

export default components;
