import { signin } from "@src/api/auth";
import { AuthContext } from "@src/context/AuthContext";
import useMutation from "@src/hooks/useMutation";
import { Button, Form, Input } from "antd";
import React, { useContext } from "react";

type FieldType = {
    email?: string;
    password?: string;
};

interface FecthData {
	[key: string]: any;
	object: {
		safeUser:UserData
	}
}

interface UserData {
	name: string;
	email: string;
	role?: string;
	id?: string
}

const Login = () => {
	const context = useContext<any>(AuthContext);
	const [error, setError] = React.useState<string>("");
	const { handleConnect} = context;


	const {mutate} = useMutation({
		mutationFn: signin, 
		onError: (error) => setError(error.response.data.message ?? error.message), 
		onSuccess: (response:FecthData) => userLoginSuccess(response.data.object.safeUser) 
	})

	const userLoginSuccess = (data:UserData) => {
		const {name,email, role, id } = data;
		handleConnect({
			name,
			id,
			email,
			role: role ? role : "USER",
			isLoggedIn: true,
		})
	}

	const onFinish = (values: any) => {
		setError("")
		mutate(values)
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
    <Form
        name="basic"
        // labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        style={{ width:'80%', overflow:'hidden' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
		layout="vertical"
    >
		{error && <em className="text-red-500">{error}</em>}
        <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Saisissez votre email !" }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: "Saisissez votre mot de passe !" }]}
        >
            <Input.Password />
        </Form.Item>


        <Form.Item >
            <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                Submit
            </Button>
        </Form.Item>
    </Form>
	)
};
export default Login;
