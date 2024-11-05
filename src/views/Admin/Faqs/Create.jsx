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

//import react Quill
import ReactQuill from "react-quill";

// quill CSS
import "react-quill/dist/quill.snow.css";

export default function FaqsCreate() {
    //title page
    document.title = "Create Event Faqs";

    //navigata
    const navigate = useNavigate();

    //define state for form
    const [event_id, setEvent_id] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [cost, setCost] = useState("");
    const [errors, setErros] = useState([]);

    const [events, setEvents] = useState([]);

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
            //set response data to state "faqs"
            setEvents(response.data.data);
        });
    };

    //useEffect
    useEffect(() => {
        fetchDataEvents();
    }, []);

    //function "storeCategory"
    const storeCategory = async (e) => {
        e.preventDefault();

        //sending data
        await Api.post(
            "/api/admin/event-faqs",
            {
                //data
                event_id: event_id,
                question: question,
                answer: answer,
                cost: cost
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
                navigate("/admin/event-faqs");
            })
            .catch((error) => {
                //set error message to state "errors"
                setErros(error.response.data);
            });
    };

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <Link
                                to="/admin/event-faqs"
                                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                                type="button"
                            >
                                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
                            </Link>
                            <div className="card border-0 rounded shadow-sm border-top-success">
                                <div className="card-body bg-dark">
                                    <h6>
                                        <i className="fa fa-folder"></i> Create Faq Event
                                    </h6>
                                    <hr />
                                    <form onSubmit={storeCategory}>
                                        <div className="mb-3">
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
                                            <div className="alert alert-danger">{errors.event_id[0]}</div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">
                                                Question ?
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={question}
                                                onChange={(e) => setQuestion(e.target.value)}
                                                placeholder="Enter Question"
                                            />
                                        </div>
                                        {errors.question && (
                                            <div className="alert alert-danger">{errors.question[0]}</div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Answer</label>
                                            <ReactQuill
                                                theme="snow"
                                                rows="5"
                                                value={answer}
                                                onChange={(answer) => setAnswer(answer)}
                                            />
                                        </div>
                                        {errors.answer && (
                                            <div className="alert alert-danger">{errors.answer[0]}</div>
                                        )}

                                        <div>
                                            <button
                                                type="submit"
                                                className="btn btn-md btn-primary me-2"
                                            >
                                                <i className="fa fa-save"></i> Save
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