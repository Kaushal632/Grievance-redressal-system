import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewComplaints.css";

const NewComplaints = ({ token }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/grievances/new", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched new complaints:", response.data);
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setError("Failed to load complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/grievances/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update UI immediately
      setComplaints((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: newStatus } : c
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="new-complaints-page">
      <h2>New Complaints</h2>

      {loading ? (
        <p>Loading complaints...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : complaints.length === 0 ? (
        <p>No new complaints found.</p>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint._id} className="complaint-card">
            <p><b>ID:</b> {complaint._id}</p>
            <p><b>Name:</b> {complaint.name}</p>
            <p><b>Category:</b> {complaint.category}</p>
            <p><b>Sentiment:</b> {complaint.sentiment}</p>
            <p><b>Description:</b> {complaint.description}</p>
            <p><b>Status:</b> {complaint.status}</p>

            <button
              onClick={() => handleUpdateStatus(complaint._id, "In Progress")}
            >
              Mark In Progress
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default NewComplaints;

