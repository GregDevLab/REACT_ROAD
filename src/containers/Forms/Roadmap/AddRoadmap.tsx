import { createRoadmap, updateRoadmap } from "@src/api/roadmap";
import { IRoadmap } from "@src/api/types/modelType";
import useMutation from "@src/hooks/useMutation";
import { Button, Form, Input, Modal, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import TextArea from "antd/es/input/TextArea";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from "react";

interface IAddRoadmap {
	open: boolean;
	setOpen: React.SetStateAction<any>;
	roadmap?: IRoadmap;
}

const AddRoadmap = ({open, setOpen, roadmap}:IAddRoadmap) => {
	const [loading, setLoading] = useState(false);
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	const [form] = Form.useForm();


	const resetForm = () => {
		form.resetFields()
		setImageUrl(null)
		setLoading(false)
		setOpen(false)
	}

	const {mutate: newRodmap} = useMutation({
		mutationFn: createRoadmap,
		queryKey: ['user', 'roadmaps'],
		onSuccess: () => resetForm(),
		onError: (error) => {
			console.log("🚀 ~ file: AddRoadmap.tsx:38 ~ AddRoadmap ~ error:", error)
			setLoading(false)
		}
	})

	const {mutate: update} = useMutation({
		mutationFn: updateRoadmap,
		queryKey: ['user', 'roadmaps'],
		onSuccess: () => resetForm(),
		onError: (error) => {
			console.log("🚀 ~ file: AddRoadmap.tsx:29 ~ error", error)
			setLoading(false)
		}
	})

	const onFinish = (values: any) => {
		if(fileList.length < 1)  {
			values.imageUrl = null ;
		} else {
			values.imageUrl = imageUrl ? imageUrl : roadmap?.imageUrl;
		}
		setLoading(true)
		roadmap?.id ? update(roadmap?.id, values) : newRodmap(values) 
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

    const handleCancel = () => {
		resetForm()
        setOpen(false);
    };

	const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setImageUrl(null)
		setFileList(newFileList);
	};

	const onPreview = async (file: UploadFile) => {
		let src = file.url as string;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as RcFile);
				reader.onload = () => resolve(reader.result as string);
			});
		}
	}

	useEffect(() => {
		if(fileList[0]?.response?.object?.filename) {
			setImageUrl(fileList[0]?.response.object.filename)
		}
		if(!fileList.length) {
			setImageUrl(null)
		}
	}, [fileList])

	/* SET DES INPUTS POUR EDITER + NETTOYAGE */
	useEffect(() => {
		if(roadmap?.imageUrl) {
			setImageUrl(roadmap.imageUrl)
			setFileList([{
				uid: '-1',
				name: roadmap.imageUrl,
				status: 'done',
				url: 'http://localhost:4000/image/'+roadmap.imageUrl,
    		}])
		}
		if(roadmap?.title) {
			setTitle(roadmap.title)
		}
		if(roadmap?.description) {
			setDescription(roadmap.description)
		}
		return () => {
			setImageUrl(null)
			setFileList([])
			setTitle('')
			setDescription('')
		}
	},[open])

    return (

	<Modal
        title={<h2>Ajouter une roadmap</h2>}
        open={open}
        onCancel={handleCancel}
		footer={[]}
		className="top-[5%]"
	>
		<Form
			form={form}
			layout="vertical"		
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			className='py-5 pb-0'
			fields={[
				{
					name: ['title'],
					value: title,
				},
				{
					name: ['description'],
					value: description,
				},
			]}
		>

			<Form.Item valuePropName="fileList" >
				<ImgCrop rotationSlider>
				<Upload
					action={`${import.meta.env.VITE_API_URL}/upload/file`}
					headers={{
						'X-CSRFToken': 'csrfToken',
					}}
					withCredentials
					listType="picture-circle"
					fileList={fileList}
					onChange={onChange}
					onPreview={onPreview}
					onRemove={() => {setFileList([]); setImageUrl(null)}}

				>
					{fileList.length < 1 && '+ Upload'}
				</Upload>
				</ImgCrop>
			</Form.Item>
			
			<Form.Item
			label="Nom de la roadmap"
			name="title"
			rules={[{ required: true, message: 'Veuillez saisir un nom !' }]}
			>
			<Input 
				showCount 
				maxLength={20}
				onChange={(e) => setTitle(e.target.value)}  
			/>
			</Form.Item>

			<Form.Item
			label="Description"
			name="description"
			rules={[{ required: true, message: 'Veuillez ajouter une courte description !' }]}
			>
			<TextArea 
				showCount 
				maxLength={100} 
				style={{ height: 120, resize: 'none' }}
				onChange={(e) => setDescription(e.target.value)}     
			/>
			</Form.Item>

			<Form.Item  className='flex justify-end'>
				<Button type="default" onClick={handleCancel}>
					Quitter
				</Button>
				<Button type="primary" loading={loading} htmlType="submit" className='ml-2'>
					Valider
				</Button>
			</Form.Item>

		</Form>
	</Modal>
	);
};

export default AddRoadmap;
