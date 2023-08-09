import { IRoadmap } from "@src/api/types/modelType";
import { getMe } from "@src/api/user";
import RodmapCard from "@src/components/RoadmapCard/RodmapCard";
import { RoadmapsFilter } from "@src/containers/Filters";
import { FilterContext } from "@src/context/FilterContext";
import useQuery from "@src/hooks/useQuery";
import { FloatButton } from 'antd';
import { useCallback, useContext, useEffect, useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
const Roadmap = () => {
	const [roadmaps , setRoadmaps] = useState<IRoadmap[]>([])
	const {setOriginalData,filteredData} = useContext(FilterContext)
	const queryFunction = useCallback(() => getMe({include:{roadmaps:true}}), [])
	
	const {error} = useQuery({
		queryFn: queryFunction,
		queryKey: ['user', 'roadmaps'],
		onSuccess: (data:any) => {
			console.log('exécuté')
			setRoadmaps(data.object.roadmaps)
		},
		onError: (error:any) => console.log('🚀 ~ file: Login.tsx:600000 ~ Login ~ error', error)
	})

	useEffect(() => {
		setOriginalData(roadmaps) 
	}, [roadmaps])




	if(error) return <p>{error.response.data.message ?? error.message}</p>
	return (
		<div className='flex gap-2 flex-wrap pb-5 justify-center'>
			<div className='sticky top-0 h-[60px] w-[100%] bg-white z-10 flex items-center px-5 shadow'>
				<RoadmapsFilter />
			</div>
			<div className='flex gap-2 flex-wrap w-[100%] lg:pl-[1rem]'>
			{filteredData &&
				filteredData.map((roadmap:IRoadmap, index:number) => 
				<RodmapCard 
				key={roadmap.title ? roadmap.title+index : index} 
				roadmap={roadmap}/>
				)
			}
		    <FloatButton.Group shape="circle" className='right-[10px] sm:right-[20px] md:right-[50px] xl:right-[70px]'>
				<FloatButton 
				icon={<BiPlusCircle className='text-slate-900 text-xl'/>} 
				onClick={() => console.log('ajouter une roadmap')}
				tooltip='Ajouter une roadmap'
				/>
			</FloatButton.Group>
			</div>
		</div>
	)
}

export default Roadmap