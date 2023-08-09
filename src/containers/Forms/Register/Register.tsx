import { register } from "@src/api/auth";
import useMutation from "@src/hooks/useMutation";
import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";


type FieldType = {
	name: string;
    email: string;
    password?: string;
};


const Register = () => {
	const [error, setError] = React.useState<string>("");
	const navigate = useNavigate();

	
	const {mutate} = useMutation({
		mutationFn: register, 
		queryKey: ["users"],
		onError: (error) => setError(error.response.data.message ?? error.message), 
		onSuccess: () =>  navigate("/connexion", { replace: true })
	})

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
            label="Pseudo"
            name="name"
            rules={[{ required: true, message: "Saisissez votre pseudo !" }]}
        >
            <Input />
        </Form.Item>
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

export default Register;
