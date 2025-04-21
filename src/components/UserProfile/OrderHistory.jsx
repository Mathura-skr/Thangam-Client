import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "../../utils/axios";

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      try {
        if (!user?.userId) return;

        const [orderRes, productRes] = await Promise.all([
          axios.get(`/api/orders/user/${user.userId}`),
          axios.get("/api/products"),
        ]);

        const productMap = {};
        for (const prod of productRes.data) {
          productMap[prod.id] = prod;
        }

        setProductsMap(productMap);
        setOrders(orderRes.data);
      } catch (err) {
        console.error("Failed to load order history:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndProducts();
  }, [user]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Failed to load orders.</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const product = productsMap[order.product_id];

            return (
              <div
                key={order.id}
                className="border rounded p-4 bg-white shadow-sm space-y-2"
              >
                <div className="font-semibold text-lg text-gray-800">
                  Order #{order.id} - <span className="capitalize">{order.status}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Date: {new Date(order.created_at).toLocaleDateString()}
                </div>

                {product ? (
                  <div className="text-sm">
                    <strong>Product:</strong> {product.name} <br />
                    <strong>Brand:</strong> {product.brand} <br />
                    <strong>Qty:</strong> {order.unit} <br />
                    <strong>Price per unit:</strong> LKR.{parseFloat(product.price).toFixed(2)} <br />
                    <strong>Total:</strong> LKR.{parseFloat(order.total_price).toFixed(2)}
                  </div>
                ) : (
                  <div className="text-sm text-red-500">Product info not found.</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
