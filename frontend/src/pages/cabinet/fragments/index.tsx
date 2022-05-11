import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/FeaturedPlayList";
import EventsCabinetFragment from "./EventsCabinetFragment";
import EditCabinetFragment from "./EditCabinetFragment";
import ProfileCabinetFragment from "./ProfileCabinetFragment";

const fragmentTypes = ["events", "edit", "profile"] as const;
export type CabinetFragmentType = typeof fragmentTypes[number];
export type CabinetFragmentObject = {
    label: string;
    icon: () => React.ReactNode;
    element: () => React.ReactNode;
    path: string;
    fullPath?: () => string;
};

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
    },
    profile: {
        label: "Profile",
        icon: () => <EditIcon />,
        element: () => <ProfileCabinetFragment />,
        path: "profile",
    },
} as const;

export default cabinetFragments;
