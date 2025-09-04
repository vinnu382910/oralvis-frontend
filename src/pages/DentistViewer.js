import React, { useEffect, useState } from "react";
import API from "../api/api";
import ScanList from "../components/ScanList";

const DentistViewer = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setErr("");
      setLoading(true);
      try {
        const res = await API.get("/scans");
        setScans(res.data || []);
      } catch (e) {
        setErr(e.response?.data?.message || "Failed to fetch scans");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Dentist - Scan Viewer</h2>
      {err && <div className="error">{err}</div>}
      {loading ? <p>Loading scans...</p> : <ScanList scans={scans} />}
    </div>
  );
};

export default DentistViewer;
