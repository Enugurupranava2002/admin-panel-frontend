import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Progress from "./pages/MultiStepForm";
import Page404 from "./pages/Page404";
import Uploads from "./pages/Uploads";

function App() {
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/uploads" element={<Uploads />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );

  return routes;
}

export default App;
