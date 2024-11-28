//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

//import react Quill
import ReactQuill from "react-quill";

//import qrcode react
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import PrintComponent from "../../../utils/PrintComponent";

export default function AsetEdit() {
    //title page
    document.title = "Filter Aset BMN";

    //navigata
    const navigate = useNavigate();

    //get ID from parameter URL
    const { id } = useParams();

    // Form state
    const [namaAset, setNamaAset] = useState("");
    const [kodeAset, setKodeAset] = useState("");
    const [merkType, setMerkType] = useState("");
    const [nup, setNup] = useState("");
    const [tahunPerolehan, setTahunPerolehan] = useState("");
    const [kategoriAsetId, setKategoriAsetId] = useState("");
    const [statusAsetId, setStatusAsetId] = useState("");
    const [kondisiAsetId, setKondisiAsetId] = useState("");
    const [lokasiAsetId, setLokasiAsetId] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [harga, setHarga] = useState("");
    const [tanggalPerolehan, setTanggalPerolehan] = useState("");
    const [pemegangAset, setPemegangAset] = useState("");
    const [masaPakai, setMasaPakai] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);

    const [imageAset, setImageAset] = useState('/images/noimage.png');
    const [imageAsetOld, setImageAsetOld] = useState('/images/noimage.png');
    const [hasilInspeksi, setHasilInspeksi] = useState("");
    const [rekomendasi, setRekomendasi] = useState("");

    // Select options state
    const [kategoriAset, setKategoriAset] = useState([]);
    const [kondisiAset, setKondisiAset] = useState([]);
    const [statusAset, setStatusAset] = useState([]);
    const [lokasiAset, setLokasiAset] = useState([]);
    const [masaAset, setMasaAset] = useState([]);

    //token from cookies
    const token = Cookies.get("token");

    //function fetchDataAset
    const fetchDataAset = async () => {
        await Api.get(`/api/admin/asets/${id}`, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set response data to state
            setNamaAset(response.data.data.nama_aset);
            setKodeAset(response.data.data.kode_aset);
            setMerkType(response.data.data.merk_type);
            setNup(response.data.data.nup);
            setTahunPerolehan(response.data.data.tahun_perolehan);
            setKategoriAsetId(response.data.data.kategori_aset_id);
            setStatusAsetId(response.data.data.status_aset_id);
            setKondisiAsetId(response.data.data.kondisi_aset_id);
            setLokasiAsetId(response.data.data.lokasi_aset_id);
            setDeskripsi(response.data.data.deskripsi);
            setHarga(response.data.data.harga);
            setTanggalPerolehan(response.data.data.tanggal_perolehan);
            setPemegangAset(response.data.data.pemegang_aset);
            setMasaPakai(response.data.data.masa_pakai);
            setImageAsetOld(response.data.data.image);
            setImageAset(response.data.data.inspeksi_terbaru.image);
            setHasilInspeksi(response.data.data.inspeksi_terbaru.hasil_inspeksi);
            setRekomendasi(response.data.data.inspeksi_terbaru.rekomendasi);
        });
    };

    const fetchKategoriAset = async () => {
        await Api.get("/api/admin/kategori-asets/all", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => setKategoriAset(response.data.data));
    };

    const fetchKondisiAset = async () => {
        await Api.get("/api/admin/kondisi-asets/all", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => setKondisiAset(response.data.data));
    };

    const fetchStatusAset = async () => {
        await Api.get("/api/admin/status-asets/all", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => setStatusAset(response.data.data));
    };

    const fetchLokasiAset = async () => {
        await Api.get("/api/admin/lokasi-asets/all", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => setLokasiAset(response.data.data));
    };

    const fetchMasaAset = async () => {
        await Api.get("/api/admin/masa-asets/all", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => setMasaAset(response.data.data));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const formatRupiah = (angka) => {
        if (!angka) return null; // Mengembalikan string kosong jika angka null atau undefined
        return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    // Handle Harga
    const handleHargaChange = (e) => {
        let value = e.target.value.replace(/\./g, ''); // Hapus pemisah ribuan
        setHarga(value); // Simpan harga tanpa pemisah ribuan

        // Jika ingin menampilkan dengan format Rupiah:
        e.target.value = formatRupiah(value);
    };

    //useEffect
    useEffect(() => {
        //call function "fetchDataAset"
        fetchDataAset();
        fetchKategoriAset();
        fetchKondisiAset();
        fetchStatusAset();
        fetchLokasiAset();
        fetchMasaAset();
    }, []);

    //function "updateAset"
    const updateAset = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama_aset", namaAset);
        formData.append("kode_aset", kodeAset);
        formData.append("merk_type", merkType);
        formData.append("nup", nup);
        formData.append("tahun_perolehan", tahunPerolehan);
        formData.append("kategori_aset_id", kategoriAsetId);
        formData.append("status_aset_id", statusAsetId);
        formData.append("kondisi_aset_id", kondisiAsetId);
        formData.append("lokasi_aset_id", lokasiAsetId);
        formData.append("deskripsi", deskripsi);
        formData.append("harga", harga);
        formData.append("tanggal_perolehan", tanggalPerolehan);
        formData.append("pemegang_aset", pemegangAset);
        formData.append("masa_pakai", masaPakai);
        if (image) formData.append("image", image);
        formData.append("_method", "PUT");

        await Api.post(`/api/admin/asets/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                toast.success(response.data.message);
                navigate("/admin/asets");
            })
            .catch((error) => {
                setErrors(error.response.data);
            });
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Halaman yang akan dicetak", 10, 10);
        doc.text("Ini adalah contoh konten yang akan muncul di PDF.", 10, 20);
        doc.save("contoh.pdf");
    };

    // data object to be passed to PrintComponent
    const dataToPrint = {
        kodeAset,
        namaAset,
        nup,
    };

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-8">
                            <Link
                                to="/admin/asets"
                                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                                type="button"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body bg-dark">
                                    <h6>
                                        <i className="fa fa-folder"></i> Edit  Aset
                                    </h6>
                                    <hr />
                                    <form onSubmit={updateAset}>
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Nama Aset/Barang</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={namaAset}
                                                    onChange={(e) => setNamaAset(e.target.value)}
                                                    placeholder="Enter Nama Aset / Barang"
                                                />
                                                {errors.nama_aset && (
                                                    <div className="alert alert-danger mt-1">{errors.nama_aset[0]}</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Kode Aset (KODE_ASET-NUP)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={kodeAset}
                                                    onChange={(e) => setKodeAset(e.target.value)}
                                                    placeholder="Enter Kode Aset / Barang"
                                                />
                                                {errors.kode_aset && (
                                                    <div className="alert alert-danger mt-1">{errors.kode_aset[0]}</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Merk / Tipe</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={merkType}
                                                    onChange={(e) => setMerkType(e.target.value)}
                                                    placeholder="Enter Merk / Tipe"
                                                />
                                                {errors.merk_type && (
                                                    <div className="alert alert-danger mt-1">{errors.merk_type[0]}</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">NUP</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={nup}
                                                    onChange={(e) => setNup(e.target.value)}
                                                    placeholder="Enter NUP"
                                                />
                                                {errors.nup && (
                                                    <div className="alert alert-danger mt-1">{errors.nup[0]}</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Tahun Perolehan</label>
                                                <input
                                                    type="number" // Ganti text dengan number untuk memastikan hanya angka yang bisa dimasukkan
                                                    className="form-control"
                                                    value={tahunPerolehan}
                                                    onChange={(e) => setTahunPerolehan(e.target.value)}
                                                    placeholder="Enter Tahun Perolehan"
                                                    min="1900" // Atur batasan tahun yang masuk akal
                                                    max={new Date().getFullYear()} // Maksimal tahun saat ini
                                                />
                                                {errors.tahun_perolehan && (
                                                    <div className="alert alert-danger mt-1">{errors.tahun_perolehan[0]}</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Kategori Aset</label>
                                                <select
                                                    className="form-control"
                                                    value={kategoriAsetId}
                                                    onChange={(e) => setKategoriAsetId(e.target.value)}
                                                >
                                                    <option value="">Pilih Kategori Aset</option>
                                                    {kategoriAset.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.nama_kategori}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.kategori_aset_id && (
                                                    <div className="alert alert-danger mt-1">{errors.kategori_aset_id[0]}</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Kondisi Aset</label>
                                                <select
                                                    className="form-control"
                                                    value={kondisiAsetId}
                                                    onChange={(e) => setKondisiAsetId(e.target.value)}
                                                >
                                                    <option value="">Pilih Kondisi Aset</option>
                                                    {kondisiAset.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.nama_kondisi}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.kondisi_aset_id && (
                                                    <div className="alert alert-danger mt-1">{errors.kondisi_aset_id[0]}</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Status Aset</label>
                                                <select
                                                    className="form-control"
                                                    value={statusAsetId}
                                                    onChange={(e) => setStatusAsetId(e.target.value)}
                                                >
                                                    <option value="">Pilih Status Aset</option>
                                                    {statusAset.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.nama_status}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.status_aset_id && (
                                                    <div className="alert alert-danger mt-1">{errors.status_aset_id[0]}</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Lokasi Aset</label>
                                                <select
                                                    className="form-control"
                                                    value={lokasiAsetId}
                                                    onChange={(e) => setLokasiAsetId(e.target.value)}
                                                >
                                                    <option value="">Pilih Lokasi Aset</option>
                                                    {lokasiAset.map((item) => (
                                                        <option key={item.id} value={item.id}>
                                                            {item.nama_lokasi}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.lokasi_aset_id && (
                                                    <div className="alert alert-danger mt-1">{errors.lokasi_aset_id[0]}</div>
                                                )}
                                            </div>

                                            {/* <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Harga Aset</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={formatRupiah(harga)} // Tampilkan harga dengan pemisah ribuan
                                                    onChange={handleHargaChange} // Tangani perubahan harga
                                                    placeholder="Enter Harga Aset"
                                                />
                                                {errors?.harga && (
                                                    <div className="alert alert-danger">{errors.harga[0]}</div>
                                                )}
                                            </div> */}

                                            {/* <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Tanggal Perolehan</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={tanggalPerolehan}
                                                    onChange={(e) => setTanggalPerolehan(e.target.value)}
                                                />
                                                {errors.tanggal_perolehan && (
                                                    <div className="alert alert-danger mt-1">{errors.tanggal_perolehan[0]}</div>
                                                )}
                                            </div> */}

                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Pemegang Aset</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={pemegangAset}
                                                    onChange={(e) => setPemegangAset(e.target.value)}
                                                />
                                                {errors.pemegang_aset && (
                                                    <div className="alert alert-danger mt-1">{errors.pemegang_aset[0]}</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Masa Manfaat (Tahun)</label>
                                                <select
                                                    className="form-control"
                                                    value={masaPakai}
                                                    onChange={(e) => setMasaPakai(e.target.value)}
                                                >
                                                    <option value="">Pilih Masa Manfaat Aset</option>
                                                    {masaAset.map((item) => (
                                                        <option key={item.id} value={item.nama_masa}>
                                                            {item.nama_masa} Tahun
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.masa_pakai && (
                                                    <div className="alert alert-danger mt-1">{errors.masa_pakai[0]}</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-6">
                                                <label className="form-label fw-bold">Upload Image</label>
                                                <input type="file" className="form-control" onChange={handleImageChange} />
                                                {errors.image && (
                                                    <div className="alert alert-danger mt-1">{errors.image[0]}</div>
                                                )}
                                            </div>

                                            <div className="mb-3 col-md-12">
                                                <label className="form-label fw-bold">Deskripsi</label>
                                                <ReactQuill
                                                    theme="snow"
                                                    rows="5"
                                                    value={deskripsi}
                                                    onChange={(deskripsi) => setDeskripsi(deskripsi)}
                                                />
                                                {errors.deskripsi && (
                                                    <div className="alert alert-danger mt-1">{errors.deskripsi[0]}</div>
                                                )}
                                            </div>



                                            <div className="mb-3 col-md-12">
                                                <button type="submit" className="btn btn-md btn-primary">
                                                    <i className="fa fa-save"></i> Save
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h6>Barcode Aset</h6>
                                </div>
                                <div className="card-body bg-dark text-center">
                                    <PrintComponent data={dataToPrint} />
                                    <a
                                        href={`https://api-bmn.otban5-events.com/api/public/barcode-aset-pdf/${kodeAset}`}
                                        className="btn btn-md btn-info border-0 shadow-sm mb-3"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa fa-file-pdf me-2"></i> Cetak Qrcode
                                    </a>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h6>Foto Aset</h6>
                                </div>
                                <div className="card-body bg-dark text-left">
                                    {imageAsetOld ? (
                                        <img
                                            src={imageAsetOld}
                                            width="100%"
                                            className="rounded"
                                            alt="Gambar Aset"
                                        />
                                    ) : (
                                        <p>Gambar tidak tersedia</p> // Anda bisa mengganti teks ini dengan elemen lainnya
                                    )}

                                </div>
                            </div>
                            {hasilInspeksi ? (
                                <div className="card">
                                    <div className="card-header">
                                        <h6>Inspeksi Terbaru</h6>
                                    </div>
                                    <div className="card-body bg-dark text-left">
                                        {imageAset ? (
                                            <img
                                                src={imageAset}
                                                width="100%"
                                                className="rounded"
                                                alt="Gambar Aset"
                                            />
                                        ) : (
                                            <p>-</p> // Anda bisa mengganti teks ini dengan elemen lainnya
                                        )}
                                        <hr />
                                        <label>Hasil Inspkesi:</label>
                                        <p>
                                            {hasilInspeksi}
                                        </p>
                                        <label>Rekomendasi:</label>
                                        <p>
                                            {rekomendasi}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p><hr />Belum ada Inspeksi</p> // Anda bisa mengganti teks ini dengan elemen lainnya
                            )}

                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
}