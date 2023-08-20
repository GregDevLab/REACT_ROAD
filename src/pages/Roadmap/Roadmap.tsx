import { getOneRoadmap } from "@src/api/roadmap"
import { createStep, deleteStep } from "@src/api/step"
import { IRoadmap } from "@src/api/types/modelType"
import { AuthContext } from "@src/context/AuthContext"
import useMutation from "@src/hooks/useMutation"
import useQuery from "@src/hooks/useQuery"
import { Button, FloatButton, Image, Input, Popconfirm, message } from "antd"
import { useContext, useEffect, useState } from "react"
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiPlusCircle } from "react-icons/bi"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { useNavigate, useParams } from "react-router-dom"
interface RoadmapProps {
	isEditable?: boolean
}

const Roadmap = ({isEditable}:RoadmapProps) => {
	const {id} = useParams<{id:string}>()
	const [roadmap, setRoadmap] = useState<IRoadmap>({})
	const [title, setTitle] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const navigate = useNavigate()
	const {user} = useContext(AuthContext)
	
	
	const goToStep = (id:string) => {
		const link = isEditable ? `/mes-roadmaps/${id}/step/edit/${id}` : `/les-roadmaps/${id}/step/${id}`
		navigate(link)
	}

	useEffect(() => {
		if(roadmap.authorId && user.id) {
			if(roadmap.authorId !== user?.id) {
				navigate(`/les-roadmaps/${id}`)
			}
		}
	}, [roadmap, user]);


	useQuery({
		queryFn: (id) => getOneRoadmap(id,{include:{steps:true}}),
		queryKey: ['roadmap', id],
		onSuccess: (data) => setRoadmap(data.object),
		onError: (error) => console.log(error),
	})

	const {mutate} = useMutation({
		mutationFn: createStep,
		queryKey: ['roadmap', id],
		onSuccess: (response) => {
			message.success('Création réussis !')
			setTitle('')
			goToStep(response.data.object.id)
		},
		// onError: (error) => console.log(error),
	})

		const {mutate: deleteMutation} = useMutation({
		queryKey: ['roadmap', id],
		mutationFn: (id) => deleteStep(id),
		onSuccess: (response) => message.success(response.data.message),
		onError: (error) => message.error(error.response.data.message)
	})

	const newStep = async () => {
		if(!title) return
		mutate({roadmapId: id, title})
	}

	const handleClose = () => {
		setTitle('')
		setIsOpen(false)
	}


	return (
		<div className='relative h-[100%]'>
			{isOpen &&			
			<div className='absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] min-w-[200px] border-solid border-[0.5px] border-gray-300  p-5 rounded-md shadow-lg gb-white flex flex-col'>
				isEditable && <AiOutlineCloseCircle className='absolute top-2 right-2 cursor-pointer hover:scale-125' size={'15px'} color={'red'} onClick={handleClose}/>
				<p className='pt-5'>Quel est le nom de cette thématique ?</p>
				<div className='flex gap-2'>
					<Input placeholder="React [context]" name='title' onChange={(e) => setTitle(e.target.value)}/>
					<Button className='w-fit self-end' onClick={newStep}>Valider</Button>
				</div>
			</div>
			}
			<div className='flex gap-5 items-center'>
				<div>
				<Image
					width={100}
					src={`http://localhost:4000/image/${roadmap.imageUrl}`}
				/>
				{/* <Rating note={roadmap.rating ?? 0} numberRating={roadmap.numberRatings ?? 0} /> */}
				</div>
				<div>
					<h1>{roadmap.title}</h1>
					<p>{roadmap.description}</p>
				</div>
				{
					isEditable &&
					<FloatButton.Group shape="circle" className='right-[10px] sm:right-[20px] md:right-[50px] xl:right-[70px]'>
						<FloatButton 
						icon={<BiPlusCircle className='text-slate-900 text-xl'/>} 
						onClick={() => setIsOpen(true)}
						tooltip='Créer une étape'
						/>
					</FloatButton.Group>
				}
			</div>
			<div className="py-5 my-5">
				<h2 className='text-sky-500 pb-5'>Les Thematiques</h2>
				<div className='flex gap-5 flex-wrap'>
					{ roadmap?.steps &&
						roadmap.steps?.map((step, index) => 
						<div 
						className='group  w-[200px] p-5 rounded-md text-center border-solid border-1 border-gray-100 cursor-pointer hover:border-sky-300 hover:shadow-md relative'
							key={step.id ?? '' +index} 
							onClick={() => goToStep(step.id ?? '')}
						>
							<Popconfirm
								title="Delete the task"
								description="Are you sure to delete this task?"
								onConfirm={(e) => {e?.stopPropagation();deleteMutation(step.id)}}
								onCancel={(e) => e?.stopPropagation()}
								okText="Yes"
								cancelText="No"
							>
							{isEditable && <RiDeleteBin6Fill className='absolute top-2 right-2 hidden group-hover:block' size={'15px'} color={'red'} onClick={(e) => e.stopPropagation()}/>}
							</Popconfirm>
							<span className='block py-2 px-5'>{step.title}</span>
						</div>)
					}
				</div>
			</div>
		</div>
	)
}

export default Roadmap