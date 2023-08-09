import { DownOutlined } from "@ant-design/icons";
import { FilterContext } from "@src/context/FilterContext";
import { Button, Dropdown, MenuProps, Space } from "antd";
import { useContext } from "react";

const RoadmapsFilter = () => {
    const { sort, search } = useContext(FilterContext);

    const handleMenuClick: MenuProps["onClick"] = (e) => {
        console.log("click", e);
    };

    const items: MenuProps["items"] = [
        {
            label: (
                <p onClick={() => sort.byNumber("rating", "DESC")}>
                    Meilleurs notes
                </p>
            ),
            key: "1",
        },
        {
            label: (
                <p onClick={() => sort.byNumber("rating")}>Moins bonne note</p>
            ),
            key: "2",
        },
        {
            label: <p onClick={() => sort.byString("title")}>titre [A a Z]</p>,
            key: "3",
        },
        {
            label: (
                <p onClick={() => sort.byString("title", "DESC")}>
                    titre [Z a A]
                </p>
            ),
            key: "4",
        },
        {
            label: <p onClick={() => sort.byDate("createdAt")}>Plus récent</p>,
            key: "5",
        },
        {
            label: (
                <p onClick={() => sort.byDate("createdAt", "DESC")}>
                    Plus ancien
                </p>
            ),
            key: "6",
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
		<div>
			<Dropdown menu={menuProps}>
				<Button>
					<Space>
						Trier par :
						<DownOutlined />
					</Space>
				</Button>
			</Dropdown>
			<input type="search" name="search" id="search" onChange={(e) => search('title', e.target.value)}/>
		</div>
    );
};

export default RoadmapsFilter;
