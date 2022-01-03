import styled from 'styled-components';
import { H2 } from '@yosefbeder/design-system/typography';
import { IconButton, Tooltip } from '@yosefbeder/design-system/components';
import { HiOutlineMoon as MoonIcon } from 'react-icons/hi';

const Container = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	border-bottom: 1px solid var(--color-gray-200);
	padding: var(--space-2) 0;
`;

const Nav = () => {
	return (
		<Container>
			<H2 resetMargin as="h1">
				📃 Shuiz
			</H2>
			<Tooltip content="Dark mode">
				<IconButton>
					<MoonIcon size={26} />
				</IconButton>
			</Tooltip>
		</Container>
	);
};

export default Nav;
