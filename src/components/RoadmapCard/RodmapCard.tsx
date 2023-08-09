import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { IRoadmap } from "@src/api/types/modelType";
import Description from "@src/components/RoadmapCard/Description";
import Title from "@src/components/RoadmapCard/Title";
import { Avatar, Badge, Card } from 'antd';
import { IoNavigateOutline } from 'react-icons/io5';
const { Meta } = Card;

interface RDMProps {
	roadmap: IRoadmap
}

const RodmapCard = ({roadmap}:RDMProps) => {

	return (
		<div className='w-[100%] lg:w-[49%] xl:w-[32%] h-[250px] shadow rounded-md'>
			<Badge.Ribbon 
			text={roadmap.isPublished ?
				'Public' : 
				'Privé'
			}
			color={roadmap.isPublished ? 'cyan' : 'red'}>
				<Card
					style={{ width: '100%', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
					actions={[
					<SettingOutlined key="setting" onClick={() => console.log('partager ou privé')}/>,
					<EditOutlined key="edit" onClick={() => console.log('éditer le titre la description et le logo')}/>,
					<IoNavigateOutline key="voir" onClick={() => console.log('Rediriger vers la roadmap')}/>,
					]}
				>
					<Meta
						avatar={<Avatar src={roadmap.imageUrl} />}
						title={<Title title={roadmap.title ?? ''} note={roadmap.rating ?? 0} numberRating={roadmap.numberRatings ?? 0}/>}
						description={<Description text={roadmap.description ?? ''}/>}
						style={{flexGrow:1}}
					/>
				</Card>
			</Badge.Ribbon>

		</div>
	)
}

export default RodmapCard