import React, { useEffect, useContext, useState } from "react";
import { CartItem } from "../../components/CartItem/CartItem";
import {
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/authContext";
import axios from "../../utils/axios";
import Navigation from "../../components/Navbar/Navigation";
import Swal from "sweetalert2";

const Cart = ({ checkout }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (parseFloat(item.price) || 0) * (item.unit || 0),
    0
  );
  const totalItems = cartItems.reduce((acc, item) => acc + (item.unit || 0), 0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const SHIPPING = 5.55;
  const TAXES = 5;

  const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      window.scrollTo({ top: 0, behavior: "instant" });
      try {
        if (!user) {
          Swal.fire({
            icon: 'warning',
            title: 'Login Required',
            text: 'You need to login to view your cart.',
          }).then(() => {
            navigate("/login");
          });
          return;
        }
        const response = await axios.get(`/api/cart/user/${user.userId}`);
        setCartItems(response.data);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Failed to fetch cart items.");
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load your cart items.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user, navigate]);

  const handleRemoveCartItem = async (cartId) => {
    try {
      await axios.delete(`/api/cart/${cartId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.cart_id !== cartId)
      );
      toast.success("Product removed from cart");
    } catch (err) {
      console.error("Error removing product from cart:", err);
      toast.error("Error removing product from cart");
    }
  };

  const handleUpdateCartItem = async (cartId, updatedFields) => {
    try {
      const response = await axios.put(`/api/cart/${cartId}`, updatedFields);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cart_id === cartId ? { ...item, ...updatedFields } : item
        )
      );
    } catch (err) {
      console.error("Error updating cart item:", err);
      toast.error("Error updating cart item");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto p-4 flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="container flex flex-col mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Typography variant="h4" className="mb-6 font-bold pb-5">
            {checkout ? "Order Summary" : "Your Shopping Cart"}
          </Typography>

          {error ? (
            <Typography color="error" className="text-center py-8">
              {error}
            </Typography>
          ) : Array.isArray(cartItems) && cartItems.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Cart Items */}
              <div className="flex flex-col gap-3 md:w-2/3 ">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.cart_id + item.id}
                    id={item.cart_id}
                    productId={item.id}
                    image_url={item.image_url}
                    title={item.name}
                    category={item.category || "N/A"}
                    brand={item.brand || "N/A"}
                    description={item.description || ""}
                    price={parseFloat(item.price)}
                    unit={item.unit}
                    stock={item.stock}
                    onRemove={handleRemoveCartItem}
                    onUpdate={handleUpdateCartItem}
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="md:w-1/3">
                <div className="bg-gray-50 p-4 rounded-lg sticky top-4">
                  <Typography variant="h6" className="font-semibold mb-4">
                    Order Summary
                  </Typography>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Typography>Subtotal</Typography>
                      <Typography>{currencyFormat.format(subtotal)}</Typography>
                    </div>

                    {checkout && (
                      <>
                        <div className="flex justify-between">
                          <Typography>Shipping</Typography>
                          <Typography>{currencyFormat.format(SHIPPING)}</Typography>
                        </div>
                        <div className="flex justify-between">
                          <Typography>Taxes</Typography>
                          <Typography>{currencyFormat.format(TAXES)}</Typography>
                        </div>
                        <hr className="my-2" />
                      </>
                    )}

                    <div className="flex justify-between font-semibold">
                      <Typography>Total</Typography>
                      <Typography>
                        {currencyFormat.format(
                          subtotal + (checkout ? SHIPPING + TAXES : 0)
                        )}
                      </Typography>
                    </div>

                    {!checkout && (
                      <Typography variant="body2" className="text-gray-500">
                        Shipping and taxes calculated at checkout
                      </Typography>
                    )}

                    {!checkout && (
                      <Button
                        fullWidth
                        variant="contained"
                        className="bg-black hover:bg-gray-800 mt-4 py-3"
                        component={Link}
                        to="/checkout"
                      >
                        Proceed to Checkout
                      </Button>
                    )}

                    {!checkout && (
                      <div className="text-center mt-2">
                        <Link
                          to="/"
                          className="text-sm text-gray-600 hover:text-black"
                        >
                          or Continue Shopping
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Typography variant="h6" className="mb-4">
                Your cart is empty
              </Typography>
              <Button
                variant="contained"
                className="bg-black hover:bg-gray-800"
                component={Link}
                to="/"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;