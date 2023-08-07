import { getAll } from "@src/api/user"
import useQuery from "@src/hooks/useQuery"


const Admin = () => {
	const {data,loading,error} = useQuery({queryFn: getAll, queryKey: 'users'})
	
	if(loading) return <p>Loading...</p>
	if(error) return <p>{error.response.data.message ?? error.message}</p>
	console.log("🚀 ~ file: Login.tsx:9 ~ Login ~ data:", data)
	
	return (
	<h1 className="text-3xl font-bold underline">
		Admin connecté
    </h1>
	)
}

export default Admin