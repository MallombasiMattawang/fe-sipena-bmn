//import hook
import { useState, useEffect } from "react";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import service api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import MoneyFormat
import moneyFormat from "../../../utils/MoneyFormat";

//import Link
import { Link } from "react-router-dom";

export default function Dashboard() {
  //title page
  document.title = "Dashboard - Otban5 BMN";

  // define state for filters
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [locations, setLocations] = useState([]);

  //init state
  const [countEvents, setCountEvent] = useState(0);
  const [countEventcategories, setSountEventcategories] = useState(0);
  const [countMembers, setCountMembers] = useState(0);
  const [countMembersPending, setCountMembersPending] = useState(0);
  const [countMembersCek, setCountMembersCek] = useState(0);
  const [countMembersPaid, setCountMembersPaid] = useState(0);
  const [countMembersPaidReg, setCountMembersPaidReg] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [eventMemberMan, setEventMemberMan] = useState(0);
  const [eventMemberMale, setEventMemberMale] = useState(0);
  const [eventMemberSakit, setEventMemberSakit] = useState(0);
  const [eventMemberSehat, setEventMemberSehat] = useState(0);


  //token from cookies
  const token = Cookies.get("token");

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

    fetchFilterData();
  }, []);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mt-5">
          <div className="row">
            <div className="col-xl-12 col-md-12">
              <div className="card bg-dark mb-4 border-0 shadow-sm">
                <div className="card-header">
                  <h6>Kategori Aset</h6>
                </div>
                <div className="card-body">
                  <table className="table">  
                    {categories.map((category) => (
                      <tr>
                        <td>{category.nama_kategori}</td>
                        <td className="text-end">{category.aset_count}</td>
                      </tr>
                    ))}
                  </table>
                </div>                
              </div>
            </div>

            <div className="col-xl-12 col-md-12">
              <div className="card bg-dark mb-4 border-0 shadow-sm">
                <div className="card-header">
                  <h6>Kondisi Aset</h6>
                </div>
                <div className="card-body">
                  <table className="table">  
                    {conditions.map((condition) => (
                      <tr>
                        <td>{condition.nama_kondisi}</td>
                        <td className="text-end">{condition.aset_count}</td>
                      </tr>
                    ))}
                  </table>
                </div>                
              </div>
            </div>

            <div className="col-xl-12 col-md-12">
              <div className="card bg-dark mb-4 border-0 shadow-sm">
                <div className="card-header">
                  <h6>Status Aset</h6>
                </div>
                <div className="card-body">
                  <table className="table">  
                    {statuses.map((status) => (
                      <tr>
                        <td>{status.nama_status}</td>
                        <td className="text-end">{status.aset_count}</td>
                      </tr>
                    ))}
                  </table>
                </div>                
              </div>
            </div>

            <div className="col-xl-12 col-md-12">
              <div className="card bg-dark mb-4 border-0 shadow-sm">
                <div className="card-header">
                  <h6>Lokasi/Ruangan Aset</h6>
                </div>
                <div className="card-body">
                  <table className="table table-striped">  
                    {locations.map((location) => (
                      <tr>
                        <td>{location.nama_lokasi}</td>
                        <td className="text-end">{location.aset_count}</td>
                      </tr>
                    ))}
                  </table>
                </div>                
              </div>
            </div>


            
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
