import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home/Home.page";
import EditUserPage from "./pages/EditUser/EditUser.page.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users/:id" element={<EditUserPage />} />
    </Routes>
  );
};

export default App;
