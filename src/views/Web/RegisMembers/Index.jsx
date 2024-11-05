//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate } from "react-router-dom";

//import layout web
import LayoutWeb from "../../../layouts/Web";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

//money format
import moneyFormat from "../../../utils/MoneyFormat";

//modal popup
import ModalPopup from "../../../components/general/ModalPopup";

export default function WebRegisMember() {
    //title page
    document.title = "Registrasi Event Member";

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
    const [termsAccepted, setTermsAccepted] = useState(false);


    const [events, setEvents] = useState([]);
    const [event_categories, setEvent_categories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [event_jerseys, setEvent_jerseys] = useState([]);


    const [paymentInfo, setPaymentInfo] = useState({ amount: '', bankAccount: '' });

    const [validationError, setValidationError] = useState(false);




    //token from cookies
    const token = Cookies.get("token");

    //function "fetchDataEvents"
    const fetchDataEvents = async () => {
        await Api.get("/api/public/events-all", {
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
        await Api.get("/api/public/event-categories-all", {
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
        await Api.get("/api/public/event-jerseys-all", {
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
                "/api/public/event-members-store",
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
                    // payment: payment,
                    // payment_receipt: payment_receipt,
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
            navigate(`/regis-confirm?invoice=${response.data.data.invoice}`);
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


  //state for modal
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => setShowModal(false);

    return (
        <LayoutWeb>
        
            <main>
            {/* <ModalPopup show={showModal} handleClose={handleCloseModal} /> */}
                <div className="container mt-4 mb-3">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body bg-dark">
                                    <h6>
                                        <i className="fa fa-pencil"></i> Registrasi Event
                                    </h6>
                                    <hr />
                                    <form onSubmit={storeMember}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">NIK / No. Kartu Pelajar</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={nik}
                                                        onChange={(e) => setNik(e.target.value)}
                                                        placeholder="Masukan NIK / No Kartu Pelajar"
                                                    />

                                                    {errors.nik && (
                                                        <div className="text-danger">{errors.nik[0]}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Nama Lengkap</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={first_name}
                                                        onChange={(e) => setFirst_name(e.target.value)}
                                                        placeholder="Masukan Nama Lengkap"
                                                    />

                                                    {errors.first_name && (
                                                        <div className="text-danger">{errors.first_name[0]}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Nama BIB</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={name_bib}
                                                        onChange={(e) => setName_bib(e.target.value)}
                                                        placeholder="Masukan Nama BIB"
                                                    />

                                                    {errors.name_bib && (
                                                        <div className="text-danger">{errors.name_bib[0]}</div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Jenis Kelamin</label>
                                                    <select
                                                        className="form-select"
                                                        value={gender}
                                                        onChange={(e) => setGender(e.target.value)}
                                                    >
                                                        <option value="">-- Pilih Kategori --</option>
                                                        <option value={'L'}>LAKI-LAKI</option>
                                                        <option value={'P'}>PEREMPUAN</option>
                                                    </select>
                                                    {errors.gender && (
                                                        <div className="text-danger">{errors.gender[0]}</div>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Komunitas <small><i>(Diisi Jika Memiliki)</i> </small></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={community}
                                                        onChange={(e) => setCommunity(e.target.value)}
                                                        placeholder="Masukan Komunitas"
                                                    />
                                                    {errors.community && (
                                                        <div className="text-danger">{errors.community[0]}</div>
                                                    )}

                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Enter Email"
                                                    />
                                                    {errors.email && (
                                                        <div className="text-danger">{errors.email[0]}</div>
                                                    )}

                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">No Whatsapp</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={no_whatsapp}
                                                        onChange={(e) => setNo_whatsapp(e.target.value)}
                                                        placeholder="Masukan No Whatsapp"
                                                    />
                                                    {errors.no_whatsapp && (
                                                        <div className="text-danger">{errors.no_whatsapp[0]}</div>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Nama Kontak HP Darurat</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={name_hp_emergency}
                                                        onChange={(e) => setName_hp_emergency(e.target.value)}
                                                        placeholder="Masukan Nama Kontak HP Darurat"
                                                    />
                                                    {errors.name_hp_emergency && (
                                                        <div className="text-danger">{errors.name_hp_emergency[0]}</div>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">No HP Darurat</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={no_hp_emergency}
                                                        onChange={(e) => setNo_hp_emergency(e.target.value)}
                                                        placeholder="Masukan No HP Darurat"
                                                    />
                                                    {errors.no_hp_emergency && (
                                                        <div className="text-danger">{errors.no_hp_emergency[0]}</div>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Events</label>
                                                    <select
                                                        className="form-select"
                                                        value={event_id}
                                                        onChange={handleEventChange}
                                                    >
                                                        <option value="">-- Pilih Event --</option>
                                                        {events.map((event) => (
                                                            <option value={event.id} key={event.id}>
                                                                {event.title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.event_id && (
                                                        <div className="text-danger">{errors.event_id[0]}</div>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Kategori Event</label>
                                                    <select
                                                        className="form-select"
                                                        value={event_category_id}
                                                        onChange={handlePaymentChange}
                                                    >
                                                        <option value="">-- Pilih Kategori Event --</option>
                                                        {filteredCategories.map((event_category) => (
                                                            <option value={event_category.id} key={event_category.id}>
                                                                {event_category.name} / {moneyFormat(event_category.cost)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.event_category_id && (
                                                        <div className="text-danger">{errors.event_category_id[0]}</div>
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
                                                </div>
                                            </div>
                                            <div className="col-md-4">
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
                                                    {errors.event_jersey_id && (
                                                        <div className="text-danger">{errors.event_jersey_id[0]}</div>
                                                    )}

                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">



                                            <div className="col-md-4">
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
                                                    {errors.blood_type && (
                                                        <div className="text-danger">{errors.blood_type[0]}</div>
                                                    )}

                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label fw-bold">Riwayat Penyakit <small><i>(Diisi Jika Memiliki)</i> </small> </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={medical_history}
                                                        onChange={(e) => setMedical_history(e.target.value)}
                                                        placeholder="Riwayat Penyakit"
                                                    />
                                                    {errors.medical_history && (
                                                        <div className="text-danger">{errors.medical_history[0]}</div>
                                                    )}

                                                </div>
                                            </div>

                                        </div>


                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="alert alert-info">
                                                    <div className="form-check mb-3">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="termsCheckbox"
                                                            checked={termsAccepted}
                                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                                        />
                                                        <label className="form-check-label" htmlFor="termsCheckbox">
                                                            <p>Dengan ini saya telah membaca serta menyetujui syarat dan ketentuan yang berlaku dibawah ini.</p>
                                                            {/* <p>Pelepasan dan pembebasan tanggung jawab</p> */}
                                                            <ol>
                                                                <li> secara sukarela ingin berpartisipasi dalam acara obu5 run 2024</li>
                                                                <li> Mengakui bahwa event/kegiatan atletik ini dapat menguji batas fisik dan mental seseorang serta memiliki resiko kematian, luka luka dan kerugian harta benda, resiko meliputi yg disebabkan oleh medan, fasilitas, suhu, cuaca, kondisi pelari, kurangnya hidrasi, peralatan, lalulintas kendaraan dan tindakan orang lain. </li>
                                                                <li> Memahami bahwa semua resiko yg timbul sebagai resiko selama berlangsungnya event akan menjadi tanggung jawab saya pribadi sebagai peserta. </li>
                                                                <li> Membebaskan penyelenggara atau panitia atas segala kerugian dan kerusakan yang timbul sehubungan dengan event ini, kecuali dalam hal kerugian dan kerusakan tersebut timbul dari kelalaian yang disengaja oleh penyelenggara atau panitia. </li>
                                                                <li> Menanggung semua resiko partisipasi dalam event ini (Force Majeoure) </li>
                                                                <li> Mengakui bahwa pelepasan dan pembebasan tanggung jawab akan digunakan oleh panitia dan pendukung event bahwa hal itu akan mengatur tindakan dan tanggungjawab saya di acara ini</li>
                                                                <li> Bahwa saya sehat secara fisik, mental dan telah cukup umur (berusia minimal 15 thn pada saat mendaftar? Serta cukup terlatih untuk berpartisipasi dalam acara tersebut)</li>
                                                                <li> Kegiatan ini murni diadakan oleh Kantor Otoritas Bandar Udara Wilayah V - Makassar dalam rangka Safety Campaign. Kegiatan ini tidak ada unsur kegiatan politik</li>
                                                                <li>Peserta dilarang membawa dan memakai atribut Partai Politik</li>
                                                            </ol>
                                                        </label>
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="btn btn-md btn-primary me-2"
                                                    disabled={loading || !termsAccepted}
                                                >
                                                    {loading ? 'Sending...' : 'Submit'}
                                                </button>

                                                <button type="reset" className="btn btn-md btn-warning">
                                                    <i className="fa fa-redo"></i> Reset
                                                </button>
                                            </div>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </LayoutWeb>
    );
}