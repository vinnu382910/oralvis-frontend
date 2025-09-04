import React from "react";
import API from "../api/api";

const ScanList = ({ scans }) => {
  const downloadPDF = async (id) => {
    try {
      const res = await API.get(`/scans/${id}/pdf`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `scan-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to download PDF");
    }
  };

  if (!scans || scans.length === 0) {
    return <div className="list-container">No scans available.</div>;
  }

  return (
    <div className="list-container">
      <ul className="scan-grid">
        {scans.map((s) => (
          <li key={s.id} className="scan-card">
            <div className="scan-thumb">
              <img src={s.image_url} alt={`${s.patient_name}`} />
            </div>
            <div className="scan-meta">
              <div className="name">{s.patient_name} <small>({s.patient_id})</small></div>
              <div>{s.scan_type} • {s.region}</div>
              <div className="muted">Uploaded: {s.upload_date}</div>
              <div style={{ marginTop: 8 }}>
                <button className="btn small" onClick={() => window.open(s.image_url, "_blank")}>
                  View Full
                </button>
                <button className="btn small" onClick={() => downloadPDF(s.id)} style={{ marginLeft: 8 }}>
                  Download PDF
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScanList;
