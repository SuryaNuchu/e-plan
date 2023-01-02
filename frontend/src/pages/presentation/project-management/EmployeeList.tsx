import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import USERS from '../../../common/data/userDummyData';
import Badge from '../../../components/bootstrap/Badge';
import Button from '../../../components/bootstrap/Button';
import Input from '../../../components/bootstrap/forms/Input';
import { demoPages } from '../../../menu';
import useTourStep from '../../../hooks/useTourStep';

import memberImage from '../../../assets/img/members/member.png';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeList = () => {
	useTourStep(18);
	const [filterMenu, setFilterMenu] = useState(false);
	const [users, setUsers] = useState([]);
	const { id } = useParams();
	const formik = useFormik({
		initialValues: {
			available: false,
			searchInput: '',
			services: [],
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setFilterMenu(false);
			// alert(JSON.stringify(values, null, 2));
		},
	});
	const userObject = JSON.parse(localStorage.getItem('userObject') || '');
	const fetchMetaData = async () => {
		const data = await fetch(`http://localhost:8080/api/user/all/${userObject.orgId}`);
		let users = await data.json();
		if (id !== undefined) {
			const teamData = await fetch(`http://localhost:8080/api/team/${id}`);
			const teamDataUsers = await teamData.json();
			const members = teamDataUsers.members;
			users = users.filter((u: any) => members.includes(u.id));
			setUsers(users);
		} else setUsers(users);
	};
	const navigate = useNavigate();
	useEffect(() => {
		fetchMetaData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PageWrapper title={demoPages.appointment.subMenu.employeeList.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate('/home')}>
						Back to Home
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				<div className='row row-cols-xxl-3 row-cols-lg-3 row-cols-md-2'>
					{users.map((user: any) => (
						<div key={user.name} className='col'>
							<Card>
								<CardBody>
									<div className='row g-3'>
										<div className='col d-flex'>
											<div className='flex-shrink-0'>
												<div className='position-relative'>
													<div
														className='ratio ratio-1x1'
														style={{ width: 100 }}>
														<div
															className={classNames(
																'rounded-2',
																'd-flex align-items-center justify-content-center',
																'overflow-hidden',
																'shadow',
															)}>
															<img
																src={memberImage}
																alt={user.name}
																width={100}
															/>
														</div>
													</div>
												</div>
											</div>
											<div className='flex-grow-1 ms-3 d-flex justify-content-between'>
												<div className='w-100'>
													<div className='row'>
														<div className='col'>
															<div className='d-flex align-items-center'>
																<div className='fw-bold fs-5 me-2'>
																	{`${user.name}`}
																</div>
																<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
																	{user.role}
																</small>
															</div>

															<div className='text-muted'>
																@{user.name}
															</div>
														</div>
														<div className='col-auto'>
															<Button
																icon='Info'
																color='dark'
																isLight
																hoverShadow='sm'
																tag='a'
																to={`../member/${user.id}`}
																data-tour={user.name}
															/>
														</div>
													</div>
													{!!user?.skills && (
														<div className='row g-2 mt-3'>
															{user?.skills?.map((service: any) => (
																<div
																	key={service.name}
																	className='col-auto'>
																	<Badge
																		isLight
																		color={service.color}
																		className='px-3 py-2'>
																		<Icon
																			icon={service.icon}
																			size='lg'
																			className='me-1'
																		/>
																		{service.name}
																	</Badge>
																</div>
															))}
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					))}
				</div>
			</Page>
		</PageWrapper>
	);
};

export default EmployeeList;
