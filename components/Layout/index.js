import React from 'react';
import styled from 'styled-components';
import { breakPoints } from '@yosefbeder/design-system/constants';
import Nav from './Nav';

const Main = styled.main`
	--padding-x: var(--space-4);

	max-width: calc(${breakPoints.md}px + var(--padding-x) * 2);
	min-height: 100vh;
	padding: 0 var(--padding-x);
	margin: 0 auto;
`;

const Layout = ({ children }) => {
	return (
		<Main>
			<Nav />
			{children}
		</Main>
	);
};

export default Layout;
