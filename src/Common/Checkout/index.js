import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Checkout = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "TO DO PLAQUE",
      price: 520,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row">
        {/* Left Section - Form */}
        <div className="w-full md:w-2/3 pr-6">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border rounded-lg" placeholder="Enter your email" />
          </div>
          
          <h2 className="text-xl font-semibold mt-4 mb-2">Delivery</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input type="text" className="p-2 border rounded-lg" placeholder="First name" />
            <input type="text" className="p-2 border rounded-lg" placeholder="Last name" />
          </div>
          <input type="text" className="w-full p-2 border rounded-lg mb-4" placeholder="Address" />
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input type="text" className="p-2 border rounded-lg" placeholder="City" />
            <input type="text" className="p-2 border rounded-lg" placeholder="State" />
            <input type="text" className="p-2 border rounded-lg" placeholder="PIN Code" />
          </div>
          <input type="text" className="w-full p-2 border rounded-lg mb-4" placeholder="Phone" />
          
          <h2 className="text-xl font-semibold mt-4 mb-2">Payment</h2>
          <div className="p-4 border rounded-lg bg-gray-100 mb-4">
            <p className="text-gray-700">All transactions are secure and encrypted.</p>
            <div className="flex items-center gap-2 mt-2">
              <input type="radio" name="payment" checked className="w-5 h-5" />
              <span>Razorpay Secure (UPI, Cards, Wallets, NetBanking)</span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mt-4 mb-2">Billing Address</h2>
          <div className="p-4 border rounded-lg bg-gray-100 mb-4">
            <div className="flex items-center gap-2">
              <input type="radio" name="billing" checked className="w-5 h-5" />
              <span>Same as shipping address</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="radio" name="billing" className="w-5 h-5" />
              <span>Use a different billing address</span>
            </div>
          </div>
          
          <button className="w-full bg-yellow-400 text-white px-6 py-2 rounded-lg hover:bg-yellow-500">Pay now</button>
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full md:w-1/3 border-l pl-6 mt-6 md:mt-0">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-gray-500">Rs. {item.price}</p>
              </div>
              <p className="text-gray-700">x {item.quantity}</p>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <p className="text-lg font-semibold">Total: Rs. {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
