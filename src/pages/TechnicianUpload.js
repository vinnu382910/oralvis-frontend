import React, { useState } from "react";
import UploadForm from "../components/UploadForm";

const TechnicianUpload = () => {
  const [last, setLast] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <UploadForm onSuccess={(scan) => setLast(scan)} />
      {last && (
        <div className="form-container" style={{ marginTop: 16 }}>
          <h3>Last Uploaded Scan</h3>
          <div>
            <strong>{last.patient_name}</strong> (ID: {last.patient_id})<br />
            {last.scan_type}, {last.region}<br />
            Uploaded: {last.upload_date}
            <div style={{ marginTop: 8 }}>
              <img src={last.image_url} alt="last-scan" style={{ maxWidth: "100%" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicianUpload;
