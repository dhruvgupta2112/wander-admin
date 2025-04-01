// TripItem.js
"use client";

const TripItem = ({ trip, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={trip.coverPhoto}
          alt={trip.title}
          className="w-20 h-20 rounded-lg object-cover mr-4"
        />
        <div className="flex-grow">
          <h2 className="text-lg font-semibold">{trip.title}</h2>
          <p className="text-sm text-gray-600">Host: {trip.host.name}</p>
          <p className="text-sm text-gray-600">Email: {trip.host.email}</p>
          <p className="text-sm text-gray-700 mt-2">{trip.description}</p>
        </div>
      </div>
      {/* Delete button */}
      <button
        onClick={() => onDelete(trip._id)}
        className="ml-4 text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default TripItem;
