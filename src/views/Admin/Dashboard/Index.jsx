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

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

//register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  //title page
  document.title = "Dashboard - Otban5 BMN";

  // define state for filters
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [locations, setLocations] = useState([]);



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

  // Prepare data for charts category
  const categoryData = {
    labels: categories.map((category) => category.nama_kategori),
    datasets: [
      {
        label: "Jumlah Aset",
        data: categories.map((category) => category.aset_count),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for charts lokasi
  const lokasiData = {
    labels: locations.map((location) => location.nama_lokasi),
    datasets: [
      {
        label: "Jumlah Aset",
        data: locations.map((location) => location.aset_count),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for charts status
  const statusData = {
    labels: statuses.map((status) => status.nama_status),
    datasets: [
      {
        label: "Jumlah Aset",
        data: statuses.map((status) => status.aset_count),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for charts kondisi
  const kondisiData = {
    labels: conditions.map((condition) => condition.nama_kondisi),
    datasets: [
      {
        label: "Jumlah Aset",
        data: conditions.map((condition) => condition.aset_count),
        backgroundColor: [
          // "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(255, 99, 132, 0.5)",
        ],
        borderColor: [
          // "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mt-5">
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <div className="card bg-dark mb-4 border-0 shadow-sm">
                <div className="card-header">
                  <h6>Kategori Barang/Aset</h6>
                </div>
                <div className="card-body bg-dark">
                  <Bar data={categoryData} />
                  <hr />
                  <table className="table table-striped">
                    {categories.map((category) => (
                      <tr>
                        <td className="bg-dark">{category.nama_kategori}</td>
                        <td className="text-end bg-dark">{category.aset_count}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-6">
              <div className="card bg-dark mb-4 border-0 shadow-sm">
                <div className="card-header">
                  <h6>Lokasi Barang/Aset</h6>
                </div>
                <div className="card-body bg-dark">
                  <Bar data={lokasiData} />
                  <hr />
                  <table className="table table-striped">
                    {locations.map((location) => (
                      <tr>
                        <td className="bg-dark">{location.nama_lokasi}</td>
                        <td className="text-end bg-dark">{location.aset_count}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-6">
              <div className="card bg-dark mb-4 border-0 shadow-sm">
                <div className="card-header">
                  <h6>Kondisi Aset</h6>
                </div>
                <div className="card-body bg-dark">
                  <div className="row">
                    <div className="col-md-6">
                      <Pie data={kondisiData} />
                    </div>
                    <div className="col-md-6">
                      <table className="table">
                        {conditions.map((condition) => (
                          <tr>
                            <td className="bg-dark">{condition.nama_kondisi}</td>
                            <td className="text-end bg-dark">{condition.aset_count}</td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-6">
              <div className="card bg-dark mb-4 border-0 shadow-sm">
                <div className="card-header">
                  <h6>Status Aset</h6>
                </div>
                <div className="card-body bg-dark">
                <Bar data={statusData} />
                  <hr />
                  <table className="table">
                    {statuses.map((status) => (
                      <tr>
                        <td className="bg-dark">{status.nama_status}</td>
                        <td className="text-end bg-dark">{status.aset_count}</td>
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
