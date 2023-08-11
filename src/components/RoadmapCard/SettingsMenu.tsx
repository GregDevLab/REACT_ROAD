import { SettingOutlined } from "@ant-design/icons";
import { deleteRoadmap, updateRoadmap } from "@src/api/roadmap";
import useMutation from "@src/hooks/useMutation";
import { Dropdown, MenuProps, Popconfirm, message } from "antd";

interface SettingsMenuProps {
	id: string;
	isPublished: boolean;
}

const SettingsMenu = ({id, isPublished}:SettingsMenuProps) => {
	
	const {mutate: toggleStatus } = useMutation({
		mutationFn: updateRoadmap,
		queryKey: ['user', 'roadmaps'],
		onSuccess: () => {
			console.log("🚀 ~ file: SettingsMenu.tsx:76 ~ onSuccess: ~ id", id)
		},
		onError: (error) => {
			console.log("🚀 ~ file: SettingsMenu.tsx:79 ~ onError: ~ error", error)
		}
	});

	const {mutate: handleDelete} = useMutation({
		mutationFn: deleteRoadmap,
		queryKey: ['user', 'roadmaps'],
		onSuccess: () => {
			message.success('Suppression réussie');
		},
		onError: () => {
			message.error('Suppresssion échouée');
		}
	})

	const confirm = () => {
		handleDelete(id)
	};

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <span
					onClick={() => toggleStatus(id, {isPublished: !isPublished})}
                >
                    Rendre {isPublished ? "privé" : "public"}
                </span>
            ),
        },
        {
            key: "2",
            label: (
				<>
				<Popconfirm
					title="Supprimer cette roadmap ?"
					description="Cette action est irréversible, souhaitez-vous continuer ?"
					onConfirm={confirm}
					okText="Yes"
					cancelText="No"
				>
                <span
					className="text-red-500"
                >
                    Supprimer
                </span>
				</Popconfirm>
				</>
            ),
        },
    ];

	return (
		<Dropdown menu={{items} } placement="top" overlayStyle={{paddingBottom:'10px'}}>
			<SettingOutlined
				key="setting"
				onClick={() => console.log("partager ou privé")}
			/>
		</Dropdown>
	)
}

export default SettingsMenu