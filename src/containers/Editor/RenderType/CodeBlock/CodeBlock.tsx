import { HiOutlineClipboard, HiOutlineClipboardCheck } from "react-icons/hi";
//@ts-ignore
import SyntaxHighlighter from "react-syntax-highlighter";
// @ts-ignore
import { useState } from "react";
// @ts-ignore
import { message } from "antd";
// @ts-ignore
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
const CodeBlock = ({ block }:any) => {
    const [copy, setCopy] = useState(false);

    const thisblock = block;
    const text = thisblock.data?.code;
    const language = thisblock.data?.language;

	const handleCopy = () => {
		navigator.clipboard.writeText(text)
		message.success('Code copié !')
		setCopy(true)
		setTimeout(() => {
			setCopy(false)
		}, 2000);
	}


    return (
        <div className="rounded-md overflow-hidden bg-gray-700 w-[100%] max-w-[650px] my-5 mx-auto">
			<div className="flex justify-between px-2 items-center py-1">
				<p className="m-0 text-gray-400 text-sm">Devpath.fr</p>
				<div className="flex items-center gap-2">
					<span className="w-[10px] h-[10px] block bg-green-600 rounded"></span>
					<span className="w-[10px] h-[10px] block bg-yellow-600 rounded"></span>
					<span className="w-[10px] h-[10px] block bg-red-600 rounded"></span>
					{copy ? <HiOutlineClipboardCheck size="20px" color="#0ca945"/> :<HiOutlineClipboard size="20px" color="#9CA3AF" onClick={handleCopy} style={{cursor: 'pointer'}}/>}
				</div>
			</div>
            <SyntaxHighlighter
                language={language}
                style={atomOneDarkReasonable}
                customStyle={{
					width:"100%",
					padding: "15px",
					margin: "0 auto",
					whiteSpace: 'pre'
				}}
				showLineNumbers={true}
            >
                {text.replace(/\t/g, "    ")}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
