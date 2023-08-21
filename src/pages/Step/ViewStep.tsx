import { getOneStep } from "@src/api/step"
import { EditorRender } from "@src/containers/Editor"
import { IDataObj } from "@src/containers/Editor/TextEditor/TextEditor"
import { DEFAULT_DATA } from "@src/containers/constante"
import useQuery from "@src/hooks/useQuery"
import { message } from "antd"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ViewStep = () => {
	const { id } = useParams<{ id: string }>()
	const [data, setData] = useState<IDataObj | null>(null)
	const [axiosResponse, setAxiosResponse] = useState<any>(null)

	const {loading} = useQuery({
		queryKey: ['step', id],
		queryFn: (id) => getOneStep(id),
		onSuccess: (response) => setAxiosResponse(response),
		onError: (error) => message.error(error.response.data.message)
	})
	
	useEffect(() => {
		if(axiosResponse) {
			setData(JSON.parse(axiosResponse?.object?.content) ?? DEFAULT_DATA )
			return
		}
		
		return () => {
			setAxiosResponse(null)
			setData(null)
		}
	}, [axiosResponse])
	
	
	if (loading || !axiosResponse || !data) {
		return <div>Chargement...</div>;
	}
	
	return (
		<div className='max-w-[650px] mx-auto'>
			<EditorRender data={data}/>
		</div>
	)
}

export default ViewStep