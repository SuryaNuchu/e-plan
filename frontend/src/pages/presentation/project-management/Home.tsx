import React, { FC, HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPages } from '../../../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Badge from '../../../components/bootstrap/Badge';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { Calendar as DatePicker } from 'react-date-range';
import OffCanvas, { OffCanvasBody } from '../../../components/bootstrap/OffCanvas';
import Button from '../../../components/bootstrap/Button';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import Icon from '../../../components/icon/Icon';
import Progress from '../../../components/bootstrap/Progress';
import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Label from '../../../components/bootstrap/forms/Label';
import Select from '../../../components/bootstrap/forms/Select';
import UserImage2 from '../../../assets/img/members/member.png';
import Option from '../../../components/bootstrap/Option';
import Todo, { ITodoListItem } from '../../../components/extras/Todo';
import moment from 'moment';

interface IItemProps extends HTMLAttributes<HTMLDivElement> {
	name: string;
	teamName?: string;
	attachCount: number;
	taskCount: number;
	percent: number;
	dueDate: string;
}
const Item: FC<IItemProps> = ({
	name,
	teamName,
	attachCount,
	taskCount,
	percent,
	dueDate,
	id,
	...props
}) => {
	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	const handleOnClickToProjectPage = useCallback(() => navigate(`../project/${id}`), [navigate]);
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className='col-md-4' {...props}>
			<Card stretch onClick={handleOnClickToProjectPage} className='cursor-pointer'>
				<CardHeader>
					<CardLabel icon='Ballot'>
						<CardTitle>{name}</CardTitle>
						<CardSubTitle>{teamName}</CardSubTitle>
					</CardLabel>
					<CardActions>
						{new Date(dueDate) > new Date() ? (
							<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
								Ends {moment(dueDate, 'YYYY-MM-DD').fromNow()}
							</small>
						) : (
							<small className='border border-danger border-2 text-danger fw-bold px-2 py-1 rounded-1'>
								Ended {moment(dueDate, 'YYYY-MM-DD').fromNow()}
							</small>
						)}
					</CardActions>
				</CardHeader>
				<CardBody>
					<div className='row g-2 mb-3'>
						<div className='col-auto'>
							<Badge color={darkModeStatus ? 'light' : 'dark'} isLight>
								<Icon icon='TaskAlt' /> {taskCount}
							</Badge>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>
							{percent}%
							<Progress isAutoColor value={percent} height={10} />
						</div>
						<div className='col-md-6 d-flex justify-content-end'>
							{/* <AvatarGroup>
								<Avatar
									srcSet={USERS.GRACE.srcSet}
									src={USERS.GRACE.src}
									userName={`${USERS.GRACE.name} ${USERS.GRACE.surname}`}
									color={USERS.GRACE.color}
								/>
								<Avatar
									srcSet={USERS.SAM.srcSet}
									src={USERS.SAM.src}
									userName={`${USERS.SAM.name} ${USERS.SAM.surname}`}
									color={USERS.SAM.color}
								/>
								<Avatar
									srcSet={USERS.CHLOE.srcSet}
									src={USERS.CHLOE.src}
									userName={`${USERS.CHLOE.name} ${USERS.CHLOE.surname}`}
									color={USERS.CHLOE.color}
								/>

								<Avatar
									srcSet={USERS.JANE.srcSet}
									src={USERS.JANE.src}
									userName={`${USERS.JANE.name} ${USERS.JANE.surname}`}
									color={USERS.JANE.color}
								/>
								<Avatar
									srcSet={USERS.JOHN.srcSet}
									src={USERS.JOHN.src}
									userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
									color={USERS.JOHN.color}
								/>
								<Avatar
									srcSet={USERS.RYAN.srcSet}
									src={USERS.RYAN.src}
									userName={`${USERS.RYAN.name} ${USERS.RYAN.surname}`}
									color={USERS.RYAN.color}
								/>
							</AvatarGroup> */}
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

const ProjectManagementsList = () => {
	useTourStep(12);

	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	const [teamsStatus, setTeamsStatus] = useState<boolean>(false);
	const [projectsStatus, setProjectsStatus] = useState<boolean>(false);
	const [usersStatus, setUsersStatus] = useState<boolean>(false);
	const handleOnClickToEmployeeListPage = useCallback(() => navigate(`/members`), [navigate]);
	const handleOnClickToEmployeeListPageById = useCallback(
		(id: any) => navigate(`/members/${id}`),
		[navigate],
	);

	const [date, setDate] = useState(new Date());
	// team
	const teamsFormik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: '',
			description: '',
			members: [] as string[],
			orgId: '',
		},
		validate: (values) => {
			const errors: { name?: string; description?: string } = {};

			if (!values.name) {
				errors.name = 'Required';
			} else if (values.name.length < 3) {
				errors.name = 'Must be 3 characters or more';
			} else if (values.name.length > 20) {
				errors.name = 'Must be 20 characters or less';
			}

			if (!values.description) {
				errors.description = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			values.members = selectedList;
			values.orgId = userObject.orgId;
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			};
			await fetch('http://localhost:8080/api/team/save', requestOptions);
			setTeamsStatus(false);
			fetchTeamsData();
		},
	});

	const userObject = JSON.parse(localStorage.getItem('userObject') || '');
	// project
	const projectFormik = useFormik({
		enableReinitialize: true,
		initialValues: {
			projectName: '',
			description: '',
			teamId: '',
			deadline: '',
			orgId: '',
		},
		validate: (values) => {
			const errors: { projectName?: string; description?: string; teamId?: string } = {};

			if (!values.projectName) {
				errors.projectName = 'Required';
			} else if (values.projectName.length < 3) {
				errors.projectName = 'Must be 3 characters or more';
			} else if (values.projectName.length > 20) {
				errors.projectName = 'Must be 20 characters or less';
			}
			if (!values.description) {
				errors.description = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			values.deadline = moment(date).format('yyyy-MM-DD');
			values.orgId = userObject.orgId;
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			};

			await fetch('http://localhost:8080/api/project/save', requestOptions);
			setProjectsStatus(false);
			fetchProjectsData();
		},
	});

	// user
	const userFormik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: '',
			email: '',
			tempSkills: '',
			skills: [] as Object[],
			role: '',
			orgId: '',
		},
		validate: (values) => {
			const errors: { name?: string; email?: string; tempSkills?: string } = {};

			if (!values.name) {
				errors.name = 'Required';
			} else if (values.name.length < 3) {
				errors.name = 'Must be 3 characters or more';
			} else if (values.name.length > 20) {
				errors.name = 'Must be 20 characters or less';
			}
			if (!values.email) {
				errors.email = 'Required';
			}
			if (!values.tempSkills) {
				errors.tempSkills = 'Required';
			}
			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			values.tempSkills.split(',').map((s: any) => {
				const temp: any = {};
				temp.name = s;
				values.skills.push(temp);
			});
			values.orgId = userObject.orgId;
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			};

			await fetch('http://localhost:8080/api/user/save', requestOptions);
			setUsersStatus(false);
			setSelectedList([]);
			fetchUsersData();
		},
	});

	interface ITeam {
		id?: string | number;
		name?: string;
		description?: string;
		members?: Array<string>;
	}

	// todo
	const [list, setList] = useState<ITodoListItem[]>([]);
	const [selectedList, setSelectedList] = useState<string[]>([]);

	const [teams, setTeams] = useState<ITeam[]>([]);
	const [projects, setProjects] = useState([]);
	const fetchUsersData = async () => {
		const data = await fetch(`http://localhost:8080/api/user/all/${userObject.orgId}`);
		const users = await data.json();
		setList(users);
	};

	const fetchTeamsData = async () => {
		const data = await fetch(
			`http://localhost:8080/api/team/all/${userObject.orgId}/${userObject.id}`,
		);
		const teamsData = await data.json();
		setTeams(teamsData);
	};

	const fetchProjectsData = async () => {
		const data = await fetch(
			`http://localhost:8080/api/project/all/${userObject.orgId}/${userObject.id}`,
		);
		const projectsData = await data.json();
		setProjects(projectsData);
	};

	useEffect(() => {
		fetchUsersData();
		fetchTeamsData();
		fetchProjectsData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PageWrapper title={demoPages.projectManagement.subMenu.list.text}>
			<SubHeader>
				<SubHeaderLeft>
					<strong className='fs-5'>Hi {userObject.name}</strong>
					<SubheaderSeparator />
					<span>
						There are{' '}
						<Badge color='info' isLight>
							{teams.length} teams
						</Badge>{' '}
						you are in and{' '}
						<Badge color='success' isLight>
							{projects.length} projects
						</Badge>
						.
					</span>
				</SubHeaderLeft>
				{(userObject?.role === 'CEO' || userObject?.role === 'ADMIN') && (
					<SubHeaderRight>
						<Button
							color='dark'
							// size='md'
							onClick={() => {
								setUsersStatus(true);
								fetchUsersData();
							}}
							icon='AssignmentInd'>
							Add User
						</Button>

						<Button
							color='primary'
							onClick={handleOnClickToEmployeeListPage}
							icon='Person'>
							View Users - {list.length}
						</Button>
					</SubHeaderRight>
				)}
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-12'>
						<div className='display-4 fw-bold py-3'>Teams</div>
					</div>
					<>
						{Array.from(teams).map((team: any, index: any) => (
							<div className='col-md-4' key={index}>
								<Card stretch>
									<CardHeader className='bg-transparent'>
										<CardLabel>
											<CardTitle tag='h4' className='h5'>
												{team.name}
											</CardTitle>
											<CardSubTitle tag='h5' className='h6 text-muted'>
												{team.description}
											</CardSubTitle>
										</CardLabel>
										<CardActions>
											<Button
												icon='ArrowForwardIos'
												aria-label='Read More'
												hoverShadow='default'
												color={darkModeStatus ? 'dark' : undefined}
												onClick={() => {
													handleOnClickToEmployeeListPageById(team.id);
												}}
											/>
										</CardActions>
									</CardHeader>
									<CardBody>
										<AvatarGroup>
											{team?.members?.map((member: any) => (
												<Avatar
													src={UserImage2}
													userName={
														list.filter((u: any) => u.id === member)[0]
															?.name
													}
												/>
											))}
										</AvatarGroup>
									</CardBody>
								</Card>
							</div>
						))}
					</>
					<div className='col-md-4'>
						<Card stretch>
							<CardBody className='d-flex align-items-center justify-content-center'>
								<Button
									color='info'
									size='lg'
									isLight
									onClick={() => {
										setTeamsStatus(true);
									}}
									className='w-100 h-100'
									icon='AddCircle'>
									Add New
								</Button>
							</CardBody>
						</Card>
					</div>
				</div>

				<div className='row mt-3'>
					<div className='col-12'>
						<div className='display-4 fw-bold py-3'>Projects</div>
					</div>
					{projects?.map((project: any) => (
						<Item
							key={project.projectId}
							name={project.projectName}
							teamName={teams.filter((t) => t.id === project.teamId)[0]?.name}
							dueDate={project.deadline}
							attachCount={6}
							taskCount={24}
							percent={65}
							id={project.projectId}
							data-tour='project-item'
						/>
					))}

					<div className='col-md-4'>
						<Card stretch>
							<CardBody className='d-flex align-items-center justify-content-center'>
								<Button
									color='info'
									size='lg'
									isLight
									onClick={() => {
										setProjectsStatus(true);
									}}
									className='w-100 h-100'
									icon='AddCircle'>
									Add New
								</Button>
							</CardBody>
						</Card>
					</div>
				</div>

				{/* team */}
				<OffCanvas
					onSubmit={teamsFormik.handleSubmit}
					noValidate
					isOpen={teamsStatus}
					setOpen={setTeamsStatus}
					placement='end'>
					<OffCanvasBody>
						<Card>
							<CardHeader>
								<CardLabel icon='Description' iconColor='success'>
									<CardTitle>Add Team</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-12'>
										<FormGroup id='name' label='Team Name:'>
											<Input
												id='name'
												placeholder='Name'
												onChange={teamsFormik.handleChange}
												onBlur={teamsFormik.handleBlur}
												value={teamsFormik.values.name}
												isValid={teamsFormik.isValid}
												isTouched={teamsFormik.touched.name}
												invalidFeedback={teamsFormik.errors.name}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>

									<div className='col-12'>
										<FormGroup id='description' label='Team Description:'>
											<Input
												id='description'
												placeholder='Description'
												onChange={teamsFormik.handleChange}
												onBlur={teamsFormik.handleBlur}
												value={teamsFormik.values.description}
												isValid={teamsFormik.isValid}
												isTouched={teamsFormik.touched.description}
												invalidFeedback={teamsFormik.errors.description}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>

									<div className='col-12'>
										<FormGroup id='members' label='Team Members:'>
											<Todo
												list={list}
												selectedList={selectedList}
												setList={setList}
												setSelectedList={setSelectedList}
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
					</OffCanvasBody>
					<div className='chat-send-message p-3'>
						<Button
							color='info'
							icon='Save'
							type='submit'
							isDisable={!teamsFormik.isValid && !!teamsFormik.submitCount}
							onClick={teamsFormik.handleSubmit}>
							SAVE
						</Button>
					</div>
				</OffCanvas>

				{/* project  */}
				<OffCanvas isOpen={projectsStatus} setOpen={setProjectsStatus} placement='end'>
					<OffCanvasBody>
						<Card>
							<CardHeader>
								<CardLabel icon='Description' iconColor='success'>
									<CardTitle>Add Project</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-12'>
										<FormGroup id='projectName' label='Project Name:'>
											<Input
												id='projectName'
												placeholder='Name'
												onChange={projectFormik.handleChange}
												onBlur={projectFormik.handleBlur}
												value={projectFormik.values.projectName}
												isValid={projectFormik.isValid}
												isTouched={projectFormik.touched.projectName}
												invalidFeedback={projectFormik.errors.projectName}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup id='description' label='Project Description:'>
											<Input
												id='description'
												placeholder='Description'
												onChange={projectFormik.handleChange}
												onBlur={projectFormik.handleBlur}
												value={projectFormik.values.description}
												isValid={projectFormik.isValid}
												isTouched={projectFormik.touched.description}
												invalidFeedback={projectFormik.errors.description}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup className='col-12' id='teamId' label='Team:'>
											<Select
												ariaLabel='Team select'
												placeholder='Team'
												onChange={projectFormik.handleChange}
												value={projectFormik.values.teamId}>
												{teams.map((team: any) => (
													<Option key={team.id} value={team.id}>
														{team.name}
													</Option>
												))}
											</Select>
										</FormGroup>
									</div>

									<div className='col-12'>
										<FormGroup className='col-12' label='DeadLine:'>
											<DatePicker
												onChange={(item) => setDate(item)}
												date={date}
												color={process.env.REACT_APP_PRIMARY_COLOR}
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
					</OffCanvasBody>
					<div className='chat-send-message p-3'>
						<Button
							color='info'
							icon='Save'
							type='submit'
							isDisable={!projectFormik.isValid && !!projectFormik.submitCount}
							onClick={projectFormik.handleSubmit}>
							SAVE
						</Button>
					</div>
				</OffCanvas>

				{/* users  */}
				<OffCanvas
					onSubmit={userFormik.handleSubmit}
					noValidate
					isOpen={usersStatus}
					setOpen={setUsersStatus}
					placement='end'>
					<OffCanvasBody>
						<Card>
							<CardHeader>
								<CardLabel icon='Description' iconColor='success'>
									<CardTitle>Add User</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-12'>
										<FormGroup id='name' label='User Name:'>
											<Input
												id='name'
												placeholder='Name'
												onChange={userFormik.handleChange}
												onBlur={userFormik.handleBlur}
												value={userFormik.values.name}
												isValid={userFormik.isValid}
												isTouched={userFormik.touched.name}
												invalidFeedback={userFormik.errors.name}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup id='email' label='Email:'>
											<Input
												id='email'
												placeholder='Email'
												onChange={userFormik.handleChange}
												onBlur={userFormik.handleBlur}
												value={userFormik.values.email}
												isValid={userFormik.isValid}
												isTouched={userFormik.touched.email}
												invalidFeedback={userFormik.errors.email}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup id='tempSkills' label='Skills (,):'>
											<Input
												id='tempSkills'
												placeholder='Skills'
												onChange={userFormik.handleChange}
												onBlur={userFormik.handleBlur}
												value={userFormik.values.tempSkills}
												isValid={userFormik.isValid}
												isTouched={userFormik.touched.tempSkills}
												invalidFeedback={userFormik.errors.tempSkills}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup className='col-12' id='role' label='Role:'>
											<Select
												ariaLabel='Role select'
												placeholder='Role'
												onChange={userFormik.handleChange}
												value={userFormik.values.role}>
												{['ADMIN', 'STAFF'].map((role) => (
													<Option key={role} value={role}>
														{role}
													</Option>
												))}
											</Select>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
					</OffCanvasBody>
					<div className='chat-send-message p-3'>
						<Button
							color='info'
							icon='Save'
							type='submit'
							isDisable={!userFormik.isValid && !!userFormik.submitCount}
							onClick={userFormik.handleSubmit}>
							SAVE
						</Button>
					</div>
				</OffCanvas>
			</Page>
		</PageWrapper>
	);
};;

export default ProjectManagementsList;
