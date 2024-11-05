//import useState and useEffect
import { useState, useEffect } from "react";

//import Link from react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

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

export default function InspeksiAsetView() {

    //get ID from parameter URL
    const { tanggal_inspeksi } = useParams();
    //title page
    document.title = "Rincian Inspeksi Asets";

    //define state "kondisiAset"
    const [rows, setRows] = useState([]);

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
    const fetchData = async (pageNumber = 1, keywords = "") => {
        //define variable "page"
        const page = pageNumber ? pageNumber : pagination.currentPage;

        await Api.get(`/api/admin/inspeksi-asets-view/${tanggal_inspeksi}&?search=${keywords}&page=${page}`, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set data response to state "setRows"
            setRows(response.data.data.data);

            //set data pagination to state "pagination"
            setPagination(() => ({
                currentPage: response.data.data.current_page,
                perPage: response.data.data.per_page,
                total: response.data.data.total,
            }));
        });
    };

    //useEffect
    useEffect(() => {
        //call function "fetchData"
        fetchData();
    }, []);

    //function "searchData"
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
                                    <div className="col-md-12 col-12 mb-2 d-flex justify-content-between">
                                        <Link
                                            to="/admin/inspeksi-asets"
                                            className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                                            type="button"
                                        >
                                            <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                                        </Link>
                                        <a
                                            href={`https://api-bmn.otban5-events.com/api/public/inspeksi-asets-pdf/${tanggal_inspeksi}`}
                                            className="btn btn-md btn-info border-0 shadow-sm mb-3"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="fa fa-file-pdf me-2"></i> Cetak Laporan
                                        </a>
                                    </div>


                                )}
                                <div className="col-md-4 col-12 mb-2">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control border-0 shadow-sm"
                                            onChange={(e) => searchData(e)}
                                            placeholder="search here..."
                                        />
                                        <span className="input-group-text border-0 shadow-sm">
                                            <i className="fa fa-search"></i>
                                        </span>
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
                                                    <th className="border-0">Kode/NUP</th>

                                                    <th className="border-0">Info Aset</th>
                                                    <th className="border-0">Kondisi</th>
                                                    <th className="border-0">Status</th>
                                                    <th className="border-0">Lokasi</th>
                                                    <th className="border-0">Masa Manfaat</th>
                                                    <th className="border-0">(%)</th>
                                                    <th className="border-0">Hasil Inspeksi</th>
                                                    <th className="border-0">Rekomendasi</th>
                                                    <th className="border-0">Evident</th>
                                                    <th className="border-0">Petugas</th>
                                                    {/* <th className="border-0" style={{ width: "15%" }}>
                                                        Actions
                                                    </th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    //cek apakah data ada
                                                    rows.length > 0 ? (
                                                        //looping data "rows" dengan "map"
                                                        rows.map((row, index) => {
                                                            // Mengkonversi nilai ke angka
                                                            const tahunPerolehan = Number(row.aset.tahun_perolehan) || 0; // Mengonversi dan default ke 0
                                                            const masaPakai = Number(row.aset.masa_pakai) || 0; // Mengonversi dan default ke 0
                                                            const tahunAkhir = tahunPerolehan + masaPakai; // Tahun akhir

                                                            // Hitung tahun saat ini
                                                            const currentYear = new Date().getFullYear();

                                                            // Hitung persentase progres
                                                            const progressPercentage = (currentYear >= tahunAkhir)
                                                                ? 100 // Jika tahun sekarang lebih besar atau sama dengan tahun akhir, progres 100%
                                                                : ((currentYear - tahunPerolehan) / masaPakai) * 100; // Hitung persentase progres

                                                            return (
                                                                <tr key={row.id}>
                                                                    <td className="fw-bold text-center">
                                                                        {index + 1 + (pagination.currentPage - 1) * pagination.perPage}
                                                                    </td>
                                                                    <td>{row.aset.tahun_perolehan}</td>
                                                                    <td>
                                                                        Kode: <br /> {row.aset.kode_aset} <hr />
                                                                        NUP:<br /> {row.aset.nup}

                                                                    </td>
                                                                    <td>{row.aset.nama_aset} <hr /> Kategori: {row.aset.kategori.nama_kategori}<hr />Merk/Tipe: {row.aset.merk_type}</td>
                                                                    <td>{row.kondisi.nama_kondisi}</td>
                                                                    <td>{row.status.nama_status}</td>
                                                                    <td>{row.lokasi.nama_lokasi}</td>
                                                                    <td>
                                                                        {masaPakai} Th / {tahunAkhir}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {progressPercentage.toFixed(0)}% {/* Format ke dua desimal */}
                                                                    </td>
                                                                    <td>{row.hasil_inspeksi}</td>
                                                                    <td>{row.rekomendasi}</td>
                                                                    <td className="text-center">
                                                                        <img
                                                                            src={row.image}
                                                                            width={"300px"}
                                                                            className="rounded"
                                                                        />
                                                                    </td>
                                                                    <td>{row.petugas.name}</td>

                                                                    {/* <td className="text-center">
                                                                        {hasAnyPermission(["rows.edit"]) && (
                                                                            <Link
                                                                                to={`/admin/rows/edit/${row.id}`}
                                                                                className="btn btn-primary btn-sm me-2"
                                                                            >
                                                                                <i className="fa fa-pencil-alt"></i>
                                                                            </Link>
                                                                        )}
                                                                        {hasAnyPermission(["rows.delete"]) && (
                                                                            <button
                                                                                onClick={() => deleteCategory(row.id)}
                                                                                className="btn btn-danger btn-sm"
                                                                            >
                                                                                <i className="fa fa-trash"></i>
                                                                            </button>
                                                                        )}
                                                                    </td> */}
                                                                </tr>
                                                            );
                                                        })
                                                    ) : (
                                                        //tampilkan pesan data belum tersedia
                                                        <tr>
                                                            <td colSpan={6}>
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