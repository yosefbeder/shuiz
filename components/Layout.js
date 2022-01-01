import React from 'react';
import styled from 'styled-components';
import { breakPoints } from '@yosefbeder/design-system/constants';

const Main = styled.main`
	--padding-x: var(--space-4);
	--padding-y: var(--space-2);

	max-width: calc(${breakPoints.md}px + var(--padding-x) * 2);
	min-height: 100vh;
	padding: var(--padding-y) var(--padding-x);
	margin: 0 auto;
`;

const Layout = ({ children }) => {
	return <Main>{children}</Main>;
};

export default Layout;
