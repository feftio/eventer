import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";
import NotFoundPage from "./pages/notfound";
import { initAuth } from "./redux/auth/functions";
import { useRootDispatch } from "./redux";
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
    useRootDispatch()(initAuth());
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth" element={<AuthPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
