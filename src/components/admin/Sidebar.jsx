//import Link
import { Link, useLocation } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import permissions
import hasAnyPermission from "../../utils/Permissions";

export default function sidebar() {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const activeRoute = pathname.split("/");

  //get data user from cookies
  const user = JSON.parse(Cookies.get("user"));

  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading"></div>
          <Link
            className={
              activeRoute[2] === "dashboard"
                ? "nav-link active-sidebar"
                : "nav-link"
            }
            to="/admin/dashboard"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Dashboard
          </Link>

          <Link
            className={
              activeRoute[2] === "asets"
                ? "nav-link active-sidebar"
                : "nav-link"
            }
            to="/admin/asets"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-archive"></i>
            </div>
            Data Aset
          </Link>

          <Link
            className={
              activeRoute[2] === "asets-expired"
                ? "nav-link active-sidebar"
                : "nav-link"
            }
            to="/admin/asets-expired"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-archive"></i>
            </div>
            Aset Habis Masa Manfaat
          </Link>

          <Link
            className={
              activeRoute[2] === "lokasi-asets"
                ? "nav-link active-sidebar"
                : "nav-link"
            }
            to="/admin/lokasi-asets"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-marker"></i>
            </div>
            Lokasi / Ruangan Aset
          </Link>

          <Link
            className={
              activeRoute[2] === "inspeksi-asets"
                ? "nav-link active-sidebar"
                : "nav-link"
            }
            to="/admin/inspeksi-asets"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-tasks"></i>
            </div>
            Inspeksi Aset
          </Link>




          {(hasAnyPermission(["categories.index"]) ||
            hasAnyPermission(["posts.index"]) ||
            hasAnyPermission(["pages.index"]) ||
            hasAnyPermission(["products.index"])) && (
              <>
                <div className="sb-sidenav-menu-heading">Tabel Referensi</div>
                <a
                  className={
                    "nav-link collapsed " +
                    (activeRoute[2] === "kategori-asets"
                      ? " active-sidebar"
                      : activeRoute[2] === "kondisi-asets"
                        ? " active-sidebar"
                        : activeRoute[2] === "status-asets"
                          ? " active-sidebar"
                          : activeRoute[2] === "lokasi-asets"
                            ? " active-sidebar"
                            : "")
                  }
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-pencil"></i>
                  </div>
                  Data Dukung
                  <div className="sb-sidenav-collapse-arrow">
                    <i
                      className="fas fa-angle-down"
                      style={{ color: "color: rgb(65 60 60)" }}
                    ></i>
                  </div>
                </a>
              </>
            )}

          <div
            className={
              "collapse " +
              (activeRoute[2] === "kategori-asets"
                ? " show"
                : activeRoute[2] === "kondisi-asets"
                  ? " show"
                  : activeRoute[2] === "status-asets"
                    ? " show"
                    : activeRoute[2] === "masa-asets"
                      ? " show"
                      : "")
            }
            id="collapseLayouts"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              {hasAnyPermission(["asets.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "kategori-asets"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/kategori-asets"
                >
                  Kategori Aset
                </Link>
              )}

              {hasAnyPermission(["asets.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "kondisi-asets"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/kondisi-asets"
                >
                  Kondisi Asets
                </Link>
              )}


              {hasAnyPermission(["asets.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "status-asets"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/status-asets"
                >
                  Status Asets
                </Link>
              )}

              
              {hasAnyPermission(["asets.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "masa-asets"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/masa-asets"
                >
                  Masa Manfaat Aset
                </Link>
              )}


            </nav>
          </div>

          {hasAnyPermission(["layanans.index"]) && (
            <>
              <div className="sb-sidenav-menu-heading">KONFIGURASI</div>
              <Link
                className={
                  activeRoute[2] === "layanans"
                    ? "nav-link active-sidebar"
                    : "nav-link"
                }
                to="/admin/layanans"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-cogs"></i>
                </div>
                Set Layanan
              </Link>
              {/* <Link
                className={
                  activeRoute[2] === "day"
                    ? "nav-link active-sidebar"
                    : "nav-link"
                }
                to="/admin/day/edit/1"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-cogs"></i>
                </div>
                Set Status Hari
              </Link> */}
              <Link
                className={
                  activeRoute[2] === "holidays"
                    ? "nav-link active-sidebar"
                    : "nav-link"
                }
                to="/admin/holidays"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-cogs"></i>
                </div>
                Set Holidays
              </Link>
            </>
          )}

          {(hasAnyPermission(["roles.index"]) ||
            hasAnyPermission(["permissions.index"]) ||
            hasAnyPermission(["users.index"])) && (
              <>
                <div className="sb-sidenav-menu-heading">USERS MANAGEMENT</div>
                <a
                  className={
                    "nav-link collapsed " +
                    (activeRoute[2] === "roles"
                      ? " active-sidebar"
                      : activeRoute[2] === "permissions"
                        ? " active-sidebar"
                        : activeRoute[2] === "users"
                          ? " active-sidebar"
                          : "")
                  }
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseUsers"
                  aria-expanded="false"
                  aria-controls="collapseUsers"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  Users
                  <div className="sb-sidenav-collapse-arrow">
                    <i
                      className="fas fa-angle-down"
                      style={{ color: "color: rgb(65 60 60)" }}
                    ></i>
                  </div>
                </a>
              </>
            )}
          <div
            className={
              "collapse " +
              (activeRoute[2] === "roles"
                ? " show"
                : activeRoute[2] === "permissions"
                  ? " show"
                  : activeRoute[2] === "users"
                    ? " show"
                    : "")
            }
            id="collapseUsers"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              {hasAnyPermission(["roles.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "roles"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/roles"
                >
                  Roles
                </Link>
              )}

              {hasAnyPermission(["permissions.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "permissions"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/permissions"
                >
                  Permissions
                </Link>
              )}

              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "users"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/users"
                >
                  Users
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        {user.email}
      </div>
    </nav>
  );
}
