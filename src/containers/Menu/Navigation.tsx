import { AuthContext } from "@src/context/AuthContext";
import { Menu } from 'antd';
import { useContext } from 'react';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { SlHome, SlLogin, SlLogout } from 'react-icons/sl';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
	const {user, handleDisconnect} = useContext(AuthContext)
	const {isLoggedIn} = user
	const key = window.localStorage.getItem('key')

	const items = [
		{
			key: '1',
			icon: <SlHome />,
			label: <NavLink to="/">Accueil</NavLink>,
		},
		{
			key: '3',
			icon: isLoggedIn ? <SlLogin /> : <SlLogout />,
			label: <NavLink to={`${isLoggedIn ? '/connexion' : '/connexion'}`} onClick={() => isLoggedIn && handleDisconnect()}>{isLoggedIn ? 'Déconnexion' : 'Connexion'}</NavLink>,
		},
	]

	user.role === 'ADMIN' && 
	items.push(			{
		key: '2',
		icon: <MdOutlineAdminPanelSettings />,
		label: <NavLink to="/admin">Admin</NavLink>,
	})

	return (
		<Menu
			theme="dark"
			mode="inline"
			defaultSelectedKeys={[key ?? '1']}
			onClick={(a) => window.localStorage.setItem('key', a.key.toString())}
			items={items}
		/>
	)
}

export default Navigation