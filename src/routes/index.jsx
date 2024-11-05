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
import PostsIndex from "../views/Admin/Posts/Index";
import PostsCreate from "../views/Admin/Posts/Create";
import PostsEdit from "../views/Admin/Posts/Edit";
import PhotosIndex from "../views/Admin/Photos/Index";
import SlidersIndex from "../views/Admin/Sliders/Index";
import EventsIndex from "../views/Admin/Events/Index";
import EventsCreate from "../views/Admin/Events/Create";
import EventsEdit from "../views/Admin/Events/Edit";
import EventCategoriesIndex from "../views/Admin/EventCategories/Index";
import EventCategoriesCreate from "../views/Admin/EventCategories/Create";
import EventCategoriesEdit from "../views/Admin/EventCategories/Edit";
import EventJerseysIndex from "../views/Admin/EventJerseys/Index";

import EventJerseysEdit from "../views/Admin/EventJerseys/Edit";
import EventMembersIndex from "../views/Admin/EventMembers/Index";
import EventJerseysCreate from "../views/Admin/EventJerseys/Create";
import EventMemberCreate from "../views/Admin/EventMembers/Create";
import EventMembersEdit from "../views/Admin/EventMembers/Edit";

//======================================================
// view web
//======================================================

// //import view home
import Home from "../views/Web/Home/Index";

//import view photos index
import WebPhotosIndex from "../views/Web/Photos/Index";
//import view posts index
import WebPostsIndex from "../views/Web/Posts/Index";
//import view post show
import WebPostsShow from "../views/Web/Posts/Show";
import WebRegisMember from "../views/Web/RegisMembers/Index";
import WebRegisMessages from "../views/Web/RegisMembers/Message";
import FaqIndex from "../views/Admin/Faqs/Index";
import FaqsCreate from "../views/Admin/Faqs/Create";
import FaqsEdit from "../views/Admin/Faqs/Edit";
import SponsorIndex from "../views/Admin/Sponsors/Index";
import WebFaqsIndex from "../views/Web/Faqs/Index";
import CountdownTimer from "../views/Web/CountdownTimer/Index";
import VideosIndex from "../views/Admin/Videos/Index";
import WebVideosIndex from "../views/Web/Videos/Index";
import EventMembersRereg from "../views/Admin/EventMembers/ReReg";
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

//import view products index
// import WebProductsIndex from "../views/Web/Products/Index";
// //import view products show
// import WebProductsShow from "../views/Web/Products/Show";
// import LayanansIndex from "../views/Admin/Layanans/Index";
// import LayanansCreate from "../views/Admin/Layanans/Create";
// import LayanansEdit from "../views/Admin/Layanans/Edit";

