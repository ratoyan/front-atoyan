import { HashRouter , Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home/Home.tsx";

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
