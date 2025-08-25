export default function LatestBookings() {
  const bookings = [
    { name: "Avinash Kr", date: "5 Oct 2024", status: "Pending" },
    { name: "GreatStack", date: "26 Sep 2024", status: "Cancelled" },
    { name: "GreatStack", date: "25 Sep 2024", status: "Completed" },
    { name: "GreatStack", date: "23 Sep 2024", status: "Completed" },
  ];

  return (
    <div className="w-[90%] sm:w-[80%] mx-auto bg-white shadow rounded-lg p-6 sm: mt-10">

      <h3 className="text-lg font-semibold mb-4">
        <i class="bi bi-card-checklist px-2 text-blue-800 text-2xl"></i>Latest
        Bookings
      </h3>
      <hr />
      <ul className="space-y-3">
        {bookings.map((b, i) => (
          <li key={i} className="flex justify-between items-center  pb-2">
            <div>
              <p className="font-medium">{b.name}</p>
              <p className="text-sm text-gray-500">Booking on {b.date}</p>
            </div>
            <span
              className={`text-sm font-medium ${
                b.status === "Completed"
                  ? "text-green-600"
                  : b.status === "Cancelled"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {b.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
