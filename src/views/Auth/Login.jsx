import { useState } from "react";
import Api from "../../services/Api";
import LayoutAuth from "../../layouts/Auth";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  document.title = "Login - Sistem Pengendalian Aset Negara";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const login = async (e) => {
    e.preventDefault();
    await Api.post("/api/login", { email, password })
      .then((response) => {
        Cookies.set("token", response.data.token);
        Cookies.set("user", JSON.stringify(response.data.user));
        Cookies.set("permissions", JSON.stringify(response.data.permissions));
        toast.success("Login Successfully!", { position: "top-right", duration: 4000 });
        navigate("/admin/dashboard");
      })
      .catch((error) => setErrors(error.response.data));
  };

  if (Cookies.get("token")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <LayoutAuth>
      <div
        className="login-container d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: 'url("/images/bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          color: "#333",
        }}
      >
        <div className="col-md-4">
          
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
            <h5 className="text-white text-center">
              <img src={"/images/logo-login.png"} width={"100"} alt="Logo" /> <br />
              <strong className="text-danger">SIPENA</strong> | Sistem Pengendalian Barang Milik Negara</h5>
              <h6 className="text-muted">OTORITAS BANDAR UDARA WILAYAH V MAKASSAR</h6>
            <hr />
              {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}
              <form onSubmit={login} className="form">
                <div className="form-group mb-3">
                  <label className="form-label">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa fa-envelope text-secondary"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email Address"
                    />
                  </div>
                  {errors.email && <div className="alert alert-danger mt-1">{errors.email[0]}</div>}
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa fa-lock text-secondary"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                    />
                  </div>
                  {errors.password && (
                    <div className="alert alert-danger mt-1">{errors.password[0]}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100 rounded-4"
                >
                  LOGIN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
}