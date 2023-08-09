import { IUser } from "@src/api/types/modelType"
import { getMe } from "@src/api/user"
import useQuery from "@src/hooks/useQuery"
import dayjs from "dayjs"
import { useState } from 'react'

const Profil = () => {
	const [user, setUser] = useState<IUser>({})
	const {data, loading, error} = useQuery({queryFn: () => getMe(), queryKey: ['user','me'], onSuccess: (data:any) => setUser(data.object), onError: (error:any) => console.log('🚀 ~ file: Login.tsx:600000 ~ Login ~ error', error)})
		
		if(error) return <p>{error.response.data.message ?? error.message}</p>
		if(loading) return <p>loading...</p>
		console.log("🚀 ~ file: Profil.tsx:7 ~ Profil ~ data:", data)

	return (
		<div>
			<p>Voir les données utilisateurs</p>
			<p>{user.email}</p>
			<p>{user.name}</p>
			<p>inscrit dpuis le {dayjs(user.createdAt).locale('FR-fr').format('DD/MM/YYYY')}</p>
			<p>editer le profile</p>
			<p>sécurité (modifier le mot e passe)</p>

		</div>
	)
}

export default Profil