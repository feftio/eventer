import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";
import NotFoundPage from "./pages/notfound";
import { restoreUser } from "./redux/user/functions";
import { useRootDispatch } from "./redux";
import CabinetPage from "src/pages/cabinet";
import CabinetManager from "src/pages/cabinet/manager";
import "styles/general.scss";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3a54aa",
        },
        secondary: {
            main: "#b0b3c4",
        },
        tonalOffset: 0.2,
    },
    components: {},
});

const App: React.FC = () => {
    const dispatch = useRootDispatch();
    dispatch(restoreUser());
    return (
        <div>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        {CabinetManager.route("/cabinet", <CabinetPage />)}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
