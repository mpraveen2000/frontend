import { Employees } from "../employee";
import { Skill } from "../../../graphql";
import LayoutDesign from "../layout";
import { Tags } from "../Tag";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "../dashboard";
import Skills from "../skill";

export const AppRouting: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDesign />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employees />} />
          <Route path="/skill" element={<Skills />} />
          <Route path="/tag" element={<Tags />} />

          <Route path="*" element={<p>404 Not Found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
