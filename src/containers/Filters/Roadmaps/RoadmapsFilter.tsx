import { DownOutlined } from "@ant-design/icons";
import { FilterContext } from "@src/context/FilterContext";
import { Button, Dropdown, MenuProps, Select, Space } from "antd";
import Search from "antd/es/input/Search";
import { useContext, useState } from "react";

const RoadmapsFilter = () => {
    const { sort, search, filterBoolean } = useContext(FilterContext);
	const [searchOn, setSearchOn] = useState('title');

	const handleSearchOn = (value: string) => {
		setSearchOn(value)
	};

    const handleMenuClick: MenuProps["onClick"] = (e) => {
        console.log("click", e);
    };

	type MenuItem = Required<MenuProps>['items'][number];
	function getItem(
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: 'group',
		): MenuItem {
		return {
			key,
			icon,
			children,
			label,
			type,
		} as MenuItem;
	}		

	const items: MenuItem[] = [
		getItem('Note', 'sub1',null,[
			getItem(<span onClick={() => sort.byNumber("rating")}>Croissant</span>, '1'),
			getItem(<span onClick={() => sort.byNumber("rating", "DESC")}>Décroissant</span>, '2'),

		]),
		
		getItem('Titre', 'sub2',null,[
			getItem(<span onClick={() => sort.byString("title")}>A à Z</span>, '3'),
			getItem(<span onClick={() => sort.byString("title", "DESC")}>Z à A</span>, '4'),

		]),

		getItem('Date', 'sub3',null,[
			getItem(<span onClick={() => sort.byDate("createdAt", "DESC")}>Plus récent</span>, '5'),
			getItem(<span onClick={() => sort.byDate("createdAt")}>Plus ancien</span>, '6'),

		]),

		getItem('Statut', 'sub4',null,[
			getItem(<span onClick={() => filterBoolean("isPublished", 'all')}>Tous</span>, '7'),
			getItem(<span onClick={() => filterBoolean("isPublished", false)}>Privé</span>, '8'),
			getItem(<span onClick={() => filterBoolean("isPublished", true)}>Public</span>, '9'),

		]),

	];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
		<div className='flex gap-2 flex-wrap'>
			<Dropdown menu={menuProps}>
				<Button>
					<Space>
						Trier par :
						<DownOutlined />
					</Space>
				</Button>
			</Dropdown>
			<Search
				addonBefore={ 
				<Select
				defaultValue="title"
				style={{ width: 'fit-content' }}
				onChange={handleSearchOn}
				options={[
					{ value: 'title', label: 'Titre' },
					{ value: 'description', label: 'Description' },
					{ value: 'tag', label: 'Tag' },
				]}
			/>}
				placeholder="rechercher"
				allowClear
				onSearch={(value) => search(searchOn, value)}
				style={{ flexGrow: 1, maxWidth: 300}}
			/>
		</div>
    );
};

export default RoadmapsFilter;
