import { IUser } from "@src/api/types/modelType"
import { getMe } from "@src/api/user"
import useQuery from "@src/hooks/useQuery"
import dayjs from "dayjs"
import { useState } from 'react'

const Profil = () => {
	const [user, setUser] = useState<IUser>({})
	const {data, loading, error} = useQuery({queryFn: () => getMe({include:{_count:{select:{roadmaps:true, steps:true}}}}), queryKey: ['user','me'], onSuccess: (data:any) => setUser(data.object), onError: (error:any) => console.log('🚀 ~ file: Login.tsx:600000 ~ Login ~ error', error)})
	
	if(error) return <p>{error.response.data.message ?? error.message}</p>
	if(loading) return <p>loading...</p>
	console.log("🚀 ~ file: Profil.tsx:7 ~ Profil ~ data:", data)
	
	console.log("🚀 ~ file: Profil.tsx:9 ~ Profil ~ user:", user)
	return (
		<div>
			<p>Voir les données utilisateurs</p>
			<p>{user.email}</p>
			<p>{user.name}</p>
			<p>{user._count?.roadmaps ?? 0} roadmap</p>
			<p>{user._count?.steps ?? 0} étape(s)</p>
			<p>inscrit dpuis le {dayjs(user.createdAt).locale('FR-fr').format('DD/MM/YYYY')}</p>
			<p>editer le profile</p>
			<p>sécurité (modifier le mot e passe)</p>
			<p>supprimer le compte</p>
		</div>
	)
}

export default Profil