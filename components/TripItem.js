"use client";

const TripItem = ({ trip, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4">
      <img 
        src={trip.coverPhoto} 
        alt={trip.title} 
        className="w-24 h-24 sm:w-20 sm:h-20 rounded-lg object-cover"
      />
      <div className="flex-grow text-center sm:text-left">
        <h2 className="text-lg font-semibold">{trip.title}</h2>
        <p className="text-sm text-gray-600">Host: {trip.host.name}</p>
        <p className="text-sm text-gray-600">Email: {trip.host.email}</p>
        <p className="text-sm text-gray-700 mt-2">{trip.description}</p>
      </div>
      <button
        onClick={() => onDelete(trip._id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full sm:w-auto"
      >
        Delete
      </button>
    </div>
  );
};

export default TripItem;
