import { getAllRoadmap } from "@src/api/roadmap";
import { IRoadmap } from "@src/api/types/modelType";
import RodmapCard from "@src/components/RoadmapCard/RodmapCard";
import { RoadmapsFilter } from "@src/containers/Filters";
import { AddRoadmapForm } from "@src/containers/Forms";
import { FilterContext } from "@src/context/FilterContext";
import useQuery from "@src/hooks/useQuery";
import { useCallback, useContext, useEffect, useState } from 'react';

const AllRoadmaps = () => {
	const [open, setOpen] = useState(false);
	const [roadmaps , setRoadmaps] = useState<IRoadmap[]>([])
	const {setOriginalData,filteredData} = useContext(FilterContext)
	const queryAllRDM = useCallback(() => getAllRoadmap({where:{isPublished: true}}), [])


	const {error} = useQuery({
		queryFn: queryAllRDM,
		queryKey: ['all-roadmaps'],
		onSuccess: (data:any) => setRoadmaps(data.object),
		onError: (error:any) => console.log('🚀 ~ file: Login.tsx:600000 ~ Login ~ error', error),
	})

	useEffect(() => {
		setOriginalData(roadmaps) 
	}, [roadmaps])


	if(error) return <p>{error.response.data.message ?? error.message}</p>

	return (
		<div className='flex gap-2 flex-wrap pb-5 justify-center'>
			<div className='sticky top-0 min-h-[60px] w-[100%] bg-white z-10 flex items-center px-5 py-2 shadow'>
				<RoadmapsFilter />
			</div>
			<div className='flex gap-2 flex-wrap w-[100%] lg:pl-[1rem]'>
			{filteredData &&
				filteredData.map((roadmap:IRoadmap, index:number) => 
				<RodmapCard 
					key={roadmap.title ? roadmap.title+index : index} 
					roadmap={roadmap}
					setOpen={setOpen}
					isEditable={false}
				/>
				)
			}
			<AddRoadmapForm
				open={open}
				setOpen={setOpen}
			/>
			</div>
		</div>
	)
}

export default AllRoadmaps