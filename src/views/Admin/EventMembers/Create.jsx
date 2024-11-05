//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate } from "react-router-dom";

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

export default function EventMemberCreate() {
    //title page
    document.title = "Create Event Member";

    //navigata
    const navigate = useNavigate();

    //define state for form
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
    const [filteredCategories, setFilteredCategories] = useState([]);
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

    const handlePaymentChange = (e) => {
        const selectedCategoryId = e.target.value;
        setEvent_category_id(selectedCategoryId);

        const selectedCategory = event_categories.find(
            (category) => category.id === parseInt(selectedCategoryId)
        );

        if (selectedCategory) {
            setPayment(selectedCategory.cost);
        } else {
            setPayment('');
        }
    };

    const handleEventChange = (e) => {
        const selectedEventId = e.target.value;
        setEvent_id(selectedEventId);

        const categories = event_categories.filter(category => category.event_id === parseInt(selectedEventId));
        setFilteredCategories(categories);
        if (categories.length > 0) {
            setEvent_category_id(categories[0].id); // Auto-select the first category
            setPayment(categories[0].cost);
        } else {
            setEvent_category_id(''); // Clear the category if no categories match
        }
    };

    const handleCategoryChange = (e) => {
        setEvent_category_id(e.target.value);
    };

    //useEffect

    useEffect(() => {
        fetchDataEvents();
        fetchDataEventCategories();
        fetchDataEventJerseys();
    }, []);

    //function "storeMember"
    const storeMember = async (e) => {
        e.preventDefault();

        // Disable form and show loading message
        setLoading(true);

        try {
            // Sending data
            const response = await Api.post(
                "/api/admin/event-members",
                {
                    // Data
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
                    name_hp_emergency: name_hp_emergency,
                    no_hp_emergency: no_hp_emergency,
                    payment: payment,
                    payment_receipt: payment_receipt,
                    status: status,
                    blood_type: blood_type,
                    medical_history: medical_history
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
                duration: 4000,
            });

            // Redirect
            navigate("/admin/event-members");
        } catch (error) {
            if (error.response) {
                // Check if the status code is 500
                if (error.response.status === 500) {
                    alert(error.response.data.message);
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
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body">
                                    <h6>
                                        <i className="fa fa-folder"></i> Create Member Event
                                    </h6>
                                    <hr />

                                    <form onSubmit={storeMember}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">NIK / No. Kartu Pelajar</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={nik}
                                                onChange={(e) => setNik(e.target.value)}
                                                placeholder="Masukan NIK / No Kartu Pelajar"
                                            />
                                        </div>
                                        {errors.nik && (
                                            <div className="alert alert-danger">{errors.nik[0]}</div>
                                        )}
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
                                                Community / Sponsor
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
                                                type="number"
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
                                            <label className="form-label fw-bold">Nama Kontak HP Darurat</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={name_hp_emergency}
                                                onChange={(e) => setName_hp_emergency(e.target.value)}
                                                placeholder="Masukan Nama Kontak HP Darurat"
                                            />
                                        </div>
                                        {errors.name_hp_emergency && (
                                            <div className="alert alert-danger">{errors.name_hp_emergency[0]}</div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                No HP Emergency
                                            </label>
                                            <input
                                                type="number"
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
                                            <label className="form-label fw-bold">Events</label>
                                            <select
                                                className="form-select"
                                                value={event_id}
                                                onChange={handleEventChange}
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
                                                onChange={handlePaymentChange}
                                            >
                                                <option value="">-- Select Category Event --</option>
                                                {filteredCategories.map((event_category) => (
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
                                        )}
                                        <div className="mb-3">
                                            {/* <label className="form-label fw-bold">Payment</label> */}
                                            <input
                                                type="hidden"
                                                className="form-control"
                                                value={payment}
                                                readOnly
                                            />
                                        </div>
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
                                                        disabled={event_jersey.sisa === 0}
                                                    >
                                                        {event_jersey.size} {event_jersey.sisa === 0 ? '(Out of Stock)' : ''}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors.event_jersey_id && (
                                            <div className="alert alert-danger">
                                                {errors.event_jersey_id[0]}
                                            </div>
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
                                            <div className="alert alert-danger">{errors.blood_type[0]}</div>
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
                                                <div className="alert alert-danger">{errors.medical_history[0]}</div>
                                            )}
                                        <div className="mb-3">
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
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Status</label>
                                            <select
                                                className="form-select"
                                                name="status"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="">-- Select Status --</option>
                                                <option value={'PAID'}>PAID</option>
                                                <option value={'PENDING'}>PENDING</option>
                                            </select>
                                        </div>
                                        {errors.status && (
                                            <div className="alert alert-danger">
                                                {errors.status[0]}
                                            </div>
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
                    </div>
                </div>
            </main>
        </LayoutAdmin>
    );
}