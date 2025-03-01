import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DELETE_CART, GET_CART, ORDER_PLACED } from "../../api/api";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCartData();
  }, []);

  const handleQuantityChange = (id, type) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    DELETE_CART(id)
      .then(() => {
        getCartData();
      })
      .catch((err) => console.log(err));
  };

  const getCartData = () => {
    GET_CART()
      .then((res) => {
        if (res.data.length === 0) {
          setCart([]);
        } else {
          setCart(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCheckout = () => {
    const items = cart.map((f) => ({
      product: f.product.id,
      quantity: f.quantity,
      url: "",
    }));

    ORDER_PLACED({ items })
      .then((res) => {
        if (res.status === true) {
          navigate("/checkout");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="w-full max-w-4xl text-end mb-3">
        <a href="/" className="mt-4 w-full text-black hover:underline text-end">
          Continue shopping
        </a>
      </div>

      {/* Show Empty Cart Image if Cart is Empty */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <img
            src="/assets/images/empty-cart-removebg-preview.png" // Change this path to your empty cart image
            alt="Empty Cart"
            className="w-[600px] h-[400px] object-contain"
          />
          <p className="text-gray-500 text-lg mt-4">Your cart is empty!</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Product</th>
                <th className="text-left p-3">Quantity</th>
                <th className="text-left p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3 flex items-center">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}${item?.product?.image}`}
                      alt={item?.product?.name}
                      className="w-16 h-16 object-contain mr-4"
                    />
                    <div>
                      <p className="font-bold">{item?.product?.name}</p>
                      <p className="text-gray-500">Rs. {item?.product?.price}</p>
                    </div>
                  </td>
                  <td className="p-3 flex items-center">
                    <button
                      className="px-2 py-1 border rounded-lg bg-gray-200 hover:bg-gray-300"
                      onClick={() => handleQuantityChange(item?.id, "decrease")}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="px-2 py-1 border rounded-lg bg-gray-200 hover:bg-gray-300"
                      onClick={() => handleQuantityChange(item.id, "increase")}
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                  <td className="p-3">Rs. {item.product.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 text-right">
            <p className="text-lg font-semibold">
              Estimated Total: Rs.{" "}
              {cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-[#f0686a] text-white px-6 py-2 rounded-lg hover:bg-white border-[1px] border-[#f0686a] transition-all ease-in hover:text-[#f0686a]"
            >
              Check out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
