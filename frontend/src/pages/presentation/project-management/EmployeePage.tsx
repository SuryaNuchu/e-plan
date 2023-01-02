import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/icon/Icon';
import Badge from '../../../components/bootstrap/Badge';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Chart, { IChartOptions } from '../../../components/extras/Chart';
import Alert from '../../../components/bootstrap/Alert';
import COLORS from '../../../common/data/enumColors';
import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';
import memberImage from '../../../assets/img/members/member.png';

const EmployeePage = () => {
	useTourStep(19);
	const { darkModeStatus } = useDarkMode();
	const [data, setData] = useState({
		name: '',
		password: '',
		email: '',
		skills: [],
		role: '',
	});
	const { id } = useParams();

	const fetchMetaData = async (id: any) => {
		const empData = await fetch(`http://localhost:8080/api/user/${id}`);
		const empDataUsers = await empData.json();
		setData(empDataUsers);
	};

	useEffect(() => {
		fetchMetaData(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [dayHours] = useState<IChartOptions>({
		series: [
			{
				data: [8, 12, 15, 20, 15, 22, 9],
			},
		],
		options: {
			colors: [process.env.REACT_APP_SUCCESS_COLOR],
			chart: {
				type: 'radar',
				width: 200,
				height: 200,
				sparkline: {
					enabled: true,
				},
			},
			xaxis: {
				categories: [
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
					'Sunday',
				],
				// convertedCatToNumeric: false,
			},
			tooltip: {
				theme: 'dark',
				fixed: {
					enabled: false,
				},
				x: {
					show: true,
				},
				y: {
					title: {
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						formatter(seriesName) {
							return 'Hours';
						},
					},
				},
			},
			stroke: {
				curve: 'smooth',
				width: 2,
			},
			plotOptions: {
				radar: {
					polygons: {
						strokeColors: `${COLORS.SUCCESS.code}50`,
						strokeWidth: '1',
						connectorColors: `${COLORS.SUCCESS.code}50`,
					},
				},
			},
		},
	});

	// const userTasks = dummyEventsData.filter((f) => f.assigned.id === '1');

	return (
		<PageWrapper title={`${data.name}`}>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' tag='a' to={`../members`}>
						Back to Members
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='pt-3 pb-5 d-flex align-items-center'>
					<span className='display-4 fw-bold me-3'>{`${data.name}`}</span>
					<span className='border border-success border-2 text-success fw-bold px-3 py-2 rounded'>
						{data.role}
					</span>
				</div>
				<div className='row'>
					<div className='col-lg-4'>
						<Card className='shadow-3d-info'>
							<CardBody>
								<div className='row g-5'>
									<div className='col-12 d-flex justify-content-center'>
										<Avatar src={memberImage} />
									</div>
									<div className='col-12'>
										<div className='row g-2'>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon icon='Mail' size='3x' color='info' />
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{`${data.email}`}
														</div>
														<div className='text-muted'>
															Email Address
														</div>
													</div>
												</div>
											</div>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon icon='Tag' size='3x' color='info' />
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{`@${data.name}`}
														</div>
														<div className='text-muted'>
															Social name
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-8'>
						<Card className='shadow-3d-primary'>
							<CardHeader>
								<CardLabel icon='Summarize' iconColor='success'>
									<CardTitle tag='h4' className='h5'>
										Summary
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-6'>
										<Card>
											<CardHeader>
												<CardLabel icon='Stream' iconColor='warning'>
													<CardTitle>Skill</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												{data.skills ? (
													<div className='row g-2'>
														{data?.skills?.map((service: any) => (
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
												) : (
													<div className='row'>
														<div className='col'>
															<Alert
																color='warning'
																isLight
																icon='Report'
																className='mb-0'>
																No results to show
															</Alert>
														</div>
													</div>
												)}
											</CardBody>
										</Card>
									</div>
									<div className='col-md-6'>
										<Card>
											<CardHeader>
												<CardLabel icon='ShowChart' iconColor='secondary'>
													<CardTitle>Statics</CardTitle>
												</CardLabel>
											</CardHeader>
											<CardBody>
												<div className='row g-4 align-items-center'>
													<div className='col-xl-6'>
														<div
															className={classNames(
																'd-flex align-items-center rounded-2 p-3',
																{
																	'bg-l10-warning':
																		!darkModeStatus,
																	'bg-lo25-warning':
																		darkModeStatus,
																},
															)}>
															<div className='flex-shrink-0'>
																<Icon
																	icon='DoneAll'
																	size='3x'
																	color='warning'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	15
																</div>
																<div className='text-muted mt-n2 truncate-line-1'>
																	Completed tasks
																</div>
															</div>
														</div>
													</div>
													<div className='col-xl-6'>
														<div
															className={classNames(
																'd-flex align-items-center rounded-2 p-3',
																{
																	'bg-l10-info': !darkModeStatus,
																	'bg-lo25-info': darkModeStatus,
																},
															)}>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Savings'
																	size='3x'
																	color='info'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	1,280
																</div>
																<div className='text-muted mt-n2 truncate-line-1'>
																	Earning
																</div>
															</div>
														</div>
													</div>
													<div className='col-xl-6'>
														<div
															className={classNames(
																'd-flex align-items-center rounded-2 p-3',
																{
																	'bg-l10-primary':
																		!darkModeStatus,
																	'bg-lo25-primary':
																		darkModeStatus,
																},
															)}>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Celebration'
																	size='3x'
																	color='primary'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	76
																</div>
																<div className='text-muted mt-n2 truncate-line-1'>
																	Occupancy
																</div>
															</div>
														</div>
													</div>
													<div className='col-xl-6'>
														<div
															className={classNames(
																'd-flex align-items-center rounded-2 p-3',
																{
																	'bg-l10-success':
																		!darkModeStatus,
																	'bg-lo25-success':
																		darkModeStatus,
																},
															)}>
															<div className='flex-shrink-0'>
																<Icon
																	icon='Timer'
																	size='3x'
																	color='success'
																/>
															</div>
															<div className='flex-grow-1 ms-3'>
																<div className='fw-bold fs-3 mb-0'>
																	42
																</div>
																<div className='text-muted mt-n2'>
																	Hours
																</div>
															</div>
														</div>
													</div>
												</div>
											</CardBody>
										</Card>
									</div>
								</div>
							</CardBody>
						</Card>
						{/* <Card>
							<CardHeader>
								<CardLabel icon='Task' iconColor='danger'>
									<CardTitle>
										<CardLabel>Assigned</CardLabel>
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='table-responsive'>
									<table className='table table-modern mb-0'>
										<thead>
											<tr>
												<th>Date / Time</th>
												<th>Customer</th>
												<th>Service</th>
												<th>Duration</th>
												<th>Payment</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											{userTasks.map((item) => (
												<tr key={item.id}>
													<td>
														<div className='d-flex align-items-center'>
															<span
																className={classNames(
																	'badge',
																	'border border-2 border-light',
																	'rounded-circle',
																	'bg-success',
																	'p-2 me-2',
																	`bg-${item.status.color}`,
																)}>
																<span className='visually-hidden'>
																	{item.status.name}
																</span>
															</span>
															<span className='text-nowrap'>
																{moment(
																	`${item.date} ${item.time}`,
																).format('MMM Do YYYY, h:mm a')}
															</span>
														</div>
													</td>
													<td>
														<div>
															<div>{item.customer.name}</div>
															<div className='small text-muted'>
																{item.customer.email}
															</div>
														</div>
													</td>
													<td>{item.service.name}</td>
													<td>{item.duration}</td>
													<td>
														{item.payment && priceFormat(item.payment)}
													</td>
													<td>
														<Dropdown>
															<DropdownToggle hasIcon={false}>
																<Button
																	isLink
																	color={item.status.color}
																	icon='Circle'
																	className='text-nowrap'>
																	{item.status.name}
																</Button>
															</DropdownToggle>
															<DropdownMenu>
																{Object.keys(EVENT_STATUS).map(
																	(key) => (
																		<DropdownItem key={key}>
																			<div>
																				<Icon
																					icon='Circle'
																					color={
																						EVENT_STATUS[
																							key
																						].color
																					}
																				/>
																				{
																					EVENT_STATUS[
																						key
																					].name
																				}
																			</div>
																		</DropdownItem>
																	),
																)}
															</DropdownMenu>
														</Dropdown>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								{!userTasks.length && (
									<Alert color='warning' isLight icon='Report' className='mt-3'>
										There is no scheduled and assigned task.
									</Alert>
								)}
							</CardBody>
						</Card> */}
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default EmployeePage;
