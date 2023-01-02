import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import Navigation from '../../../layout/Navigation/Navigation';
import { componentsMenu, layoutMenu } from '../../../menu';
import useDeviceScreen from '../../../hooks/useDeviceScreen';
import CommonHeaderRight from './CommonHeaderRight';
import Logo from '../../../components/Logo';

const DefaultHeader = () => {
	const { width } = useDeviceScreen();
	return (
		<Header>
			<HeaderLeft>
				<Logo width={200} height={100} />
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	);
};

export default DefaultHeader;
