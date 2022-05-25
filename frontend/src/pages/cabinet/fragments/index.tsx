import AddBoxIcon from "@mui/icons-material/AddBox";
import ListIcon from "@mui/icons-material/FeaturedPlayList";
import SettingsIcon from "@mui/icons-material/Settings";
import EventsCabinetFragment from "./EventsCabinetFragment";
import CreateCabinetFragment from "./CreateCabinetFragment";
import SettingsCabinetFragment from "./SettingsCabinetFragment";
import { rootPath } from "src/pages/cabinet/route";

const cabinetFragmentTypes = ["create", "events", "settings"] as const;
export type CabinetFragmentType = typeof cabinetFragmentTypes[number];
export interface CabinetFragmentObjectGeneral {
    fullPath?: () => string;
}
export interface CabinetFragmentObject extends CabinetFragmentObjectGeneral {
    label: string;
    icon: () => React.ReactNode;
    element: () => React.ReactNode;
    path: string;
    with?: {
        params: string;
        element: () => React.ReactNode;
    };
}

export type CabinetFragmentsType = {
    [key in CabinetFragmentType]: CabinetFragmentObject;
};

const cabinetFragments: CabinetFragmentsType = {
    create: {
        label: "Create",
        icon: () => <AddBoxIcon />,
        element: () => <CreateCabinetFragment />,
        path: "create",
    },
    events: {
        label: "Events",
        icon: () => <ListIcon />,
        element: () => <EventsCabinetFragment />,
        path: "events",
    },

    settings: {
        label: "Settings",
        icon: () => <SettingsIcon />,
        element: () => <SettingsCabinetFragment />,
        path: "settings",
    },
} as const;

export function cabinetFragmentsForEach(
    callable: (
        type: CabinetFragmentType,
        fragment: CabinetFragmentObject
    ) => React.ReactNode
) {
    const result = [];
    for (const [type, fragment] of Object.entries(cabinetFragments)) {
        fragment.fullPath = () => rootPath + "/" + fragment.path;
        result.push(callable(type as CabinetFragmentType, fragment));
    }
    return result;
}

export default cabinetFragments;
