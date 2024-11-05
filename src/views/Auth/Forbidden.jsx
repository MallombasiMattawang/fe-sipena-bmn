//import layoutAuth
import LayoutAuth from "../../layouts/Auth";

//import Link from react router dom
import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <LayoutAuth>
      <div className="container-fluid mb-5 mt-5">
        <div className="row">
          <div className="col-12 col-sm-12 col-xl-12 mb-4">
            <div className="card border-0 shadow">
              <div className="card-body text-center">
                <img
                  src="/images/no-touch.png"
                  className="mt-5 mb-3"
                  width="200"
                />
                <h2>Access Denied!</h2>
                <Link to="/dashboard" className="btn btn-md btn-tertiary mt-3">
                  <i className="fa fa-long-arrow-alt-left me-2"></i> Back to
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
}