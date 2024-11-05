//import useState and useEffect
import { useState, useEffect } from "react";

//import Link from react router dom
import { Link, useNavigate, useLocation } from "react-router-dom";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import permissions
import hasAnyPermission from "../../../utils/Permissions";

//import pagination component
import Pagination from "../../../components/general/Pagination";

//import react-confirm-alert
import { confirmAlert } from "react-confirm-alert";

//import CSS react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css";

//money format
import moneyFormat from "../../../utils/MoneyFormat";

//import toast
import toast from "react-hot-toast";

export default function AsetFilter() {

    // Mengambil query string dari URL
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const kategori = params.get('kategori');
    const kondisi = params.get('kondisi');
    const status = params.get('status');
    const lokasi = params.get('lokasi');

     // define state for filters
     const [categories, setCategories] = useState('');
     const [conditions, setConditions] = useState([]);
     const [statuses, setStatuses] = useState([]);
     const [locations, setLocations] = useState([]);
 

    // state for selected filter
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    //title page
    document.title = "Filter Asets";

    //define state "asets"
    const [asets, setAsets] = useState([]);

    //define state "pagination"
    const [pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0,
    });

    //define state "keywords"
    const [keywords, setKeywords] = useState("");

    //token from cookies
    const token = Cookies.get("token");
    const fetchFilterData = async () => {
        try {
          const categoryResponse = await Api.get(`/api/admin/kategori-asets/${kategori}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => setCategories(response.data.data));
    
          const conditionResponse = await Api.get(`/api/admin/kondisi-asets/${kondisi}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => setConditions(response.data.data));
    
          const statusResponse = await Api.get(`/api/admin/status-asets/${status}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => setStatuses(response.data.data));
    
          const locationResponse = await Api.get(`/api/admin/lokasi-asets/${lokasi}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => setLocations(response.data.data));
    
        } catch (error) {
          console.error('Failed to fetch filter data:', error);
        }
      };

    //function fetchData
    const fetchData = async (pageNumber = 1, keywords = "") => {
        //define variable "page"
        const page = pageNumber ? pageNumber : pagination.currentPage;

        await Api.get(`/api/admin/asets-filter?kategori=${kategori}&kondisi=${kondisi}&status=${status}&lokasi=${lokasi}&page=${page}&keywords=${keywords}`, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set data response to state "asets"
            setAsets(response.data.data.data);

            //set data pagination to state "pagination"
            setPagination(() => ({
                currentPage: response.data.data.current_page,
                perPage: response.data.data.per_page,
                total: response.data.data.total,
            }));
        }).catch((error) => {
            console.error("Error fetching data: ", error);
        });
    };

    //useEffect untuk memanggil fetchData saat pertama kali render
    useEffect(() => {
        fetchData();
        fetchFilterData();
    }, [kategori, kondisi, status, lokasi]); // Akan dipanggil ulang jika parameter berubah

    //function "searchData" untuk melakukan pencarian
    const searchData = async (e) => {
        //set value to state "keywords"
        setKeywords(e.target.value);

        //call function "fetchData"
        fetchData(1, e.target.value);
    };

    //function "deleteRow"
    const deleteRow = (id) => {
        //show confirm alert
        confirmAlert({
            title: "Are You Sure ?",
            message: "want to delete this data ?",
            buttons: [
                {
                    label: "YES",
                    onClick: async () => {
                        await Api.delete(`/api/admin/inspeksi-asets/${id}`, {
                            //header
                            headers: {
                                //header Bearer + Token
                                Authorization: `Bearer ${token}`,
                            },
                        }).then((response) => {
                            //show toast
                            toast.success(response.data.message, {
                                position: "top-right",
                                duration: 4000,
                            });

                            //call function "fetchData"
                            fetchData();
                        });
                    },
                },
                {
                    label: "NO",
                    onClick: () => { },
                },
            ],
        });
    };

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                {hasAnyPermission(["asets.create"]) && (
                                    <div className="col-md-3 col-12 mb-2">
                                        <Link
                                            to="/admin/asets"
                                            className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                                            type="button"
                                        >
                                            <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                                        </Link>
                                    </div>
                                )}
                                <div className="col-md-3 col-12 mb-2">
                                    
                                        <h6>Kategori : {categories.nama_kategori}</h6> <br />
                                        <h6>Kondisi : {conditions.nama_kondisi}</h6>
                                        
                                </div>
                                <div className="col-md-3 col-12 mb-2">
                                    
                                        <h6>Status : {statuses.nama_status}</h6> <br />
                                        <h6>Lokasi : {locations.nama_lokasi}</h6>
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-md-12">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body bg-dark">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-centered mb-0 rounded">
                                            <thead className="thead-dark">
                                                <tr className="border-0">
                                                    <th className="border-0" style={{ width: "5%" }}>
                                                        No.
                                                    </th>
                                                    <th className="border-0">Tahun</th>
                                                    <th className="border-0">Nama Aset</th>
                                                    <th className="border-0">Kategori</th>
                                                    <th className="border-0">Kondisi</th>
                                                    <th className="border-0">Status</th>
                                                    <th className="border-0">Lokasi</th>
                                                    <th className="border-0">Masa Pakai</th>
                                                    <th className="border-0">(%)</th>
                                                    <th className="border-0" style={{ width: "15%" }}>
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    // cek apakah data ada
                                                    asets.length > 0 ? (
                                                        // looping data "asets" dengan "map"
                                                        asets.map((aset, index) => {
                                                            // Mengkonversi nilai ke angka
                                                            const tahunPerolehan = Number(aset.tahun_perolehan) || 0; // Mengonversi dan default ke 0
                                                            const masaPakai = Number(aset.masa_pakai) || 0; // Mengonversi dan default ke 0
                                                            const tahunAkhir = tahunPerolehan + masaPakai; // Tahun akhir

                                                            // Hitung tahun saat ini
                                                            const currentYear = new Date().getFullYear();

                                                            // Hitung persentase progres
                                                            const progressPercentage = (currentYear >= tahunAkhir)
                                                                ? 100 // Jika tahun sekarang lebih besar atau sama dengan tahun akhir, progres 100%
                                                                : ((currentYear - tahunPerolehan) / masaPakai) * 100; // Hitung persentase progres

                                                            return (
                                                                <tr key={aset.id}>
                                                                    <td className="fw-bold text-center">
                                                                        {index + 1 + (pagination.currentPage - 1) * pagination.perPage}
                                                                    </td>
                                                                    <td>{aset.tahun_perolehan}</td>
                                                                    <td>
                                                                        <small>Kode: <br /> {aset.kode_aset} <hr />
                                                                            NUP:<br /> {aset.nup} <hr />
                                                                            {aset.nama_aset}
                                                                        </small>
                                                                    </td>
                                                                    <td>{aset.kategori.nama_kategori}</td>
                                                                    <td>{aset.kondisi.nama_kondisi}</td>
                                                                    <td>{aset.status.nama_status}</td>
                                                                    <td>{aset.lokasi.nama_lokasi}</td>
                                                                    <td>
                                                                        {masaPakai} Th / {tahunAkhir}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {progressPercentage.toFixed(0)}% {/* Format ke dua desimal */}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {hasAnyPermission(["asets.edit"]) && (
                                                                            <Link
                                                                                to={`/admin/asets/edit/${aset.id}`}
                                                                                className="btn btn-primary btn-sm me-2"
                                                                            >
                                                                                <i className="fa fa-pencil-alt"></i>
                                                                            </Link>
                                                                        )}
                                                                        {hasAnyPermission(["asets.delete"]) && (
                                                                            <button
                                                                                onClick={() => deleteCategory(aset.id)}
                                                                                className="btn btn-danger btn-sm"
                                                                            >
                                                                                <i className="fa fa-trash"></i>
                                                                            </button>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    ) : (
                                                        // tampilkan pesan data belum tersedia
                                                        <tr>
                                                            <td colSpan={10}>
                                                                <div
                                                                    className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                                                    role="alert"
                                                                >
                                                                    Data Belum Tersedia!.
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination
                                        currentPage={pagination.currentPage}
                                        perPage={pagination.perPage}
                                        total={pagination.total}
                                        onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                                        position="end"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
}