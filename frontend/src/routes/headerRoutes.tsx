import React from 'react';
import { componentsMenu, dashboardMenu, demoPages, layoutMenu } from '../menu';
import DashboardHeader from '../pages/common/Headers/DashboardHeader';
import ProfilePageHeader from '../pages/common/Headers/ProfilePageHeader';
import ContentHeader from '../pages/common/Headers/ContentHeader';
import DefaultHeader from '../pages/common/Headers/DefaultHeader';

const headers = [
	{ path: layoutMenu.pageLayout.subMenu.onlySubheader.path, element: null, exact: true },
	{ path: layoutMenu.pageLayout.subMenu.onlyContent.path, element: null, exact: true },
	{ path: layoutMenu.blank.path, element: null, exact: true },
	{ path: demoPages.login.path, element: null, exact: true },
	{ path: '/', element: null, exact: true },
	{ path: demoPages.signUp.path, element: null, exact: true },
	{ path: demoPages.page404.path, element: null, exact: true },
	{ path: demoPages.knowledge.subMenu.grid.path, element: null, exact: true },
	{ path: dashboardMenu.dashboard.path, element: <DashboardHeader />, exact: true },
	{
		path: demoPages.projectManagement.subMenu.list.path,
		element: <DashboardHeader />,
		exact: true,
	},
	{ path: demoPages.pricingTable.path, element: <DashboardHeader />, exact: true },
	{
		path: demoPages.singlePages.subMenu.fluidSingle.path,
		element: <ProfilePageHeader />,
		exact: true,
	},
	{
		path: demoPages.singlePages.subMenu.boxedSingle.path,
		element: <ProfilePageHeader />,
		exact: true,
	},
	{
		path: demoPages.sales.subMenu.transactions.path,
		element: <ProfilePageHeader />,
		exact: true,
	},
	{
		path: demoPages.chat.subMenu.withListChat.path,
		element: <ProfilePageHeader />,
		exact: true,
	},
	{
		path: demoPages.chat.subMenu.onlyListChat.path,
		element: <ProfilePageHeader />,
		exact: true,
	},
	{
		path: `${demoPages.knowledge.subMenu.itemID.path}/:id`,
		element: <ProfilePageHeader />,
		exact: true,
	},
	{
		path: demoPages.crm.subMenu.dashboard.path,
		element: <ProfilePageHeader />,
		exact: true,
	},
	{
		path: demoPages.crm.subMenu.customersList.path,
		element: <ProfilePageHeader />,
		exact: true,
	},
	{
		path: `${demoPages.crm.subMenu.customerID.path}/:id`,
		element: <ProfilePageHeader />,
		exact: true,
	},
	{
		path: `*`,
		element: <DefaultHeader />,
	},
];

export default headers;
