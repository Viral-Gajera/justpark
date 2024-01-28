import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { GlobalContextComponent } from "./util/GlobalContextComponent";

import Home from "./pages/Home";
import ManageSpace from "./pages/ManageSpace";
import RentSpace from "./pages/RentSpace";
import Admin from "./pages/Admin";

function App() {
    return (
        <div className="app">
            <GlobalContextComponent>
                <Toaster position="top-right" reverseOrder={false} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/manage-space/*" element={<ManageSpace />} />
                    <Route path="/rent-space/*" element={<RentSpace />} />
                    <Route path="/admin/*" element={<Admin />} />
                </Routes>
            </GlobalContextComponent>
        </div>
    );
}

export default App;
