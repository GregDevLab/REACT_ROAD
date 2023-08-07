import useAuth, { UserAuth } from "@src/hooks/useAuth";
import { ReactNode, createContext } from 'react';

interface ProviderProps {
	children: ReactNode;
}



interface AuthContextProps {
	user: UserAuth;
	setUser?: React.Dispatch<React.SetStateAction<UserAuth>>
	loading: boolean;
	handleConnect: (user: UserAuth) => void
	handleDisconnect: () => void
}

const defaultValue: AuthContextProps = {
	user: { isLoggedIn: false },
	loading: true,
	handleConnect: () => {},
	handleDisconnect: () => {}
};

export const AuthContext = createContext<AuthContextProps>(defaultValue);

export const AuthProvider = ({ children }: ProviderProps) => {
	const { user, setUser, loading, handleConnect, handleDisconnect } = useAuth();



	return (
		<AuthContext.Provider value={{ user, setUser, loading, handleConnect, handleDisconnect }}>
		{children}
		</AuthContext.Provider>
	);
};

// Custom hook pour accéder facilement au contexte d'authentification
