import React, { useState, useEffect } from "react";

// Import service API
import Api from "../../services/Api";

// Import component alert
import AlertDataEmpty from "../general/AlertDataEmpty";

// Import component loading
import Loading from "../general/Loading";

export default function Footer() {
  const [sponsors, setSponsors] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);

  // Fetch data sponsors
  const fetchDataSponsors = async () => {
    setLoadingPages(true);

    try {
      const response = await Api.get("/api/public/sponsors");
      setSponsors(response.data.data);
    } catch (error) {
      console.error("Error fetching sponsors data:", error);
    } finally {
      setLoadingPages(false);
    }
  };

  useEffect(() => {
    fetchDataSponsors();
  }, []);

  return (
    <footer>
      
      <div className="container-fluid footer-bottom">
        <div className="row p-3">
          <div className="text-center text-white font-weight-bold">
            Copyright © 2024 Otban V - Makassar. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
