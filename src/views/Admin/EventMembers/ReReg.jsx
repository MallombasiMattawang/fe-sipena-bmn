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

//money format
import moneyFormat from "../../../utils/MoneyFormat";

export default function EventMembersRereg() {
    //title page
    document.title = "Re-reg Member Events";

    //navigata
    const navigate = useNavigate();

    //get ID from parameter URL
    const { id } = useParams();

    //define state for form
    const [re_register, setRe_register] = useState("");
    const [re_hp_register, setRe_hp_register] = useState("");

    const [event_id, setEvent_id] = useState("");
    const [nik, setNik] = useState("");
    const [name_hp_emergency, setName_hp_emergency] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [community, setCommunity] = useState("");
    const [name_bib, setName_bib] = useState("");
    const [email, setEmail] = useState("");
    const [no_whatsapp, setNo_whatsapp] = useState("");
    const [event_jersey_id, setEvent_jersey_id] = useState("");
    const [event_category_id, setEvent_category_id] = useState("");
    const [gender, setGender] = useState("");
    const [no_hp_emergency, setNo_hp_emergency] = useState("");
    const [payment, setPayment] = useState("");
    const [payment_receipt, setPayment_receipt] = useState("");
    const [status, setStatus] = useState("");
    const [blood_type, setBlood_type] = useState("");
    const [medical_history, setMedical_history] = useState("");
    // const [no_member, setNo_member] = useState("");
    // const [kode_paid, setKode_paid] = useState("");
    const [errors, setErros] = useState([]);
    const [loading, setLoading] = useState(false);

    const [events, setEvents] = useState([]);
    const [event_categories, setEvent_categories] = useState([]);
    const [event_jerseys, setEvent_jerseys] = useState([]);
    //token from cookies
    const token = Cookies.get("token");

    //function "fetchDataEvents"
    const fetchDataEvents = async () => {
        await Api.get("/api/admin/events-all", {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set response data to state "categories"
            setEvents(response.data.data);
        });
    };

    //function "fetchDataEventCategories"
    const fetchDataEventCategories = async () => {
        await Api.get("/api/admin/event-categories-all", {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set response data to state "categories"
            setEvent_categories(response.data.data);
        });
    };

    //function "fetchDataEventJerseys"
    const fetchDataEventJerseys = async () => {
        await Api.get("/api/admin/event-jerseys-all", {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set response data to state "categories"
            setEvent_jerseys(response.data.data);
        });
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setEvent_category_id(selectedCategoryId);

        const selectedCategory = event_categories.find(
            (category) => category.id === parseInt(selectedCategoryId)
        );

        // if (selectedCategory) {
        //     setPayment(selectedCategory.cost);
        // } else {
        //     setPayment('');
        // }
    };
    const formatNumber = (value) => {
        if (!value) return '';
        // Pastikan value adalah string
        const stringValue = value.toString();
        return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handlePaymentChange = (e) => {
        // Hapus karakter non-digit dan pastikan hanya angka yang tersisa
        const rawValue = e.target.value.replace(/\D/g, '');
        setPayment(rawValue);
    };


    //function fetchDataMember
    const fetchDataMember = async () => {
        await Api.get(`/api/admin/event-members/${id}`, {
            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set response data to state
            setNik(response.data.data.nik);
            setName_hp_emergency(response.data.data.name_hp_emergency);
            setFirst_name(response.data.data.first_name);
            setLast_name(response.data.data.last_name);
            setEvent_id(response.data.data.event_id);
            setCommunity(response.data.data.community);
            setName_bib(response.data.data.name_bib);
            setEmail(response.data.data.email);
            setNo_whatsapp(response.data.data.no_whatsapp);
            setEvent_jersey_id(response.data.data.event_jersey_id);
            setEvent_category_id(response.data.data.event_category_id);
            setGender(response.data.data.gender);
            setNo_hp_emergency(response.data.data.no_hp_emergency);
            setPayment(response.data.data.payment);
            setPayment_receipt(response.data.data.payment_receipt);
            setStatus(response.data.data.status);
            setBlood_type(response.data.data.blood_type);
            setMedical_history(response.data.data.medical_history);
            setRe_register(response.data.data.re_register);
            setRe_hp_register(response.data.data.re_hp_register);
        });
    };

    //useEffect
    useEffect(() => {
        //call function "fetchDataMember"
        fetchDataMember();
        fetchDataEvents();
        fetchDataEventCategories();
        fetchDataEventJerseys();
    }, []);

    //function "updateMember"
    const updateMember = async (e) => {
        e.preventDefault();

        // Disable form and show loading message
        setLoading(true);

        //sending data
        await Api.post(
            `/api/admin/event-members/${id}`,
            {
                //data
                event_id: event_id,
                nik: nik,
                first_name: first_name,
                last_name: last_name,
                community: community,
                name_bib: name_bib,
                email: email,
                no_whatsapp: no_whatsapp,
                event_jersey_id: event_jersey_id,
                event_category_id: event_category_id,
                gender: gender,
                no_hp_emergency: no_hp_emergency,
                name_hp_emergency: name_hp_emergency,
                payment: payment,
                payment_receipt: payment_receipt,
                blood_type: blood_type,
                medical_history: medical_history,
                status: 'PAID-REG',
                re_register: re_register,
                re_hp_register: re_hp_register,
                _method: "PUT",
            },
            {
                //header
                headers: {
                    //header Bearer + Token
                    Authorization: `Bearer ${token}`,
                    "content-type": "multipart/form-data",
                },
            }
        )
            .then((response) => {
                //show toast
                toast.success(response.data.message, {
                    position: "top-right",
                    duration: 4000,
                });

                //redirect
                navigate("/admin/event-members");
            })
            .catch((error) => {
                //set error message to state "errors"
                setErros(error.response.data);
                if (error.response.status === 500) {
                    alert(error.response.data.message);
                } else {
                    // Handle other errors
                    setErros(error.response.data || 'Something went wrong!');
                }
                setLoading(false);
            });
    };

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <Link
                                to="/admin/event-members"
                                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                                type="button"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="card border-0 rounded shadow-sm border-top-success">
                                        <div className="card-body">
                                            <h6>
                                                <i className="fa fa-folder"></i> Registrasi Ulang Member Event
                                            </h6>
                                            <hr />
                                            <form onSubmit={updateMember}>
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Status</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value='PAID-REG'
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        placeholder="Enter Re Register"
                                                        readOnly
                                                        required
                                                    />
                                                </div>
                                                {errors.status && (
                                                    <div className="alert alert-danger">
                                                        {errors.status[0]}
                                                    </div>
                                                )}
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        Nama Reg Register
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={re_register}
                                                        onChange={(e) => setRe_register(e.target.value)}
                                                        placeholder="Enter Re Register"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        Kontak Reg Register
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={re_hp_register}
                                                        onChange={(e) => setRe_hp_register(e.target.value)}
                                                        placeholder="Enter Kontak Re Register"
                                                        required
                                                    />
                                                </div>
                                                {/* <div className="mb-3">
                                                    <label className="form-label fw-bold text-danger">Payment</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formatNumber(payment)}
                                                        onChange={handlePaymentChange}
                                                        placeholder="Enter amount"
                                                        readOnly
                                                    />
                                                </div>
                                                {errors.payment && (
                                                    <div className="alert alert-danger">
                                                        {errors.payment[0]}
                                                    </div>
                                                )} */}
                                                {/* <div className="mb-3">
                                                    <label className="form-label fw-bold">Events</label>
                                                    <select
                                                        className="form-select"
                                                        value={event_id}
                                                        onChange={(e) => setEvent_id(e.target.value)}
                                                    >
                                                        <option value="">-- Select Event --</option>
                                                        {events.map((event) => (
                                                            <option value={event.id} key={event.id}>
                                                                {event.title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {errors.event_id && (
                                                    <div className="alert alert-danger">
                                                        {errors.event_id[0]}
                                                    </div>
                                                )}
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Category Event</label>
                                                    <select
                                                        className="form-select"
                                                        value={event_category_id}
                                                        onChange={handleCategoryChange}

                                                    >
                                                        <option value="">-- Select Category Event --</option>
                                                        {event_categories.map((event_category) => (
                                                            <option value={event_category.id} key={event_category.id}>
                                                                {event_category.name} / {moneyFormat(event_category.cost)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {errors.event_category_id && (
                                                    <div className="alert alert-danger">
                                                        {errors.event_category_id[0]}
                                                    </div>
                                                )} */}

                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Jersey</label>
                                                    <select
                                                        className="form-select"
                                                        value={event_jersey_id}
                                                        onChange={(e) => setEvent_jersey_id(e.target.value)}
                                                    >
                                                        <option value="">-- Pilih Jersey --</option>
                                                        {event_jerseys.map((event_jersey) => (
                                                            <option
                                                                value={event_jersey.id}
                                                                key={event_jersey.id}
                                                                disabled={event_jersey.stock === 0}
                                                            >
                                                                {event_jersey.size} {event_jersey.stock === 0 &&  event_jersey.id !== event_jersey_id ? '(Out of Stock)' : ''}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {errors.event_jersey_id && (
                                                    <div className="alert alert-danger">
                                                        {errors.event_jersey_id[0]}
                                                    </div>
                                                )}
                                                {/* <div className="mb-3">
                                                    <label className="form-label fw-bold">Payment Receipt</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        accept="image/*"
                                                        onChange={(e) => setPayment_receipt(e.target.files[0])}
                                                    />
                                                </div>
                                                {errors.payment_receipt && (
                                                    <div className="alert alert-danger">
                                                        {errors.payment_receipt[0]}
                                                    </div>
                                                )} */}
                                                <hr />
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        NIK/No.Kartu Pelajar
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={nik}
                                                        onChange={(e) => setNik(e.target.value)}
                                                        placeholder="Enter NIK"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={first_name}
                                                        onChange={(e) => setFirst_name(e.target.value)}
                                                        placeholder="Enter Full Name"
                                                    />
                                                </div>
                                                {errors.first_name && (
                                                    <div className="alert alert-danger">{errors.first_name[0]}</div>
                                                )}
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        Name BIB
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={name_bib}
                                                        onChange={(e) => setName_bib(e.target.value)}
                                                        placeholder="Enter Name BIB"
                                                    />
                                                </div>
                                                {errors.name_bib && (
                                                    <div className="alert alert-danger">{errors.name_bib[0]}</div>
                                                )}
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Gender</label>
                                                    <select
                                                        className="form-select"
                                                        value={gender}
                                                        onChange={(e) => setGender(e.target.value)}
                                                    >
                                                        <option value="">-- Select Gender --</option>
                                                        <option value={'L'}>
                                                            LAKI-LAKI
                                                        </option>
                                                        <option value={'P'}>
                                                            PEREMPUAN
                                                        </option>
                                                    </select>
                                                </div>
                                                {errors.gender && (
                                                    <div className="alert alert-danger">
                                                        {errors.gender[0]}
                                                    </div>
                                                )}

                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        Community
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={community}
                                                        onChange={(e) => setCommunity(e.target.value)}
                                                        placeholder="Enter Community"
                                                    />
                                                </div>
                                                {errors.community && (
                                                    <div className="alert alert-danger">{errors.community[0]}</div>
                                                )}

                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Enter Email"
                                                    />
                                                </div>
                                                {errors.email && (
                                                    <div className="alert alert-danger">{errors.email[0]}</div>
                                                )}

                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        No Whatsapp
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={no_whatsapp}
                                                        onChange={(e) => setNo_whatsapp(e.target.value)}
                                                        placeholder="Enter No Whatsapp"
                                                    />
                                                </div>
                                                {errors.no_whatsapp && (
                                                    <div className="alert alert-danger">{errors.no_whatsapp[0]}</div>
                                                )}

                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">
                                                        No HP Emergency
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={no_hp_emergency}
                                                        onChange={(e) => setNo_hp_emergency(e.target.value)}
                                                        placeholder="Enter No Hp Emergency"
                                                    />
                                                </div>
                                                {errors.no_hp_emergency && (
                                                    <div className="alert alert-danger">{errors.no_hp_emergency[0]}</div>
                                                )}
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Golongan Darah</label>
                                                    <select
                                                        className="form-select"
                                                        value={blood_type}
                                                        onChange={(e) => setBlood_type(e.target.value)}
                                                    >
                                                        <option value="">-- Pilih Golongan Darah --</option>
                                                        <option value={'A'}>A</option>
                                                        <option value={'B'}>B</option>
                                                        <option value={'AB'}>AB</option>
                                                        <option value={'O'}>O</option>
                                                    </select>
                                                </div>
                                                {errors.blood_type && (
                                                    <div className="text-danger">{errors.blood_type[0]}</div>
                                                )}
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Riwayat Penyakit <small><i>(Diisi Jika Memiliki)</i> </small> </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={medical_history}
                                                        onChange={(e) => setMedical_history(e.target.value)}
                                                        placeholder="Riwayat Penyakit"
                                                    />
                                                </div>
                                                {errors.medical_history && (
                                                    <div className="text-danger">{errors.medical_history[0]}</div>
                                                )}


                                                <div>
                                                    <button type="submit" className="btn btn-md btn-primary me-2" disabled={loading}>
                                                        {loading ? 'Sending...' : 'Submit'}
                                                    </button>
                                                    <button type="reset" className="btn btn-md btn-warning">
                                                        <i className="fa fa-redo"></i> Reset
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-md-5">
                                    <div className="card border-0 rounded shadow-sm border-top-success">
                                        <div className="card-body">
                                            <h6>
                                                <i className="fa fa-image"></i> Payment Receipt
                                            </h6>
                                            <hr />
                                            <div className="mb-3">
                                                <img
                                                    src={payment_receipt}
                                                    // width={"300px"}
                                                    className="rounded img-fluid"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
}