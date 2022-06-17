import AddBoxIcon from "@mui/icons-material/AddBox";
import ListIcon from "@mui/icons-material/FeaturedPlayList";
import SettingsIcon from "@mui/icons-material/Settings";
import EventsCabinetFragment from "./EventsCabinetFragment";
import CreateCabinetFragment from "./CreateCabinetFragment";
import SettingsCabinetFragment from "./SettingsCabinetFragment";
import { Fragments } from "src/components/composable-route";

const cabinetFragments: Fragments = [
    {
        label: "Create",
        icon: AddBoxIcon,
        element: CreateCabinetFragment,
        path: "create",
    },
    {
        default: true,
        label: "Events",
        icon: ListIcon,
        element: EventsCabinetFragment,
        path: "events",
    },
    {
        label: "Settings",
        icon: SettingsIcon,
        element: SettingsCabinetFragment,
        path: "settings",
    },
    // {
    //     label: "Profile",
    //     icon: () => <div>ProfileIcon</div>,
    //     element: () => <div>Profile</div>,
    //     path: "profile",
    // },
];

export default cabinetFragments;
