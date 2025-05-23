import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDelivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});

  // Fetch deliveries on mount
  useEffect(() => {
    axios.get('/api/admin-delivery')
      .then(res => setDeliveries(res.data))
      .catch(err => console.error('Error fetching deliveries:', err));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setStatusUpdates(prev => ({ ...prev, [id]: newStatus }));
  };

  const updateStatus = (id) => {
    const status = statusUpdates[id];
    if (!status) return;

    axios.patch(`/api/admin-delivery/${id}/status`, { status })
      .then(res => {
        setDeliveries(prev =>
          prev.map(del => (del._id === id ? res.data : del))
        );
        alert('Status updated successfully');
      })
      .catch(err => {
        console.error('Error updating status:', err);
        alert('Failed to update status');
      });
  };

  return (
    <nav className="p-6 bg-gray-900 text-white min-h-screen font-[Poppins,sans-serif]">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2 text-blue-200">
        Admin Panel - Manage Deliveries
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-700 text-sm">
          <thead className="bg-gray-800 text-left">
            <tr>
              <th className="border border-gray-600 px-4 py-3">Order ID</th>
              <th className="border border-gray-600 px-4 py-3">Delivery Person</th>
              <th className="border border-gray-600 px-4 py-3">Address</th>
              <th className="border border-gray-600 px-4 py-3">Items</th>
              <th className="border border-gray-600 px-4 py-3">Status</th>
              <th className="border border-gray-600 px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map(delivery => (
              <tr key={delivery._id} className="hover:bg-gray-800 transition duration-150">
                <td className="border border-gray-700 px-4 py-3">
                  {delivery.orderId?.orderNumber || delivery.orderId?.customerName || delivery.orderId?._id || 'N/A'}
                </td>
                <td className="border border-gray-700 px-4 py-3">{delivery.deliveryPerson}</td>
                <td className="border border-gray-700 px-4 py-3">{delivery.deliveryAddress}</td>
                <td className="border border-gray-700 px-4 py-3">
                      {Array.isArray(delivery.items) && delivery.items.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {delivery.items.map((item, index) => (
                            <li key={index}>
                              {item.name} × {item.quantity}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        'No items'
                      )}
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  <select
                    className="bg-gray-700 text-white px-2 py-1 rounded"
                    value={statusUpdates[delivery._id] || delivery.status}
                    onChange={(e) => handleStatusChange(delivery._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  <button
                    onClick={() => updateStatus(delivery._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </nav>
  );
}
