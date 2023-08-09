import Rating from "@src/components/Rating/Rating"

interface TitleProps {
	title: string
	note: number
	numberRating: number
}

const Title = (props:TitleProps) => {
	return (
		<div className="max-w-[100%] flex flex-wrap justify-between p-0 pr-5 m-0 ">
			<p>{props.title}</p>
			<Rating note={props.note} numberRating={props.numberRating}/>
		</div>
	)
}

export default Title