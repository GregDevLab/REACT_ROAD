import { RegisterForm } from "@src/containers/Forms"
import { NavLink } from "react-router-dom"

const Register = () => {
	return (
		<div className='flex place-items-center justify-center h-[100%]'>	
			<div className='hidden sm:block sm:w-[50%] h-[500px] max-h-[100%] bg-[url("join.png")] bg-[length:100%_100%] bg-center bg-no-repeat lg:border-solid border-2 lg:border-sky-500 lg:border-r-0'></div>
			<div className='w-[100%] max-w-[100%] sm:w-[50%] h-[500px] max-h-[100%] flex flex-col justify-center items-center lg:p-2 lg:border-solid lg:border-2 lg:border-sky-500'> 
				<RegisterForm />
				<em>
				Vous avez déjà un compte ? {' '} 
				<NavLink to="/connexion">Se connecter</NavLink>
				</em>
			</div>
		</div>
	)
}

export default Register