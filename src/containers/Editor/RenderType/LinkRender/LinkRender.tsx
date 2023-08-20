
const LinkRender = ({block}:any) => {

	const thisBlock = block.data;
	const meta = thisBlock.meta;
	let link = thisBlock.link;
	const metaDescription = meta.description;
	const metaTitile = meta.title; 
	const metaImage = meta.image.url;



	return (
		<a href={link} target='_blank' className='block p-5 no-underline rounded-md shadow-sm flex gap-5 max-w-[650px] overflow-hidden my-3 mx-auto' style={{border: '1px solid #e5e5e5'}}>
			<div className='w-[80%]'>
				<h2 className='text-md text-black'>{metaTitile}</h2>
				<p className='text-gray-500'>{metaDescription}</p>
				<em className='text-gray-400'>{link}</em>
			</div>
			{metaImage &&
				<div className={`h-[65px] w-[65px] relative ml-10`}>
					<img src={metaImage} className="absolute top-0 left-0 w-full h-full object-cover" alt={link}/>
				</div>
			}
		</a>
	)
}

export default LinkRender