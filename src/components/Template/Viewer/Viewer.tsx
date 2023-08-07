import { ReactNode } from 'react'
interface ViewerProps {
	children: ReactNode
}
const Viewer = ({children}:ViewerProps) => {
	return (
		<div className='m-5 flex-grow'>
			{children}
		</div>
	)
}

export default Viewer