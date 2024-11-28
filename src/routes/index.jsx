//import react router dom
import { Routes, Route } from "react-router-dom";

//import private routes
import PrivateRoutes from "./PrivateRoutes";

//======================================================
// view admin
//======================================================

//import view login
import Login from "../views/Auth/Login";

//import viuew forbidden
import Forbidden from "../views/Auth/Forbidden";

//import view dashboard
import Dashboard from "../views/Admin/Dashboard/Index";

//import view permissions
import PermissionsIndex from "../views/Admin/Permissions/Index";

//import view roles index
import RolesIndex from "../views/Admin/Roles/Index";

//import view roles create
import RolesCreate from "../views/Admin/Roles/Create";

//import view roles edit
import RolesEdit from "../views/Admin/Roles/Edit";

//import view users index
import UsersIndex from "../views/Admin/Users/Index";

//import view users create
import UsersCreate from "../views/Admin/Users/Create";

//import view users edit
import UsersEdit from "../views/Admin/Users/Edit";

//import view categories index
import CategoriesIndex from "../views/Admin/Categories/Index";
import CategoriesCreate from "../views/Admin/Categories/Create";
import CategoriesEdit from "../views/Admin/Categories/Edit";

//======================================================
// view web
//======================================================

// //import view home
// import Home from "../views/Web/Home/Index";

import KategoriAsetIndex from "../views/Admin/KategoriAsets/Index";
import KondisiAsetIndex from "../views/Admin/KondisiAsets/Index";
import StatusAsetIndex from "../views/Admin/StatusAsets/Index";
import LokasiAsetIndex from "../views/Admin/LokasiAsets/Index";
import AsetIndex from "../views/Admin/Asets/Index";
import LokasiAsetCreate from "../views/Admin/LokasiAsets/Create";
import LokasiAsetEdit from "../views/Admin/LokasiAsets/Edit";
import KategoriAsetCreate from "../views/Admin/KategoriAsets/Create";
import KategoriAsetEdit from "../views/Admin/KategoriAsets/Edit";
import AsetCreate from "../views/Admin/Asets/Create";
import AsetEdit from "../views/Admin/Asets/Edit";
import InspeksiAsetIndex from "../views/Admin/InspeksiAsets/Index";
import InspeksiAsetView from "../views/Admin/InspeksiAsets/View";
import AsetFilter from "../views/Admin/Asets/Filter";
import KondisiAsetCreate from "../views/Admin/KondisiAsets/Create";
import KondisiAsetEdit from "../views/Admin/KondisiAsets/Edit";
import StatusAsetCreate from "../views/Admin/StatusAsets/Create";
import StatusAsetEdit from "../views/Admin/StatusAsets/Edit";
import MasaAsetIndex from "../views/Admin/MasaAsets/Index";
import MasaAsetCreate from "../views/Admin/MasaAsets/Create";
import MasaAsetEdit from "../views/Admin/MasaAsets/Edit";
import Privacy from "../views/Web/Privacy/Index";
import AsetExpired from "../views/Admin/Asets/expired";



