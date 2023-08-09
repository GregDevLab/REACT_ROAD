import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Navigation } from "@src/containers";
import { Button, Layout, theme } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [width, setWidth] = useState(0);
    const [maxwidth, setMaxWidth] = useState(0);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="min-h-screen max-h-screen overflow-hidden">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="sm"
                collapsedWidth={width}
                width={maxwidth}
                onBreakpoint={(broken) => {
                    setWidth(80);
                    setMaxWidth(broken ? 0 : 200);
                }}
            >
                <div className={`demo-logo-vertical min-h-[60px] mb-5`} />
			<Navigation />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: "0 24px",
                        minHeight: 280,
                        background: colorBgContainer,
						maxHeight: 'calc(100vh - 64px)',
						overflowY: 'scroll'
                    }}
                >
					<div className='max-w-[1200px] mx-[auto] h-[100%]'>
                    	<Outlet />
					</div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
