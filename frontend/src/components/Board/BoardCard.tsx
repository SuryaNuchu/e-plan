import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { FC, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import TAGS, { getTagsDataWithId } from '../../common/data/boardTagsData';
import USERS, { getUserDataWithUsername } from '../../common/data/userDummyData';
import Avatar from '../Avatar';
import Badge from '../bootstrap/Badge';
import Button from '../bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../bootstrap/Card';
import Checks, { ChecksGroup } from '../bootstrap/forms/Checks';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Select from '../bootstrap/forms/Select';
import Textarea from '../bootstrap/forms/Textarea';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import Option from '../bootstrap/Option';
import Icon from '../icon/Icon';
import useDarkMode from '../../hooks/useDarkMode';
import useTourStep from '../../hooks/useTourStep';
import UserImage2 from '../../assets/img/members/member.png';
import COLORS from '../../common/data/enumColors';

export type TBoardCard = {
	id: string;
	title: string;
	projectId: string;
	subtitle: string;
	status: string;
	description: string;
	img?: string;
	assignee: string;
	tasks?: { status: boolean; id: string | number; text: string }[];
	tags: string[];
	attachments?: { id: string | number; file: string; path: string }[];
};

interface IBoardCardProps {
	card: TBoardCard;
	groupId: string;
	data: { id: string; title: string }[];
	setData(...args: unknown[]): unknown;
	users: any;
	projectdata: any;
	fetchIssuesData: any;
}
const BoardCard: FC<IBoardCardProps> = ({
	card,
	groupId,
	data,
	setData,
	users,
	projectdata,
	fetchIssuesData,
}) => {
	useTourStep(13);

	const { darkModeStatus } = useDarkMode();
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const formik = useFormik({
		initialValues: {
			id: card.id || '',
			groupId: card.status || '',
			projectId: card.projectId,
			status: card.status,
			description: card.description || '',
			// text
			assignee: card.assignee || '',
			task:
				(card.tasks && card.tasks.filter((f) => f.status).map((m) => m.id.toString())) ||
				[],
			tags: (card.tags && card.tags.map((m) => m)) || [],

			title: card.title || '',
			subtitle: card.subtitle || '',
		},
		onSubmit: async (values) => {
			values.status = values.groupId;
			values.projectId = projectdata.projectId;
			const requestOptions = {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			};

			await fetch('http://localhost:8080/api/issue/status', requestOptions);
			setEditModalStatus(false);
			fetchIssuesData(projectdata.projectId);
		},
	});

	return (
		<>
			<Card shadow='none' borderSize={1} className='rounded-2'>
				<CardHeader>
					<CardLabel>
						<CardTitle
							tag='h6'
							className={classNames('cursor-pointer', {
								'link-dark': !darkModeStatus,
								'link-light': darkModeStatus,
							})}
							onClick={() => setEditModalStatus(true)}
							data-tour={card.title}>
							{card.title}
						</CardTitle>
						{card.subtitle && (
							<CardSubTitle className='text-muted'>{card.subtitle}</CardSubTitle>
						)}
					</CardLabel>
					{card.assignee && (
						<CardActions>
							<Avatar
								src={UserImage2}
								size={24}
								// user name
								userName={users?.findLast((u: any) => u.id === card.assignee)?.name}
							/>
						</CardActions>
					)}
				</CardHeader>
				<CardBody className='pt-0'>
					<div className='row g-2 mb-3'>
						{!!card?.attachments?.length && (
							<div className='col-auto'>
								<small className='border border-info border-2 text-info fw-bold px-2 py-1 rounded-1'>
									<Icon icon='AttachFile' /> {card.attachments.length}
								</small>
							</div>
						)}
						{!!card?.tasks?.length && (
							<div className='col-auto'>
								<small className='border border-info border-2 text-info fw-bold px-2 py-1 rounded-1'>
									<Icon icon='TaskAlt' /> {card.tasks.length}
								</small>
							</div>
						)}
						{projectdata && projectdata?.deadline && (
							<div className='col-auto'>
								<small className='border border-success border-2 text-success fw-bold px-2 py-1 rounded-1'>
									{moment(projectdata.deadline, 'YYYY-MM-DD').fromNow()}
								</small>
							</div>
						)}
					</div>
					{card.img && (
						<img
							src={card.img}
							className={classNames('img-fluid rounded mb-3 mt-1', {
								'bg-lo25-primary': darkModeStatus,
								'bg-l25-primary': !darkModeStatus,
							})}
							alt={card.title}
						/>
					)}
					{card.description}
				</CardBody>
				{card.tags && (
					<CardFooter className='pt-0' size='sm'>
						<CardFooterLeft>
							{card.tags.map((tag) => (
								<Badge key={tag} color={COLORS.INFO.name} isLight>
									{tag}
								</Badge>
							))}
						</CardFooterLeft>
					</CardFooter>
				)}
			</Card>

			<Modal
				setIsOpen={setEditModalStatus}
				isOpen={editModalStatus}
				size='lg'
				isScrollable
				data-tour='mail-app-modal'>
				<ModalHeader className='px-4' setIsOpen={setEditModalStatus}>
					<ModalTitle id='project-edit'>{card.title}</ModalTitle>
				</ModalHeader>
				<ModalBody className='px-4'>
					<div className='row'>
						<div className='col-md-8'>
							<Card shadow='sm'>
								<CardHeader>
									<CardLabel icon='Info' iconColor='success'>
										<CardTitle>Task Information</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<div className='row g-4'>
										<FormGroup className='col-12' id='title' label='Task Name'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.title}
											/>
										</FormGroup>
										<FormGroup
											className='col-12'
											id='subtitle'
											label='Subtitle'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.subtitle}
											/>
										</FormGroup>
										<FormGroup
											className='col-12'
											id='description'
											label='Description'>
											<Textarea
												onChange={formik.handleChange}
												value={formik.values.description}
											/>
										</FormGroup>
									</div>
								</CardBody>
							</Card>
							{card.attachments && (
								<Card shadow='sm'>
									<CardHeader>
										<CardLabel icon='AttachFile' iconColor='danger'>
											<CardTitle>Attachment</CardTitle>
											<CardSubTitle>
												{card.attachments.length} files
											</CardSubTitle>
										</CardLabel>
										<CardActions>
											<Button color='danger' isOutline>
												New
											</Button>
										</CardActions>
									</CardHeader>
									<CardBody>
										<div className='row g-3'>
											{card.attachments.map((a) => (
												<div key={a.id} className='col-auto'>
													<Button
														color='danger'
														isLight
														icon='CloudDownload'>
														{a.file}
													</Button>
												</div>
											))}
										</div>
									</CardBody>
								</Card>
							)}
							{card.tasks && (
								<Card shadow='sm'>
									<CardHeader>
										<CardLabel icon='Task Alt' iconColor='primary'>
											<CardTitle>Tasks</CardTitle>
											<CardSubTitle>{card.tasks.length} tasks</CardSubTitle>
										</CardLabel>
										<CardActions>
											<Button color='primary' isOutline>
												New
											</Button>
										</CardActions>
									</CardHeader>
									<CardBody>
										<ChecksGroup>
											{/* @ts-ignore */}
											{card.tasks.map((t) => (
												<Checks
													key={t.id}
													id={t.id.toString()}
													name='task'
													label={t.text}
													value={t.id}
													onChange={formik.handleChange}
													checked={formik.values.task.includes(
														t.id.toString(),
													)}
												/>
											))}
										</ChecksGroup>
									</CardBody>
								</Card>
							)}
						</div>
						<div className='col-md-4'>
							<div className='row g-4 sticky-top'>
								<FormGroup className='col-12' id='groupId' label='Status'>
									<Select
										ariaLabel='Board select'
										placeholder='Select group'
										onChange={formik.handleChange}
										value={formik.values.groupId}>
										{data.map((group) => (
											<Option key={group.id} value={group.title}>
												{group.title}
											</Option>
										))}
									</Select>
								</FormGroup>
								<FormGroup className='col-12' id='assignee' label='Assignee'>
									<Select
										ariaLabel='Board select'
										placeholder='Select group'
										onChange={formik.handleChange}
										value={formik.values.assignee}>
										{users.length > 0 &&
											users.map((u: any) => (
												// @ts-ignore
												<Option key={u.id} value={u.id}>
													{
														// @ts-ignore
														`${u.name}`
													}
												</Option>
											))}
									</Select>
								</FormGroup>
								<FormGroup className='col-12' id='tags' label='Tags'>
									<Select
										multiple
										ariaLabel='Board select'
										placeholder='Select group'
										onChange={formik.handleChange}
										value={formik.values.tags}>
										{Object.keys(TAGS).map((t) => (
											// @ts-ignore
											<Option key={TAGS[t].id} value={TAGS[t].id}>
												{
													// @ts-ignore
													TAGS[t].title
												}
											</Option>
										))}
									</Select>
								</FormGroup>
							</div>
						</div>
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
					<Button
						color='primary'
						className='w-100'
						type='submit'
						onClick={formik.handleSubmit}>
						Save
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};
BoardCard.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	// @ts-ignore
	card: PropTypes.object.isRequired,
	groupId: PropTypes.string.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	data: PropTypes.array.isRequired,
	setData: PropTypes.func.isRequired,
};

export default BoardCard;
