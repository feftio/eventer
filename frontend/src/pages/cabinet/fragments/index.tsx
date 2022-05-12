import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/FeaturedPlayList";
import EventsCabinetFragment from "./EventsCabinetFragment";
import EditCabinetFragment from "./EditCabinetFragment";
import ProfileCabinetFragment from "./ProfileCabinetFragment";
import { rootPath } from "src/pages/cabinet/route";

const cabinetFragmentTypes = ["events", "edit", "profile"] as const;
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
    events: {
        label: "Events",
        icon: () => <ListIcon />,
        element: () => <EventsCabinetFragment />,
        path: "events",
    },
    edit: {
        label: "Edit",
        icon: () => <EditIcon />,
        element: () => <EditCabinetFragment />,
        path: "edit",
        with: {
            params: ":id",
            element: () => cabinetFragments.edit.element(),
        },
    },
    profile: {
        label: "Profile",
        icon: () => <EditIcon />,
        element: () => <ProfileCabinetFragment />,
        path: "profile",
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
