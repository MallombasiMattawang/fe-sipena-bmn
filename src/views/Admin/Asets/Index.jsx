//import useState and useEffect
import { useState, useEffect } from "react";

//import Link from react router dom
import { Link, useNavigate } from "react-router-dom";


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

export default function AsetIndex() {
    //title page
    document.title = "Daftar Aset/Barang BMN";

    const navigate = useNavigate();

    // define state for filters
    const [categories, setCategories] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [locations, setLocations] = useState([]);

    // state for selected filter
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    //define state "kondisiAset"
    const [asets, setAsets] = useState([]);

    // tambahkan fungsi untuk menangani pencarian
    const handleSearch = () => {
        // membangun URL dengan parameter yang dipilih
        const queryParams = new URLSearchParams({
            kategori: selectedCategory,
            kondisi: selectedCondition,
            status: selectedStatus,
            lokasi: selectedLocation,
        }).toString();

        // navigasi ke halaman pencarian
        navigate(`/admin/asets/filter?${queryParams}`);
    };

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

    //function fetchData
    const fetchData = async (pageNumber = 1, keywords = "", category = "", condition = "", status = "", location = "") => {
        //define variable "page"
        const page = pageNumber ? pageNumber : pagination.currentPage;

        await Api.get(`/api/admin/asets?search=${keywords}&category=${category}&condition=${condition}&status=${status}&location=${location}&page=${page}`, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set data response to state "setAsets"
            setAsets(response.data.data.data);

            //set data pagination to state "pagination"
            setPagination(() => ({
                currentPage: response.data.data.current_page,
                perPage: response.data.data.per_page,
                total: response.data.data.total,
            }));
        });
    };

    //function "searchData"
    const searchData = async (e) => {
        //set value to state "keywords"
        setKeywords(e.target.value);

        //call function "fetchData"
        fetchData(1, e.target.value, selectedCategory, selectedCondition, selectedStatus, selectedLocation);
    };

    //fetch filter data
    const fetchFilterData = async () => {
        try {
            const categoryResponse = await Api.get("/api/admin/kategori-asets/all", {
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => setCategories(response.data.data));

            const conditionResponse = await Api.get("/api/admin/kondisi-asets/all", {
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => setConditions(response.data.data));

            const statusResponse = await Api.get("/api/admin/status-asets/all", {
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => setStatuses(response.data.data));

            const locationResponse = await Api.get("/api/admin/lokasi-asets/all", {
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => setLocations(response.data.data));

        } catch (error) {
            console.error('Failed to fetch filter data:', error);
        }
    };

    //useEffect
    useEffect(() => {
        //call function "fetchData"
        fetchData();
        fetchFilterData();
    }, []);

    //function "deleteCategory"
    const deleteCategory = (id) => {
        //show confirm alert
        confirmAlert({
            title: "Are You Sure ?",
            message: "want to delete this data ?",
            buttons: [
                {
                    label: "YES",
                    onClick: async () => {
                        await Api.delete(`/api/admin/asets/${id}`, {
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
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        {hasAnyPermission(["asets.create"]) && (
                                            <div className="col-md-3 col-12 mb-2">
                                                <Link
                                                    to="/admin/asets/create"
                                                    className="btn btn-md btn-primary border-0 shadow-sm w-100"
                                                    type="button"
                                                >
                                                    <i className="fa fa-plus-circle"></i> Tambah Aset
                                                </Link>
                                            </div>
                                        )}
                                        <div className="col-md-9 col-12 mb-2">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={keywords}
                                                    onChange={searchData}
                                                    placeholder="Search..."
                                                />

                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={() => searchData()}
                                                >
                                                    Cari
                                                </button>
                                            </div>
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
                                                            <th className="border-0">Info Aset</th>
                                                            <th className="border-0">Nama Aset</th>
                                                            <th className="border-0">Kondisi</th>
                                                            <th className="border-0">Status</th>
                                                            <th className="border-0">Lokasi</th>
                                                            <th className="border-0">Masa Manfaat</th>
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

                                                                    // Hitung persentase progres terbalik
                                                                    const progressPercentage = (currentYear >= tahunAkhir)
                                                                        ? 0 // Jika tahun sekarang lebih besar atau sama dengan tahun akhir, progres 0%
                                                                        : 100 - ((currentYear - tahunPerolehan) / masaPakai) * 100; // Hitung persentase progres terbalik

                                                                    return (
                                                                        <tr key={aset.id}>
                                                                            <td className="fw-bold text-center">
                                                                                {index + 1 + (pagination.currentPage - 1) * pagination.perPage}
                                                                            </td>
                                                                            <td>{aset.tahun_perolehan}</td>
                                                                            <td>
                                                                                <small>Kode Aset: <br /> {aset.kode_aset} <hr />
                                                                                    NUP: {aset.nup} <hr />
                                                                                    Kategori :<br />{aset.kategori.nama_kategori}
                                                                                </small>
                                                                            </td>
                                                                            <td>{aset.nama_aset}</td>
                                                                            {/* <td>{aset.kondisi.nama_kondisi}</td> */}
                                                                            <td>
                                                                                <span className="text-center"
                                                                                    style={{
                                                                                        color: progressPercentage >= 51 ? "green" :
                                                                                            progressPercentage >= 11 ? "yellow" :
                                                                                                "red"
                                                                                    }}>
                                                                                    {progressPercentage >= 51 ? "BAIK" :
                                                                                        progressPercentage >= 11 ? "RUSAK RINGAN" :
                                                                                            "RUSAK BERAT"}
                                                                                    {/* {aset.kondisi.nama_kondisi} */}
                                                                                </span>

                                                                                <hr />
                                                                                <small>WASDAL:</small>  <br />
                                                                                {aset.inspeksi_terbaru ? aset.inspeksi_terbaru.hasil_inspeksi : '-'}
                                                                                <hr />
                                                                                <small>Rekomendasi:</small>  <br />
                                                                                {aset.inspeksi_terbaru ? aset.inspeksi_terbaru.rekomendasi : '-'}
                                                                            </td>
                                                                            <td>{aset.status.nama_status}</td>
                                                                            <td>{aset.lokasi.nama_lokasi}</td>
                                                                            <td>
                                                                                {masaPakai} Th / {tahunAkhir}
                                                                            </td>
                                                                            <td
                                                                                className="text-center"
                                                                                style={{
                                                                                    color: progressPercentage < 41 ? "red" : "white"
                                                                                }}
                                                                            >
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
                                                onChange={(pageNumber) => fetchData(pageNumber, keywords, selectedCategory, selectedCondition, selectedStatus, selectedLocation)}
                                                position="end"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <label>Kategori Aset</label>
                                    <select
                                        className="form-select"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.nama_kategori}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <label>Kondisi Aset</label>
                                    <select
                                        className="form-select"
                                        value={selectedCondition}
                                        onChange={(e) => setSelectedCondition(e.target.value)}
                                    >
                                        <option value="">Pilih Kondisi</option>
                                        {conditions.map((condition) => (
                                            <option key={condition.id} value={condition.id}>
                                                {condition.nama_kondisi}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <label>Status Aset</label>
                                    <select
                                        className="form-select"
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    >
                                        <option value="">Pilih Status</option>
                                        {statuses.map((status) => (
                                            <option key={status.id} value={status.id}>
                                                {status.nama_status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <label>Lokasi/Ruangan</label>
                                    <select
                                        className="form-select"
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                    >
                                        <option value="">Pilih Lokasi</option>
                                        {locations.map((location) => (
                                            <option key={location.id} value={location.id}>
                                                {location.nama_lokasi}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={handleSearch}
                                    >
                                        Cari
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </LayoutAdmin>
    );
}