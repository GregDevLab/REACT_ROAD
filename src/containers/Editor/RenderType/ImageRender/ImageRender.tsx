import { Image } from "antd";

const ImageRender = ({ block }:any) => {

	const thisblock = block;
    const src = thisblock.data?.file.url;
    const stretched = thisblock.data?.stretched;
    const withBackground = thisblock.data?.withBackground;
    const withBorder = thisblock.data?.withBorder;
	const caption = thisblock.data?.caption;



	return (
		<div 
		className={`w-[100%] ${!stretched && "max-w-[650px]"} flex flex-col gap-2 justify-center my-5`}
		>
			<div className={`w-[100%] flex items-center ${withBackground && "bg-[#cdd1e0] p-3"} justify-center rounded-sm`}
			style={{border: withBorder ? '1px solid #cdd1e0' : 'none'}}>
				<Image width={`${withBackground ? '60%' : '100%'}`} style={{borderRadius: '3px'}} src={src}/>
			</div>
			{ caption && 
				<p style={{
					textAlign: 'left',
					border: '1px solid #e8e8eb',
					padding: '10px',
					borderRadius: '5px',
				}}>{caption}</p>
			}
		</div>
	)
}

export default ImageRender