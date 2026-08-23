import { NavBar } from "./components/shared/ui/NavBar";

import { Outlet } from "react-router";

function App() {
  return (
    <div dir="rtl">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
