//import hook useState from react
import { useState } from "react";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function VideosCreate(props) {
    //state
    const [image, setImage] = useState("");
    const [video, setVideo] = useState("");
    const [caption, setCaption] = useState("");

    //state errors
    const [errors, setErrors] = useState([]);

    //state loading
    const [loading, setLoading] = useState(false);

    //token from cookies
    const token = Cookies.get("token");

    //function "storeVideo"
    const storeVideo = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("video", video); // Pastikan video disertakan
        formData.append("caption", caption);

        setLoading(true);

        try {
            const response = await Api.post("/api/admin/videos", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "multipart/form-data",
                },
            });

            toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
            });

            document.getElementById("imageFile").value = "";
            document.getElementById("videoFile").value = "";

            props.fetchData();
        } catch (error) {
            setErrors(error.response ? error.response.data : ["An error occurred"]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-body">
                <form onSubmit={storeVideo}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Image Thumbnail</label>
                        <input
                            type="file"
                            id="imageFile"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    {errors.image && (
                        <div className="alert alert-danger">{errors.image[0]}</div>
                    )}

                    <div className="mb-3">
                        <label className="form-label fw-bold">Video</label>
                        <input
                            type="file"
                            id="videoFile"
                            className="form-control"
                            accept="video/*"
                            onChange={(e) => setVideo(e.target.files[0])}
                        />
                    </div>
                    {errors.video && (
                        <div className="alert alert-danger">{errors.video[0]}</div>
                    )}

                    <div className="mb-3">
                        <label className="form-label fw-bold">Caption</label>
                        <input
                            type="text"
                            className="form-control"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Enter Title Video"
                        />
                    </div>
                    {errors.caption && (
                        <div className="alert alert-danger">{errors.caption[0]}</div>
                    )}

                    <div>
                        <button type="submit" className="btn btn-md btn-primary me-2" disabled={loading}>
                            <i className="fa fa-save"></i> {loading ? "Uploading..." : "Upload"}
                        </button>
                        <button type="reset" className="btn btn-md btn-warning" disabled={loading}>
                            <i className="fa fa-redo"></i> Reset
                        </button>
                    </div>

                    {loading && <p className="text-info">Uploading... Please wait.</p>}
                </form>
            </div>
        </div>
    );
}
