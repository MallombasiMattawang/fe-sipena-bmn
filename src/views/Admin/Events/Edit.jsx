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

// quill CSS
import "react-quill/dist/quill.snow.css";

export default function EventsEdit() {
  //title page
  document.title = "Edit Events";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //define state for form
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [event_start, setEvent_start] = useState("");
  const [event_end, setEvent_end] = useState("");
  const [event_address, setEvent_address] = useState("");
  const [event_contact, setEvent_contact] = useState("");
  const [active, setActive] = useState("");
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");



  //function "fetchDataPost"
  const fetchDataPost = async () => {
    await Api.get(`/api/admin/events/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setTitle(response.data.data.title);
      setImage(response.data.data.image);
      setContent(response.data.data.content);
      setEvent_start(response.data.data.event_start);
      setEvent_end(response.data.data.event_end);
      setEvent_address(response.data.data.event_address);
      setEvent_contact(response.data.data.event_contact);
      setActive(response.data.data.active);
    });
  };

  //useEffect
  useEffect(() => {


    //call function "fetchDataPost"
    fetchDataPost();
  }, []);

  //function "updatePost"
  const updatePost = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("event_start", event_start);
    formData.append("event_end", event_end);
    formData.append("event_address", event_address);
    formData.append("event_contact", event_contact);
    formData.append("active", active);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/events/${id}`, formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/admin/events");
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
                to="/admin/events"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="row">
                <div className="col-md-8">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-body bg-dark">
                      <h6>
                        <i className="fa fa-pencil-alt"></i> Edit Event
                      </h6>
                      <hr />
                      <form onSubmit={updatePost}>
                        <div className="mb-3">
                          <label className="form-label fw-bold">Image</label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </div>
                        {errors.image && (
                          <div className="alert alert-danger">
                            {errors.image[0]}
                          </div>
                        )}
                        <div className="mb-3">
                          <label className="form-label fw-bold">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Title Post"
                          />
                        </div>
                        {errors.title && (
                          <div className="alert alert-danger">
                            {errors.title[0]}
                          </div>
                        )}


                        <div className="mb-3">
                          <label className="form-label fw-bold">Event Start</label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            value={event_start}
                            onChange={(e) => setEvent_start(e.target.value)}
                          />
                        </div>
                        {errors.event_start && (
                          <div className="alert alert-danger">
                            {errors.event_start[0]}
                          </div>
                        )}

                        <div className="mb-3">
                          <label className="form-label fw-bold">Event End</label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            value={event_end}
                            onChange={(e) => setEvent_end(e.target.value)}
                          />
                        </div>
                        {errors.event_end && (
                          <div className="alert alert-danger">
                            {errors.event_end[0]}
                          </div>
                        )}

                        <div className="mb-3">
                          <label className="form-label fw-bold">Content</label>
                          <ReactQuill
                            theme="snow"
                            rows="5"
                            value={content}
                            onChange={(content) => setContent(content)}
                          />
                        </div>
                        {errors.content && (
                          <div className="alert alert-danger">
                            {errors.content[0]}
                          </div>
                        )}
                        <div className="mb-3">
                          <label className="form-label fw-bold">Event Address</label>
                          <ReactQuill
                            theme="snow"
                            rows="5"
                            value={event_address}
                            onChange={(event_address) => setEvent_address(event_address)}
                          />
                        </div>
                        {errors.event_address && (
                          <div className="alert alert-danger">
                            {errors.event_address[0]}
                          </div>
                        )}

                        <div className="mb-3">
                          <label className="form-label fw-bold">Event Contacts</label>
                          <ReactQuill
                            theme="snow"
                            rows="5"
                            value={event_contact}
                            onChange={(event_contact) => setEvent_contact(event_contact)}
                          />
                        </div>
                        {errors.event_contact && (
                          <div className="alert alert-danger">
                            {errors.event_contact[0]}
                          </div>
                        )}

                        <div className="mb-3">
                          <label className="form-label fw-bold">Active ?</label>
                          <select
                            className="form-select"
                            value={active}
                            onChange={(e) => setActive(e.target.value)}
                          >
                            <option value="">-- Select option --</option>
                            <option value={'YES'}>
                              YES
                            </option>
                            <option value={'NO'}>
                              NO
                            </option>
                          </select>
                        </div>
                        {errors.active && (
                          <div className="alert alert-danger">
                            {errors.active[0]}
                          </div>
                        )}

                        <div>
                          <button
                            type="submit"
                            className="btn btn-md btn-primary me-2"
                          >
                            <i className="fa fa-save"></i> Update
                          </button>
                          <button type="reset" className="btn btn-md btn-warning">
                            <i className="fa fa-redo"></i> Reset
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-body bg-dark">
                      <h6>
                        <i className="fa fa-image"></i> Banner Event
                      </h6>
                      <hr />
                      <div className="mb-3">
                        <img
                          src={image}
                          // width={"300px"}
                          className="rounded img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
