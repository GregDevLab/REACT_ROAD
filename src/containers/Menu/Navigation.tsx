import { AuthContext } from "@src/context/AuthContext";
import { Menu } from 'antd';
import { useContext } from 'react';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { SlHome, SlLogin, SlLogout } from 'react-icons/sl';
import { TbPuzzle2 } from 'react-icons/tb';
import { VscAccount } from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';


const Navigation = () => {
	const {user, handleDisconnect} = useContext(AuthContext)
	const {isLoggedIn} = user
	const key = window.localStorage.getItem('key')

	type MenuItem = {
		key: string,
		icon: any,
		label: any,
	}
	const items: MenuItem[] = [
		{
			key: '1',
			icon: <SlHome />,
			label: <NavLink to="/">Accueil</NavLink>,
		},
		{
			key: '5',
			icon: isLoggedIn ? <SlLogin /> : <SlLogout />,
			label: <NavLink to={`${isLoggedIn ? '/connexion' : '/connexion'}`} onClick={() => isLoggedIn && handleDisconnect()}>{isLoggedIn ? 'Déconnexion' : 'Connexion'}</NavLink>,
		},
	]

	isLoggedIn && 
	items.push({
		key: '2',
		icon: <VscAccount />,
		label: <NavLink to="/profil">Profil</NavLink>,
	},{
		key: '3',
		icon: <TbPuzzle2 />,
		label: <NavLink to="/mes-roadmaps">Mes roadmaps</NavLink>,
	}, )





	user.role === 'ADMIN' && 
	items.push(			{
		key: '4',
		icon: <MdOutlineAdminPanelSettings />,
		label: <NavLink to="/admin">Admin</NavLink>,
	})

	return (
		<Menu
			theme="dark"
			mode="inline"
			defaultSelectedKeys={[key ?? '1']}
			onClick={(a) => window.localStorage.setItem('key', a.key.toString())}
			items={items.sort((a, b) => parseInt(a.key) - parseInt(b.key))}
		/>
	)
}

export default Navigation