import { login } from "@src/api/auth";
import { AuthContext } from "@src/context/AuthContext";
import { Button, Form, Input } from "antd";
import React, { useContext } from "react";


type FieldType = {
    email?: string;
    password?: string;
};

const Login: React.FC = () => {
	const context = useContext<any>(AuthContext);
	const { handleConnect } = context;
	const [error, setError] = React.useState<string>("")

	const onFinish = async (values: any) => {
		try {
			setError("")
			const response = await login(values)
			const {name,email }  = response.data.object
			handleConnect({
				name,
				email,
				role: 'USER',
				isLoggedIn: true,
			})
		} catch (error: any) {
			console.log("🚀 ~ file: Login.tsx:22 ~ onFinish ~ error:", error)
			setError(error.response.data.message ?? error.message)
		}
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
