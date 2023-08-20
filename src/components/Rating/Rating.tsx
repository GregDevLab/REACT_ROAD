import { IoStarHalf, IoStarOutline, IoStarSharp } from 'react-icons/io5';
export type RatingProps = {
	note: number
	numberRating: number
}
const Rating = ({note, numberRating}:RatingProps) => {

	if (note >= 5) {
		note = 5;
	}

	const stars = [];
	for (let i = 1; i <= 5; i++) {
		if (i <= Math.floor(note)) {
		stars.push(<IoStarSharp key={i} />);
		} else if (i === Math.ceil(note) && note % 1 !== 0) {
		stars.push(<IoStarHalf key={i} />);
		} else {
		stars.push(<IoStarOutline key={i}/>);
		}
	}
	
	return (
		<div className='pr-5 flex flex-row sm:flex-col gap-1'>
			<em className="flex items-center w-[100%] text-amber-400 p-0 m-0">
			{stars}
			</em>
			<em className="text-sm">({numberRating ?? 0} votes)</em>
		</div>
	);
}

export default Rating