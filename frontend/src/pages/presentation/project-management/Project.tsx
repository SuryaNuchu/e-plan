import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPages } from '../../../menu';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import Badge from '../../../components/bootstrap/Badge';
import COLORS from '../../../common/data/enumColors';
import Board from '../../../components/Board/Board';
import USERS from '../../../common/data/userDummyData';

import Slide2 from '../../../assets/img/wanna/slide/scene-2.png';
import Slide4 from '../../../assets/img/wanna/slide/scene-4.png';
import Slide6 from '../../../assets/img/wanna/slide/scene-6.png';
import TAGS from '../../../common/data/boardTagsData';
import CommonAvatarTeam from '../../../common/other/CommonAvatarTeam';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import { TColor } from '../../../type/color-type';
import { TBoardCard } from '../../../components/Board/BoardCard';

interface IData {
	id: string;
	title: string;
	icon: string;
	color: TColor;
	cards?: TBoardCard[];
}
const ProjectManagementsProject = () => {
	const { darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	const { id } = useParams();
	const [project, setProject] = useState();
	const [issues, setIssues] = useState<TBoardCard[]>();
	const [data, setData] = useState<IData[]>([
		{
			id: 'lane1',
			title: 'BACKLOG',
			color: darkModeStatus ? COLORS.LIGHT.name : COLORS.DARK.name,
			icon: 'RateReview',
			cards: [],
		},
		{
			id: 'lane2',
			title: 'TODO',
			color: COLORS.DANGER.name,
			icon: 'DoneOutline',
			cards: [],
		},
		{
			id: 'lane3',
			title: 'PENDING',
			color: COLORS.WARNING.name,
			icon: 'PendingActions',
			cards: [],
		},
		{
			id: 'lane4',
			title: 'RUN',
			color: COLORS.INFO.name,
			icon: 'DirectionsRun',
			cards: [],
		},
		{
			id: 'lane5',
			title: 'DONE',
			color: COLORS.SUCCESS.name,
			icon: 'Verified',
			cards: [],
		},
	]);
	const fetchMetaData = async (id: any) => {
		const projectData = await fetch(`http://localhost:8080/api/project/${id}`);
		const projectDataObject = await projectData.json();
		setProject(projectDataObject);
	};

	const fetchIssuesData = async (id: any) => {
		const issueData = await fetch(`http://localhost:8080/api/issue/get/${id}`);
		const issueDataObject: TBoardCard[] = await issueData.json();
		setIssues(issueDataObject);
		setData([
			{
				id: 'lane1',
				title: 'BACKLOG',
				color: darkModeStatus ? COLORS.LIGHT.name : COLORS.DARK.name,
				icon: 'RateReview',
				cards: issueDataObject.filter((f) => f.status === 'BACKLOG'),
			},
			{
				id: 'lane2',
				title: 'TODO',
				color: COLORS.DANGER.name,
				icon: 'DoneOutline',
				cards: issueDataObject.filter((f) => f.status === 'TODO'),
			},
			{
				id: 'lane3',
				title: 'PENDING',
				color: COLORS.WARNING.name,
				icon: 'PendingActions',
				cards: issueDataObject.filter((f) => f.status === 'PENDING'),
			},
			{
				id: 'lane4',
				title: 'RUN',
				color: COLORS.INFO.name,
				icon: 'DirectionsRun',
				cards: issueDataObject.filter((f) => f.status === 'RUN'),
			},
			{
				id: 'lane5',
				title: 'DONE',
				color: COLORS.SUCCESS.name,
				icon: 'Verified',
				cards: issueDataObject.filter((f) => f.status === 'DONE'),
			},
		]);
	};

	useEffect(() => {
		fetchMetaData(id);
		fetchIssuesData(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PageWrapper title='Project'>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => navigate(-1)}>
						Back to Home
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page container='fluid'>
				<Board
					projectdata={project}
					data={data}
					setData={setData}
					fetchIssuesData={fetchIssuesData}
				/>
			</Page>
		</PageWrapper>
	);
};

export default ProjectManagementsProject;
