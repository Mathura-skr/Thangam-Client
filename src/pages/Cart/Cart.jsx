import React, { useContext, useState } from 'react';
import { useCart } from '../../context/CartContext';
import KhaltiCheckout from 'khalti-checkout-web';

const Cart = () => {
  const { cart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('cod');

  const khaltiConfig = {
    publicKey: "YOUR_KHALTI_PUBLIC_KEY",
    productIdentity: "1234567890",
    productName: "Product Name",
    productUrl: "http://example.com/product",
    eventHandler: {
      onSuccess(payload) {
        console.log(payload);
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0), 0);
  };

  const handleCheckout = () => {
    if (window.confirm("Are you sure you want to make a purchase?")) {
      if (selectedPayment === 'khalti') {
        handleKhaltiPayment();
      } else {
        console.log('Processing Cash on Delivery...');
      }
    }
  };

  const handleKhaltiPayment = () => {
    const checkout = new KhaltiCheckout(khaltiConfig);
    checkout.show({ amount: 1000 });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center p-6">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md" onClick={() => window.location.href = '/products'}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            {cart.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-4 p-4 border-b border-gray-200">
                <img src={item.image} alt={item.alt} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-semibold text-gray-800">{item.label}</h3>
                  <p className="text-gray-600">₨ {item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal:</span>
              <span>₨ {calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-800 font-bold border-t border-gray-200 pt-3 mt-3">
              <span>Total:</span>
              <span>₨ {calculateTotal().toFixed(2)}</span>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Payment Method</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedPayment === 'khalti' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`} onClick={() => setSelectedPayment('khalti')}>
                  <img src={require('../../assets/images/khalti_logo.png')} alt="Khalti" className="w-10 h-10 object-contain" />
                  <span className="text-gray-800">Khalti</span>
                </div>
                <div className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedPayment === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`} onClick={() => setSelectedPayment('cod')}>
                  <img src={require('../../assets/images/COD.png')} alt="COD" className="w-10 h-10 object-contain" />
                  <span className="text-gray-800">Cash on Delivery</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-3 rounded-md mt-6 hover:bg-green-700 transition-all" onClick={handleCheckout}>
              {selectedPayment === 'khalti' ? 'Pay with Khalti' : 'Place Order (COD)'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
