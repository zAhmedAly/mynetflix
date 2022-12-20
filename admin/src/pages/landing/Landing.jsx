import Topbar from "../../components/topbar/Topbar";
import Home from "../home/Home";
import Sidebar from "../../components/sidebar/Sidebar";
import "./landing.css";

const Landing = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Home />
      </div>
    </>
  );
};
export default Landing;
