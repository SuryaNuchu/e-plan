import React, { lazy } from 'react';
import { demoPages } from '../menu';
import Login from '../pages/presentation/auth/Login';

const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};
const APP = {
	PROJECT_MANAGEMENT: {
		PROJECTS_LIST: lazy(() => import('../pages/presentation/project-management/Home')),
		PROJECT: lazy(() => import('../pages/presentation/project-management/Project')),
		EMPLOYEE_LIST: lazy(() => import('../pages/presentation/project-management/EmployeeList')),
		EMPLOYEE: lazy(() => import('../pages/presentation/project-management/EmployeePage')),
	},
};

const presentation = [
	{
		path: demoPages.page404.path,
		element: <AUTH.PAGE_404 />,
		exact: true,
	},
	{
		path: demoPages.signUp.path,
		element: <Login isSignUp />,
		exact: true,
	},
	{
		path: '/',
		element: <Login />,
		exact: true,
	},
	{
		path: demoPages.projectManagement.subMenu.list.path,
		element: <APP.PROJECT_MANAGEMENT.PROJECTS_LIST />,
		exact: true,
	},
	{
		path: `project/:id`,
		element: <APP.PROJECT_MANAGEMENT.PROJECT />,
		exact: true,
	},
	{
		path: `members`,
		element: <APP.PROJECT_MANAGEMENT.EMPLOYEE_LIST />,
		exact: true,
	},
	{
		path: `members/:id`,
		element: <APP.PROJECT_MANAGEMENT.EMPLOYEE_LIST />,
		exact: true,
	},
	{
		path: `member/:id`,
		element: <APP.PROJECT_MANAGEMENT.EMPLOYEE />,
		exact: true,
	},
];
const contents = [...presentation];

export default contents;
