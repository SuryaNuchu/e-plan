import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import Search from '../../../components/Search';
import CommonHeaderRight from './CommonHeaderRight';
import Logo from '../../../components/Logo';

const DashboardHeader = () => {
	return (
		<Header>
			<HeaderLeft>
				{/* <Search /> */}
				<Logo width={200} height={100} />
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	);
};

export default DashboardHeader;
