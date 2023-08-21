import { EditOutlined } from "@ant-design/icons";
import { reaction } from "@src/api/reaction";
import { IRoadmap } from "@src/api/types/modelType";
import Description from "@src/components/RoadmapCard/Description";
import SettingsMenu from "@src/components/RoadmapCard/SettingsMenu";
import Title from "@src/components/RoadmapCard/Title";
import { AddRoadmapForm } from "@src/containers/Forms";
import useMutation from "@src/hooks/useMutation";
import { Avatar, Badge, Card, Skeleton } from "antd";
import React, { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { IoNavigateOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

interface RDMProps {
    roadmap: IRoadmap;
	setOpen: React.Dispatch<React.SetStateAction<any>>;
	isEditable?: boolean
	like?: number
	dislike?: number
	userLike?: boolean
	userDislike?: boolean
	loading?: boolean
}



const RodmapCard = ({ roadmap, isEditable, like, dislike, userLike, userDislike, loading }: RDMProps) => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate()
	const [Like, setLike] = useState(userLike)
	const [Dislike, setDislike] = useState(userDislike)
	const [countLike, setCountLike] = useState(like)
	const [countDislike, setCountDislike] = useState(dislike)
	const {mutate, invalidateKey} = useMutation({
		mutationFn: reaction,
		onSuccess: (response) => {
			handleReaction(response.data.message)
			invalidateKey(['all-roadmaps'])
			invalidateKey(['roadmap', roadmap.id].join('-'))
		}
	})

	const handleReaction = (message:string) => {
			switch(message) {
			case 'LIKE':
				setLike(true);
				setCountLike(prev => prev ? prev + 1 : 1);
				break;
			case 'DISLIKE':
				setDislike(true);
				setCountDislike(prev => prev ? prev + 1 : 1);
				break;
			case 'UNLIKE':
				setLike(false);
				setCountLike(prev => prev ? prev - 1 : 0);
				break;
			case 'UNDISLIKE':
				setDislike(false);
				setCountDislike(prev => prev ? prev - 1 : 0);
				break;
			case 'MOVE-TO-LIKE':
				setLike(true);
				setDislike(false);
				setCountLike(prev => prev ? prev + 1 : 1);
				setCountDislike(prev => prev ? prev - 1 : 0);
				break;
			case 'MOVE-TO-DISLIKE':
				setLike(false);
				setDislike(true);
				setCountLike(prev => prev ? prev - 1 : 0);
				setCountDislike(prev => prev ? prev + 1 : 1);
				break;
		}
	}

	const handleLike = (id:string) => {
		mutate(id, 'LIKE')
	}

	const handleDislike = (id:string) => {
		mutate(id, 'DISLIKE')
	}

	const handleNav = (id:string) => {
		const link = isEditable ? `/mes-roadmaps/${id}` : `/les-roadmaps/${id}` 
		navigate(link)
	}


	let cardAction = isEditable ? [
		<SettingsMenu key={roadmap.id+"-settings"} id={roadmap?.id ? roadmap?.id.toString() : '' } isPublished={roadmap.isPublished ? roadmap.isPublished : false} />,
		<EditOutlined key={roadmap.id+"-edit"} onClick={() => setOpen(true)} />
	] : [
		<div className='flex items-center justify-center' onClick={() => roadmap.id && handleLike(roadmap.id)} ><AiOutlineLike key={roadmap.id+"-like"} color={Like ? "blue" : ""} /> <em>{countLike}</em></div>,
		<div className='flex items-center justify-center' onClick={() => roadmap.id && handleDislike(roadmap.id)} ><AiOutlineDislike key={roadmap.id+"-dislike"} color={Dislike ? "red" : ""}/> <em>{countDislike}</em></div>
	];

    return (
        <div className="w-[100%] lg:w-[49%] xl:w-[32%] h-[250px] shadow rounded-md" key={roadmap.id+"-card"}>
            <Badge.Ribbon
                text={roadmap.isPublished ? "Public" : "Privé"}
                color={roadmap.isPublished ? "cyan" : "red"}
            >
                <Card
                    style={{
                        width: "100%",
                        height: "250px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                    actions={loading ? [] :[
						...cardAction,
						<div onClick={() => roadmap.id && handleNav(roadmap.id)}>
                        	<IoNavigateOutline key={roadmap.id+'-nav'}/>,
						</div>
                    ]}
                >
					<Skeleton loading={loading} avatar active>
                    <Meta
                        avatar={
                            <Avatar
                                src={`${import.meta.env.VITE_IMAGE_URL}/${roadmap.imageUrl}`}
                            />
                        }
                        title={
                            <Title
                                title={roadmap.title ?? ""}
                                note={roadmap.rating ?? 0}
                                numberRating={roadmap.numberRatings ?? 0}
                            />
                        }
                        description={
                            <Description text={roadmap.description ?? ""} />
                        }
                        style={{ flexGrow: 1 }}
                    />
					</Skeleton>
                </Card>
            </Badge.Ribbon>
			<AddRoadmapForm
				open={open}
				setOpen={setOpen}
				roadmap={roadmap}
			/>
        </div>
    );
};

export default RodmapCard;
