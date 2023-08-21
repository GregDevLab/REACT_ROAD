import { getOneStep, updateStep } from "@src/api/step"
import { TextEditor } from "@src/containers"
import { EditorRender } from "@src/containers/Editor"
import { IDataObj } from "@src/containers/Editor/TextEditor/TextEditor"
import { DEFAULT_DATA } from "@src/containers/constante"
import { AuthContext } from "@src/context/AuthContext"
import useMutation from "@src/hooks/useMutation"
import useQuery from "@src/hooks/useQuery"
import { FloatButton, message } from "antd"
import { useContext, useEffect, useState } from "react"
import { VscPreview } from "react-icons/vsc"
import { useNavigate, useParams } from "react-router-dom"

const EditStep = () => {
	const { id } = useParams<{ id: string }>()
	const [data, setData] = useState<IDataObj | null>(null)
	const [preview, setPreview] = useState<boolean>(false)
	const [axiosResponse, setAxiosResponse] = useState<any>(null)
	const {user} = useContext(AuthContext)
	const navigate = useNavigate()


	const {loading} = useQuery({
		queryKey: ['step', id],
		queryFn: (id) => getOneStep(id),
		onSuccess: (response) => setAxiosResponse(response),
		onError: (error) => message.error(error.response.data.message)
	})
	
	const {mutate: update} = useMutation({
		queryKey: ['step', id],
		mutationFn: (id,data) => updateStep(id, data),
		onSuccess: (response) => message.success(response.data.message),
		onError: (error) => message.error(error.response.data.message)
	})
	

	const handleSave = () => {
		const stringifyData = JSON.stringify(data)
		update(id,{content:stringifyData})
	}

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
	
	useEffect(() => {
		if(axiosResponse?.object.authorId && axiosResponse.object.authorId !== user?.id) {
			if(window.location.href.includes('edit')) {
				navigate(`/les-roadmaps/${axiosResponse.object.roadmapId}/step/${id}`)
			}
		}
	}, [data])
	
	if (loading || !axiosResponse || !data) {
		return <div>Chargement...</div>;
	}
	
	return (
		<div className='max-w-[650px] mx-auto'>
			{preview  && <EditorRender data={data}/>}
			<>
				<div style={{display:`${preview ? 'none': 'block'}`}}>
					<TextEditor 
						data={data} 
						setData={setData} 
						saveMethod={handleSave}
					/>
				</div>
				<FloatButton type={preview ? 'primary' : 'default'} style={{ right: 44 }} icon={<VscPreview />} tooltip={<div>Prévisualiser</div>} onClick={() => setPreview(prev => !prev)}/>
			</>
		</div>
	)
}

export default EditStep