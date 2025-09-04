import React, { useState } from "react";
import API from "../api/api";

const UploadForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    patient_name: "",
    patient_id: "",
    scan_type: "RGB",
    region: "Frontal"
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!file) {
      setMessage("Please select an image file.");
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      data.append("patient_name", form.patient_name);
      data.append("patient_id", form.patient_id);
      data.append("scan_type", form.scan_type);
      data.append("region", form.region);
      data.append("image", file);

      const res = await API.post("/scans", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage("Upload successful!");
      if (onSuccess) onSuccess(res.data);
      // reset form partially
      setForm({ patient_name: "", patient_id: "", scan_type: "RGB", region: "Frontal" });
      setFile(null);
      setPreview(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Upload Patient Scan</h2>
      {message && <div className="info">{message}</div>}

      <form onSubmit={submit}>
        <input
          name="patient_name"
          value={form.patient_name}
          placeholder="Patient Name"
          onChange={handleChange}
          required
        />

        <input
          name="patient_id"
          value={form.patient_id}
          placeholder="Patient ID"
          onChange={handleChange}
          required
        />

        <label>
          Scan Type
          <input
            name="scan_type"
            value={form.scan_type}
            onChange={handleChange}
            placeholder="RGB"
            required
          />
        </label>

        <label>
          Region
          <select name="region" value={form.region} onChange={handleChange}>
            <option>Frontal</option>
            <option>Upper Arch</option>
            <option>Lower Arch</option>
          </select>
        </label>

        <label>
          Scan Image (JPG/PNG)
          <input type="file" accept="image/*" onChange={handleFile} required />
        </label>

        {preview && (
          <div style={{ marginTop: 8 }}>
            <strong>Preview:</strong>
            <div>
              <img src={preview} alt="preview" style={{ maxWidth: "100%", marginTop: 8 }} />
            </div>
          </div>
        )}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Uploading..." : "Upload Scan"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