// import TiketIndex from "../views/Admin/Tikets/Index";
// import TiketCreate from "../views/Admin/Tikets/Create";
// import ConfigDayEdit from "../views/Admin/ConfigDays/Edit";
// import TiketAll from "../views/Admin/Tikets/All";
// import Cetak from "../views/Admin/Tikets/Cetak";
// import HolidaysIndex from "../views/Admin/Holidays/Index";
// import HolidaysCreate from "../views/Admin/Holidays/Create";
// import TiketBooking from "../views/Admin/Tikets/Booking";
// import TiketEdit from "../views/Admin/Tikets/Edit";
// import Scan from "../views/Web/Scans/Index";



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

            {/* private route "/admin/posts" */}
            <Route
                path="/admin/posts"
                element={
                    <PrivateRoutes>
                        <PostsIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/posts/create" */}
            <Route
                path="/admin/posts/create"
                element={
                    <PrivateRoutes>
                        <PostsCreate />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/posts/edit/:id" */}
            <Route
                path="/admin/posts/edit/:id"
                element={
                    <PrivateRoutes>
                        <PostsEdit />
                    </PrivateRoutes>
                }
            />



            {/* private route "/admin/photos/" */}
            <Route
                path="/admin/photos"
                element={
                    <PrivateRoutes>
                        <PhotosIndex />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/sliders/" */}
            <Route
                path="/admin/sliders"
                element={
                    <PrivateRoutes>
                        <SlidersIndex />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/events/" */}
            <Route
                path="/admin/events"
                element={
                    <PrivateRoutes>
                        <EventsIndex />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/events/create" */}
            <Route
                path="/admin/events/create"
                element={
                    <PrivateRoutes>
                        <EventsCreate />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/events/edit/:id" */}
            <Route
                path="/admin/events/edit/:id"
                element={
                    <PrivateRoutes>
                        <EventsEdit />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/event-categories/" */}
            <Route
                path="/admin/event-categories"
                element={
                    <PrivateRoutes>
                        <EventCategoriesIndex />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/event-categories/create" */}
            <Route
                path="/admin/event-categories/create"
                element={
                    <PrivateRoutes>
                        <EventCategoriesCreate />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/event-categories/edit/:id" */}
            <Route
                path="/admin/event-categories/edit/:id"
                element={
                    <PrivateRoutes>
                        <EventCategoriesEdit />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/event-jerseys/" */}
            <Route
                path="/admin/event-jerseys"
                element={
                    <PrivateRoutes>
                        <EventJerseysIndex />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/event-jerseys/create" */}
            <Route
                path="/admin/event-jerseys/create"
                element={
                    <PrivateRoutes>
                        <EventJerseysCreate />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/event-jerseys/edit/:id" */}
            <Route
                path="/admin/event-jerseys/edit/:id"
                element={
                    <PrivateRoutes>
                        <EventJerseysEdit />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/event-members/" */}
            <Route
                path="/admin/event-members"
                element={
                    <PrivateRoutes>
                        <EventMembersIndex />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/event-members/create" */}
            <Route
                path="/admin/event-members/create"
                element={
                    <PrivateRoutes>
                        <EventMemberCreate />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/admin/event-members/edit/:id"
                element={
                    <PrivateRoutes>
                        <EventMembersEdit />
                    </PrivateRoutes>
                }
            />
            <Route
                path="/admin/event-members/rereg/:id"
                element={
                    <PrivateRoutes>
                        <EventMembersRereg />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/event-faqs/" */}
            <Route
                path="/admin/event-faqs"
                element={
                    <PrivateRoutes>
                        <FaqIndex />
                    </PrivateRoutes>
                }
            />
            {/* private route "/admin/event-faqs/create" */}
            <Route
                path="/admin/event-faqs/create"
                element={
                    <PrivateRoutes>
                        <FaqsCreate />
                    </PrivateRoutes>
                }
            />

            <Route
                path="/admin/event-faqs/edit/:id"
                element={
                    <PrivateRoutes>
                        <FaqsEdit />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/event-sponsor/" */}
            <Route
                path="/admin/event-sponsors"
                element={
                    <PrivateRoutes>
                        <SponsorIndex />
                    </PrivateRoutes>
                }
            />

            {/* private route "/admin/event-videos/" */}
            <Route
                path="/admin/videos"
                element={
                    <PrivateRoutes>
                        <VideosIndex />
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
            {/* <Route path="/" element={<CountdownTimer />} /> */}


            {/* route "/photos" */}
            <Route path="/photos" element={<WebPhotosIndex />} />

            {/* route "/posts" */}
            <Route path="/posts" element={<WebPostsIndex />} />

            {/* route "/videos" */}
            <Route path="/videos" element={<WebVideosIndex />} />

            {/* route "/posts/:slug" */}
            <Route path="/posts/:slug" element={<WebPostsShow />} />

            {/* route "/regis-members" */}
            {/* <Route path="/regis-member" element={<WebRegisMember />} /> */}

            {/* route "/regis-messages" */}
            <Route path="/regis-confirm" element={<WebRegisMessages />} />

            {/* route "/faqs" */}
            <Route path="/faqs" element={<WebFaqsIndex />} />

            {/* route "/privacy" */}
            <Route path="/privacy" element={<Privacy />} />



        </Routes>

    );
}