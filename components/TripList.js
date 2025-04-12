"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import TripItem from "./TripItem";
import { parseCookies } from "nookies";

const TripsList = () => {
  const [trips, setTrips] = useState([]);
  const apiBaseUrl = "https://wander.6ip.it/api";

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies.authToken;
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(`${apiBaseUrl}/trips/open`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const handleDelete = async (tripId) => {
    try {
      const cookies = parseCookies();
      const token = cookies.authToken;
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete(`${apiBaseUrl}/trips/${tripId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
          trips.map((trip) => <TripItem key={trip._id} trip={trip} onDelete={handleDelete} />)
        ) : (
          <p className="text-gray-600">No trips available</p>
        )}
      </div>
    </div>
  );
};

export default TripsList;