export default function RoutesIndex() {
    return (
        <Routes>
            {/* route "/login" */}
            <Route path="/login" element={<Login />} />

            {/* route "/forbidden" */}
            <Route path="/forbidden" element={<Forbidden />} />

            {/* private route "/admin/dashboard" */}
            <Route
                path="/admin/dashboard"
                element={
                    <PrivateRoutes>
                        <Dashboard />
                    </PrivateRoutes>
                }
            />



            {/* private route "/admin/permissions" */}
            <Route
                path="/admin/permissions"
                element={
                    <PrivateRoutes>
                        <PermissionsIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles" */}
            <Route
                path="/admin/roles"
                element={
                    <PrivateRoutes>
                        <RolesIndex />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/roles/create" */}
            <Route
                path="/admin/roles/create"
                element={
                    <PrivateRoutes>
                        <RolesCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/roles/edit" */}
            <Route
                path="/admin/roles/edit/:id"
                element={
                    <PrivateRoutes>
                        <RolesEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/users" */}
            <Route
                path="/admin/users"
                element={
                    <PrivateRoutes>
                        <UsersIndex />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/users/create" */}
            <Route
                path="/admin/users/create"
                element={
                    <PrivateRoutes>
                        <UsersCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/users/edit" */}
            <Route
                path="/admin/users/edit/:id"
                element={
                    <PrivateRoutes>
                        <UsersEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/categories" */}
            <Route
                path="/admin/categories"
                element={
                    <PrivateRoutes>
                        <CategoriesIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/categories/create" */}
            <Route
                path="/admin/categories/create"
                element={
                    <PrivateRoutes>
                        <CategoriesCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/categories/edit" */}
            <Route
                path="/admin/categories/edit/:id"
                element={
                    <PrivateRoutes>
                        <CategoriesEdit />
                    </PrivateRoutes>
                }
            />

            

            {/* private route "/admin/kategori-asets/" */}
            <Route
                path="/admin/kategori-asets"
                element={
                    <PrivateRoutes>
                        <KategoriAsetIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/kondisi-asets/" */}
            <Route
                path="/admin/kondisi-asets"
                element={
                    <PrivateRoutes>
                        <KondisiAsetIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/status-asets/" */}
            <Route
                path="/admin/status-asets"
                element={
                    <PrivateRoutes>
                        <StatusAsetIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/lokasi-asets/" */}
            <Route
                path="/admin/lokasi-asets"
                element={
                    <PrivateRoutes>
                        <LokasiAsetIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/asets/" */}
            <Route
                path="/admin/asets"
                element={
                    <PrivateRoutes>
                        <AsetIndex />
                    </PrivateRoutes>
                }
            />
             {/* private route "/admin/asets-expired/" */}
             <Route
                path="/admin/asets-expired"
                element={
                    <PrivateRoutes>
                        <AsetExpired />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/lokasi-asets/create" */}
            <Route
                path="/admin/lokasi-asets/create"
                element={
                    <PrivateRoutes>
                        <LokasiAsetCreate />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/lokasi-asets/edit/:id" */}
            <Route
                path="/admin/lokasi-asets/edit/:id"
                element={
                    <PrivateRoutes>
                        <LokasiAsetEdit />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/kategori-asets/create" */}
            <Route
                path="/admin/kategori-asets/create"
                element={
                    <PrivateRoutes>
                        <KategoriAsetCreate />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/kategori-asets/edit/:id" */}
            <Route
                path="/admin/kategori-asets/edit/:id"
                element={
                    <PrivateRoutes>
                        <KategoriAsetEdit />
                    </PrivateRoutes>
                }
            />
             {/* private route "/admin/kondisi-asets/create" */}
             <Route
                path="/admin/kondisi-asets/create"
                element={
                    <PrivateRoutes>
                        <KondisiAsetCreate />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/kondisi-asets/edit/:id" */}
            <Route
                path="/admin/kondisi-asets/edit/:id"
                element={
                    <PrivateRoutes>
                        <KondisiAsetEdit />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/status-asets/create" */}
            <Route
                path="/admin/status-asets/create"
                element={
                    <PrivateRoutes>
                        <StatusAsetCreate />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/status-asets/edit/:id" */}
            <Route
                path="/admin/status-asets/edit/:id"
                element={
                    <PrivateRoutes>
                        <StatusAsetEdit />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/asets/create" */}
            <Route
                path="/admin/asets/create"
                element={
                    <PrivateRoutes>
                        <AsetCreate />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/asets/edit/:id" */}
            <Route
                path="/admin/asets/edit/:id"
                element={
                    <PrivateRoutes>
                        <AsetEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/inspeksi-asets/" */}
            <Route
                path="/admin/inspeksi-asets"
                element={
                    <PrivateRoutes>
                        <InspeksiAsetIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/inspeksi-asets/view/:tanggal_inspeksi" */}
            <Route
                path="/admin/inspeksi-asets/view/:tanggal_inspeksi"
                element={
                    <PrivateRoutes>
                        <InspeksiAsetView />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/asets/filter/:kategori" */}
            <Route
                path="/admin/asets/filter"
                element={
                    <PrivateRoutes>
                        <AsetFilter />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/asets/masa-asets*/}
            <Route
                path="/admin/masa-asets"
                element={
                    <PrivateRoutes>
                        <MasaAsetIndex />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/asets/masa-asets/create*/}
            <Route
                path="/admin/masa-asets/create"
                element={
                    <PrivateRoutes>
                        <MasaAsetCreate />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/masa-asets/edit/:id" */}
            <Route
                path="/admin/masa-asets/edit/:id"
                element={
                    <PrivateRoutes>
                        <MasaAsetEdit />
                    </PrivateRoutes>
                }
            />
            

            {/* route "/" */}
            {/* <Route path="/" element={<Home />} /> */}
            {/* route "/" */}
            <Route path="/" element={<Login />} />

            {/* route "/privacy" */}
            <Route path="/privacy" element={<Privacy />} />



        </Routes>

    );
}