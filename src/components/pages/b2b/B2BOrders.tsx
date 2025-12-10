import { useState } from 'react';
import { Eye, Download } from 'lucide-react';

export function B2BOrders() {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data - in production, this would come from backend
  const orders = [
    {
      id: 'ORD-001',
      orderNumber: 'PS-2024-001',
      date: '2024-12-05',
      items: [
        { name: 'SG Phoenix Bat', quantity: 10, price: 12499 },
        { name: 'Cricket Balls Set', quantity: 5, price: 2499 },
      ],
      totalAmount: 137480,
      status: 'delivered',
      notes: 'Urgent delivery required',
    },
    {
      id: 'ORD-002',
      orderNumber: 'PS-2024-002',
      date: '2024-12-07',
      items: [
        { name: 'Batting Gloves', quantity: 20, price: 1899 },
        { name: 'Batting Pads', quantity: 15, price: 3499 },
      ],
      totalAmount: 90465,
      status: 'processing',
      notes: '',
    },
    {
      id: 'ORD-003',
      orderNumber: 'PS-2024-003',
      date: '2024-12-09',
      items: [
        { name: 'MRF Genius Bat', quantity: 8, price: 18999 },
      ],
      totalAmount: 151992,
      status: 'pending',
      notes: 'Please confirm stock availability',
    },
  ];

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="mb-2">My Orders</h1>
        <p className="text-gray-600">View and track all your B2B orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            statusFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
          }`}
        >
          All Orders
        </button>
        <button
          onClick={() => setStatusFilter('pending')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            statusFilter === 'pending'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setStatusFilter('processing')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            statusFilter === 'processing'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
          }`}
        >
          Processing
        </button>
        <button
          onClick={() => setStatusFilter('shipped')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            statusFilter === 'shipped'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
          }`}
        >
          Shipped
        </button>
        <button
          onClick={() => setStatusFilter('delivered')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            statusFilter === 'delivered'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-300'
          }`}
        >
          Delivered
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="mb-1">Order #{order.orderNumber}</h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.date).toLocaleDateString('en-IN', { 
                      day: 'numeric',
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                  <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors" title="View Details">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors" title="Download Invoice">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-sm text-gray-600 mb-3">Order Items</h4>
              <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-gray-900">Total Amount</span>
                <span className="text-xl text-blue-600">
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {order.notes && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-900">
                  <strong>Notes:</strong> {order.notes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="mb-2">No orders found</h3>
          <p className="text-gray-600">No orders match the selected filter</p>
        </div>
      )}
    </div>
  );
}
