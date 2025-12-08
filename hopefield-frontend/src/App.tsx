import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Admissions from "./pages/Admissions";
import Calendar from "./pages/Calendar";
import Contact from "./pages/Contact";
import AdminStaffPage from "./pages/AdminStaffPage"; 
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAdmissions from "./pages/AdminAdmissions";
import AcademicsPage from "./pages/Academics";
import CampusLife from "./pages/CampusLife";
import AllNewslettersPage from "./pages/campus-life/newsletters/all";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/campus-life" element={<CampusLife />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/staff" element={<AdminStaffPage />} />
          <Route path="/campus-life/newsletters/all" element={<AllNewslettersPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/pdfs" element={<AdminAdmissions />} />        
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
