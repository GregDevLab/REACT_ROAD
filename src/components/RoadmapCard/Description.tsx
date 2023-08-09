interface DescriptionProps {
	text: string
}

const Description = (props:DescriptionProps) => {
	return (
		<p className="mt-5 line-clamp-3 overflow-hidden">
			{props.text}
		</p>
	)
}
export default Description