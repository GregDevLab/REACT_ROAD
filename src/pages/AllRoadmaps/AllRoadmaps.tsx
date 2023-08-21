import { getAllRoadmap } from "@src/api/roadmap";
import { IRoadmap } from "@src/api/types/modelType";
import RodmapCard from "@src/components/RoadmapCard/RodmapCard";
import { RoadmapsFilter } from "@src/containers/Filters";
import { AddRoadmapForm } from "@src/containers/Forms";
import { AuthContext } from "@src/context/AuthContext";
import { FilterContext } from "@src/context/FilterContext";
import useQuery from "@src/hooks/useQuery";
import { Pagination, message } from "antd";
import { useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
const AllRoadmaps = () => {
	
	const [searchParams, setSearchParams] = useSearchParams();
	const {user} = useContext(AuthContext)
	const [open, setOpen] = useState(false);
	const [roadmaps , setRoadmaps] = useState<IRoadmap[]>([])
	const {setOriginalData,filteredData} = useContext(FilterContext)
	const [rawCount , setRawCount] = useState<number>(0)
	const [page, setPage] = useState<number>(searchParams.get('page') ? Number(searchParams.get('page')) : 1);
	const [pageSize,setPageSize] = useState<number>(searchParams.get('result') ? Number(searchParams.get('result')) : 5)
	const [loading, setLoading] = useState<boolean>(false)
	const queryAllRDM = useCallback(() => getAllRoadmap({where:{isPublished:true}, include:{reactions:true},skip:(page-1)*pageSize, take:pageSize,}), [page, pageSize])

	const {error, refetch} = useQuery({
		queryFn: queryAllRDM,
		queryKey: ['all-roadmaps'],
		onSuccess: (data:any) => {
			setRawCount(data.object.count)
			setRoadmaps(data.object.data)
		},
		onError: (error:any) => message.error(error.response.data.message ?? error.message),
	})

	useEffect(() => {
		setOriginalData([...roadmaps])
		setTimeout(() => {
			setLoading(false)
		},200) 
	}, [roadmaps])


	const changePage = (page:number, pageZize:number) => {
		searchParams.set("page",page.toString());
		searchParams.set("result",pageZize.toString());
		setSearchParams(searchParams);
		setPageSize(pageZize)
		setPage(page)
	}

	useEffect(() => {
		setLoading(true)
		refetch()
	},  [page, pageSize])
	

	if(error) return <p>{error.response.data.message ?? error.message}</p>

	return (
		<div className='flex gap-2 flex-wrap pb-5 justify-center'>
			<div className='sticky top-0 min-h-[60px] w-[100%] bg-white z-10 flex items-center px-5 py-2 shadow'>
				<RoadmapsFilter />
			</div>
			<div className='flex gap-2 flex-wrap w-[100%] lg:pl-[1rem]'>
			{
				(filteredData || []).map((roadmap: IRoadmap) => 
					<RodmapCard 
						key={roadmap.title+'-'+roadmap.id} 
						roadmap={roadmap}
						setOpen={setOpen}
						isEditable={false}
						like={roadmap.reactions?.filter((reaction) => reaction.type === 'LIKE').length || 0}
						dislike={roadmap.reactions?.filter((reaction) => reaction.type === 'DISLIKE').length || 0}
						userLike={roadmap.reactions?.some((reaction) => reaction.userId == user.id && reaction.type === 'LIKE')}
						userDislike={roadmap.reactions?.some((reaction) => reaction.userId == user.id && reaction.type === 'DISLIKE')}
						loading={loading}
					/>
				)
			}
			<AddRoadmapForm
				open={open}
				setOpen={setOpen}
			/>
			</div>
				<Pagination 
					defaultCurrent={page} 
					current={page} 
					total={rawCount} 
					pageSize={pageSize} 
					pageSizeOptions={[5,10,15,20,30,40,50]} 
					showSizeChanger 
					showLessItems 
					onChange={(page, pageSize) => changePage(page, pageSize)}
				/>
		</div>
	)
}

export default AllRoadmaps