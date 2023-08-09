import { register } from "@src/api/auth"
import { getAllUser } from "@src/api/user"
import useMutation from "@src/hooks/useMutation"
import useQuery from "@src/hooks/useQuery"
import { useState } from 'react'

const Admin = () => {
	const [users , setUsers] = useState<any[]>([])
	const {error, refetch} = useQuery({queryFn: getAllUser, queryKey: ['users'], onSuccess: (data:any) => setUsers(data.object), onError: (error:any) => console.log('🚀 ~ file: Login.tsx:600000 ~ Login ~ error', error)})	
	

	const {mutate} = useMutation({mutationFn: register, queryKey: ['users'], onError: (error:any) => console.log('🚀 ~ file: Login.tsx:600000 ~ Login ~ error', error)})
	if(error) return <p>{error.response.data.message ?? error.message}</p>

	
	return (
		<>
			<h1 className="text-3xl font-bold underline">
				Admin connecté
			</h1>
			{users.map((user:any, index) => <p key={user.name+index}>{user.name}</p>)}
			<button onClick={() => mutate({
				name: "lllll",
				email: "lllll@gmail.com",
				password: "test"
			})}>refresh</button>
			<button onClick={() => refetch()}>reftetch</button>
		</>
	)
}

export default Admin