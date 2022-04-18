import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";
import NotFoundPage from "./pages/notfound";
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
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth" element={<AuthPage />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
