//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate } from "react-router-dom"

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

//money format
import moneyFormat from "../../../utils/MoneyFormat";
import LayoutWeb from "../../../layouts/Web";

export default function WebRegisMessages() {
    const navigate = useNavigate();


    // State initialization
    const [invoice, setInvoice] = useState('');
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [status, setStatus] = useState("");
    const [event_id, setEvent_id] = useState("");
    const [event_jersey_id, setEvent_jersey_id] = useState("");
    const [event_cost, setEvent_cost] = useState("");
    const [event_category_id, setEvent_category_id] = useState("");
    const [gender, setGender] = useState("");

    const [payment_receipt, setPayment_receipt] = useState('');
    const [errors, setErros] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchParams = new URLSearchParams(location.search);
    const invoiceParam = searchParams.get('invoice');

    //token from cookies
    const token = Cookies.get("token");

    //function "fetchDataEventMember"
    const fetchDataEventMember = async () => {
        const searchParams = new URLSearchParams(location.search);
        const invoiceParam = searchParams.get('invoice');
        await Api.get(`/api/public/event-members-invoice/${invoiceParam}`, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set response data to state "members"
            setInvoice(response.data.data.invoice);
            setFirst_name(response.data.data.first_name);
            setLast_name(response.data.data.last_name);
            setStatus(response.data.data.status);
            setEvent_id(response.data.data.event.title);
            setEvent_category_id(response.data.data.event_category.name);
            setEvent_cost(response.data.data.event_category.cost);
            setEvent_jersey_id(response.data.data.event_jersey.size);

        });
    };

    // Function to handle form submission
    const updateMember = async (e) => {
        e.preventDefault();

        // Disable form and show loading message
        setLoading(true);

        try {
            // Sending data
            const response = await Api.post(
                "/api/public/event-members-confirm",
                {
                    // Data
                    invoice: invoice,
                    payment_receipt: payment_receipt,
                },
                {
                    // Headers
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "multipart/form-data",
                    },
                }
            );

            // Show success toast
            toast.success(response.data.message, {
                position: "top-right",
                duration: 40000,
            });

            // Redirect
            navigate("/");
        } catch (error) {
            if (error.response) {
                // Check if the status code is 500
                if (error.response.status === 500) {
                    alert('INVOICE tidak ditemukan');
                } else {
                    // Handle other errors
                    setErros(error.response.data || 'Something went wrong!');
                }
            } else {
                setErros('Something went wrong!');
            }


        } finally {
            // Re-enable form after data is sent
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataEventMember();

    }, [location.search]);

    return (
        <LayoutWeb>
            <div className="container mt-4 mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="text-uppercase">
                            <i className="fa fa-ticket"></i> KONFIRMASI PEMBAYARAN
                        </h5>
                        <hr />
                    </div>
                    <div className="col-md-4">
                        <div
                            className="d-none d-md-block d-lg-block"
                            style={{ marginTop: "10px" }}
                        ></div>
                        <form
                            className="d-flex mb-3"
                            action="#"
                            method="GET"
                        >
                            <input
                                className="form-control border-0 me-2"
                                type="search"
                                name="invoice"
                                placeholder="Nomor Invoice ... "
                                aria-label="Search"
                                required
                            />
                            <button className="btn btn-primary-dark" type="submit" style={{ borderColor: '#005005', color: 'white' }}>
                                Cek
                            </button>
                        </form>
                    </div>
                </div>
                {
                    invoice ? (
                        <div className="row mt-4">
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <div className="alert alert-info">
                                        <table className="">
                                            <tr>
                                                <td>ID Registrasi </td>
                                                <td>:</td>
                                                <td><strong>{invoice}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Nama Peserta </td>
                                                <td>:</td>
                                                <td><strong>{first_name}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Event / Kategori </td>
                                                <td>:</td>
                                                <td><strong>{event_id} / {event_category_id}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Size Jersey </td>
                                                <td>:</td>
                                                <td><strong>{event_jersey_id}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Biaya Pendaftaran </td>
                                                <td>:</td>
                                                <td><strong>{moneyFormat(event_cost)}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Status </td>
                                                <td>:</td>
                                                <td><strong>{status}</strong></td>
                                            </tr>
                                        </table>
                                        <hr />
                                        {
                                            status === 'PENDING' ? (
                                                <>
                                                    Silahkan lakukan pembayaran dalam waktu 1x24 dengan cara Bank Transfer pada info rekening dibawah ini:
                                                    <table className="">
                                                        <tr>
                                                            <td>Nama Bank </td>
                                                            <td>:</td>
                                                            <td><strong>BNI</strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td>No. Rekening </td>
                                                            <td>:</td>
                                                            <td><strong>1861459138</strong></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Atas Nama </td>
                                                            <td>:</td>
                                                            <td><strong>Ibu Rizky Amaliyah Syamsul</strong></td>
                                                        </tr>
                                                    </table>
                                                    <hr />

                                                    Tata Cara Transfer :
                                                    <ol>
                                                        <ul>
                                                            <li>Pilih Menu Transaksi Lainnya pada bagian kanan bawah.</li>
                                                            <li>Pilih Bank Tujuan Bank BNI</li>
                                                            <li>Masukkan No rekening Bank <strong>BNI</strong> A.N <strong>Ibu Rizky Amaliyah Syamsul</strong></li>
                                                            <li>Masukkan Nominal Jumlah Uang yang di transfer ditambah 3 digit terakhir ID Registrasi Anda. Nominal yang harus Anda transfer adalah <strong className="text-danger">{moneyFormat(event_cost + parseInt(invoice.substring(invoice.length - 3)))}</strong></li>
                                                            <li>Masukkan Nomor Referensi ID Registrasi Peserta <strong>({invoice})</strong> untuk memudahkan pengecekan data transfer peserta</li>
                                                            <li>Setelah selesai melakukan transfer pembayaran, kirim bukti transfer Anda ke email <strong>info@otban5-events.com</strong> atau melalui WhatsApp ke Nomor +62 888-0474-8600</li>
                                                            <li>Silakan cek <strong className="text-danger">email masuk dan folder spam</strong> pada alamat email yang Anda daftarkan untuk menunggu konfirmasi pendaftaran.</li>
                                                        </ul>


                                                    </ol>
                                                    <form onSubmit={updateMember}>
                                                        <div className="mb-3">
                                                            <label className="form-label fw-bold">INVOICE</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={invoice}
                                                                onChange={(e) => setInvoice(e.target.value)}
                                                                placeholder="Enter Invoice"
                                                                readOnly
                                                            />
                                                            {errors.invoice && (
                                                                <div className="text-danger">{errors.invoice[0]}</div>
                                                            )}
                                                        </div>

                                                        <div className="mb-3">
                                                            <label className="form-label fw-bold">Upload Bukti Pembayaran</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                accept="image/*"
                                                                onChange={(e) => setPayment_receipt(e.target.files[0])}
                                                            />
                                                            {errors.payment_receipt && (
                                                                <div className="text-danger">{errors.payment_receipt[0]}</div>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <button type="submit" className="btn btn-md btn-primary me-2" disabled={loading}>
                                                                {loading ? 'Sending...' : 'Submit'}
                                                            </button>
                                                            <button type="reset" className="btn btn-md btn-warning">
                                                                <i className="fa fa-redo"></i> Reset
                                                            </button>
                                                        </div>
                                                    </form>
                                                </>
                                            ) : status === 'PAID' || status === 'PAID-REG' ? (
                                                <>
                                                    <a className="btn btn-success" target="_blank" href={`https://api.otban5-events.com/api/public/event-members-pdf/${invoice}`}>Download Konfirmasi Peserta</a>
                                                </>
                                            ) : (
                                                <></>
                                            )
                                        }


                                    </div>

                                </div>
                            </div>
                        </div>
                    ) : (

                        <div className="alert alert-info text-center">
                            {
                                invoiceParam ? (
                                    <p className="text-danger">Maaf, Nomor Invoice "<strong>{invoiceParam}</strong>" Tidak Ditemukan! </p>
                                ) : (
                                    <p>Masukan Nomor Invoice</p>
                                )
                            }

                        </div>
                    )
                }

            </div>
        </LayoutWeb>
    );
}
