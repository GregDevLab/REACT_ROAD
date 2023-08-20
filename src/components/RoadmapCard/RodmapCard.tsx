import { EditOutlined } from "@ant-design/icons";
import { IRoadmap } from "@src/api/types/modelType";
import Description from "@src/components/RoadmapCard/Description";
import SettingsMenu from "@src/components/RoadmapCard/SettingsMenu";
import Title from "@src/components/RoadmapCard/Title";
import { AddRoadmapForm } from "@src/containers/Forms";
import { Avatar, Badge, Card } from "antd";
import React, { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { IoNavigateOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

interface RDMProps {
    roadmap: IRoadmap;
	setOpen: React.Dispatch<React.SetStateAction<any>>;
	isEditable?: boolean
}



const RodmapCard = ({ roadmap, isEditable }: RDMProps) => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate()
	
	let cardAction = isEditable ? [
		<SettingsMenu key="settings" id={roadmap?.id ? roadmap?.id.toString() : '' } isPublished={roadmap.isPublished ? roadmap.isPublished : false} />,
		<EditOutlined key="edit" onClick={() => setOpen(true)} />
	] : [
		<AiOutlineLike key="like" onClick={() => console.log('like')} />,
		<AiOutlineDislike key="dislike" onClick={() => console.log('dislike')} />
	];



    return (
        <div className="w-[100%] lg:w-[49%] xl:w-[32%] h-[250px] shadow rounded-md">
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
                    actions={[
						...cardAction,
                        <IoNavigateOutline
                            key="voir"
                            onClick={() =>{
									const link = isEditable ? `/mes-roadmaps/${roadmap.id}` : `/les-roadmaps/${roadmap.id}` 
									navigate(link)
								}
                            }
                        />,
                    ]}
                >
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
