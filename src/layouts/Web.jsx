//import css
// import "../assets/admin/css/styles.css";
import "../assets/web/css/custom.css";

//import js
import "../assets/admin/js/bootstrap.bundle.min.js";

//import sidebar
import Navbar from "../components/web/Navbar";

//import navbar
import Footer from "../components/web/Footer";

export default function Web({ children }) {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
}