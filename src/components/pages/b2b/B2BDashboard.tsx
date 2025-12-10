import { Link } from 'react-router-dom';
import { Package, ShoppingCart, User, FileText } from 'lucide-react';

export function B2BDashboard() {
  // Mock data - in production, this would come from backend
  const stats = {
    totalOrders: 24,
    pendingOrders: 3,
    deliveredOrders: 18,
    totalSpent: 245000,
  };

  const recentOrders = [
    { id: 'ORD-001', date: '2024-12-05', items: 12, status: 'Delivered', amount: 45000 },
    { id: 'ORD-002', date: '2024-12-07', items: 8, status: 'Processing', amount: 32000 },
    { id: 'ORD-003', date: '2024-12-09', items: 15, status: 'Pending', amount: 58000 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="mb-2">B2B Dashboard</h1>
        <p className="text-gray-600">Welcome back! Manage your orders and account</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Orders</span>
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl">{stats.totalOrders}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Pending Orders</span>
            <ShoppingCart className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-3xl">{stats.pendingOrders}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Delivered</span>
            <FileText className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl">{stats.deliveredOrders}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Spent</span>
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl">₹{(stats.totalSpent / 1000).toFixed(0)}K</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/b2b/create-order"
          className="bg-blue-600 text-white rounded-lg p-6 hover:bg-blue-700 transition-colors"
        >
          <ShoppingCart className="w-8 h-8 mb-3" />
          <h3 className="mb-1 text-white">Create New Order</h3>
          <p className="text-sm text-blue-100">Place a new bulk order</p>
        </Link>

        <Link
          to="/b2b/orders"
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all"
        >
          <Package className="w-8 h-8 mb-3 text-gray-700" />
          <h3 className="mb-1">View All Orders</h3>
          <p className="text-sm text-gray-600">Track and manage orders</p>
        </Link>

        <Link
          to="/b2b/profile"
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all"
        >
          <User className="w-8 h-8 mb-3 text-gray-700" />
          <h3 className="mb-1">My Profile</h3>
          <p className="text-sm text-gray-600">Update account details</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2>Recent Orders</h2>
            <Link to="/b2b/orders" className="text-blue-600 hover:text-blue-700 text-sm">
              View All →
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm text-gray-600">Order ID</th>
                <th className="text-left py-3 px-6 text-sm text-gray-600">Date</th>
                <th className="text-left py-3 px-6 text-sm text-gray-600">Items</th>
                <th className="text-left py-3 px-6 text-sm text-gray-600">Amount</th>
                <th className="text-left py-3 px-6 text-sm text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <Link to={`/b2b/orders`} className="text-blue-600 hover:text-blue-700">
                      {order.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {new Date(order.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{order.items} items</td>
                  <td className="py-4 px-6 text-gray-900">
                    ₹{order.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
