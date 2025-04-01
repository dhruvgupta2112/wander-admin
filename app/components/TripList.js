// TripsList.js
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import TripItem from "./TripItem";

const TripsList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  // Function to fetch trips from the API
  const fetchTrips = async () => {
    try {
        // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.get("https://wander-backend-production.up.railway.app/api/trips/open", {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      });
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  // Function to handle delete request
  const handleDelete = async (tripId) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      // Make the DELETE request with Authorization header
      await axios.delete(`https://wander-backend-production.up.railway.app/api/trips/${tripId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
        },
      });

      // Remove the deleted trip from the UI
      setTrips(trips.filter((trip) => trip._id !== tripId));
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">All Trips</h1>
      <div className="space-y-4">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <TripItem key={trip._id} trip={trip} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-gray-600">No trips available</p>
        )}
      </div>
    </div>
  );
};

export default TripsList;
