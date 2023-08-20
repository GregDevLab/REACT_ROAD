import { OutputData } from '@editorjs/editorjs';
import EditorJs from "@natterstefan/react-editor-js";
import { TOOLS, TRANSLATE } from '@src/containers/Editor';
import { FloatButton } from "antd";
import React, { useRef } from "react";
import { FiMenu, FiSave } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
export interface IDataObj extends OutputData {
	blocks: Array<{
		type: string
		data: {
		[key: string]: any
		}
	}>
}
interface TextEditorProps {
	data: IDataObj,
	setData: React.Dispatch<React.SetStateAction<IDataObj | null>>;
	saveMethod: () => void,
}

const TextEditor = ({data, setData, saveMethod}:TextEditorProps) => {

	const ejInstance = useRef<any>(null);
	
	const onChange = async () => {
		const newdata = await ejInstance.current.save();
		console.log("🚀 ~ file: TextEditor.tsx:24 ~ onChange ~ newdata:", newdata)
		setData(newdata);
	};

	const initEditor = (editorInstance?:any) => {
		ejInstance.current = editorInstance;
	}

	const resetBolcks = () => {
		ejInstance.current.clear()
	}
	
	return (
		<>
		<EditorJs
			data={data}
			tools={TOOLS}
			i18n={TRANSLATE}
			onChange={onChange}
			editorInstance={(editorInstance:any) => initEditor(editorInstance)}
		/>
		<FloatButton.Group
			trigger="hover"
			style={{ right: 94 }}
			icon={<FiMenu />}
			>
			
			<FloatButton icon={<RiDeleteBin6Fill color='#dd4c54' />} tooltip={<div>Vider la page</div>} onClick={resetBolcks}/>
			<FloatButton icon={<FiSave color='#388AE5' />}  tooltip={<div>Sauvegarder</div>} onClick={saveMethod}/>
		</FloatButton.Group>
		</>
	)
}

export default TextEditor