import React, { useEffect, useState } from "react";
import { GET_ALL_PAID } from "../../api/api";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

export default function OrderPage() {
    const [order, setOrder] = useState([])
    const getAllPaidOrders = () => {
        GET_ALL_PAID().then((res) => {
            setOrder(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getAllPaidOrders();
    }, []);
    const navigate = useNavigate()
    return (
        <div className="bg-gray-100">
            <div className="flex justify-center items-center py-5 bg-gray-100">
                {order.length == 0 ?

                    <div className="flex flex-col items-center">
                        <img
                            src="/assets/images/empty-order.png"
                            alt="Empty Cart"
                            className="w-[400px] h-[400px] object-contain"
                        />
                        <p className="text-gray-500 mt-4">You have not any order in your cart.</p>
                    </div> :
                    order.map((f, i) => {
                        localStorage.setItem('orderID', f.id)
                        return (
                            <div className="bg-white shadow-lg rounded-lg p-6 w-[600px]">
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={f.items[0].product.image}
                                            alt="Apple Watch"
                                            className="w-16 h-16 object-cover"
                                        />
                                        <div>
                                            <h2 className="text-xl font-semibold">#{f.order_number}</h2>
                                            <p className="text-gray-500">{f.items[0].product.name}</p>
                                        </div>
                                    </div>

                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mt-4">
                                    <div>
                                        <p className="font-semibold">Order Date</p>
                                        <p>{moment(f.creadAt).format('MMMM Do YYYY')}</p>
                                    </div>

                                    <div className="col-span-2">
                                        <p className="font-semibold">Address</p>
                                        <p>{f.address} , {f.city} , {f.state} , {f.pincode}</p>
                                    </div>
                                </div>
                                <div className="border-t mt-4 pt-4">
                                    <div className="text-[#f0686a] font-semibold border-b pb-2">Order History</div>
                                    <div className="mt-4">
                                        <div className="relative border-l-4 border-[#f0686a] pl-6 space-y-6">
                                            {f.history.map((l, i) => {
                                                // if (l.status === 'DELIVERED') {
                                                //     navigate('/review-rating')
                                                // }
                                                const deliveryDate = moment(l.timestamp).add(7, "days").format("MMMM Do YYYY");

                                                return (
                                                    <div key={i} className="relative flex gap-4">
                                                        {/* Circle Indicator */}
                                                        <div className="absolute -left-[38px] w-6 h-6 flex items-center justify-center rounded-full text-white text-sm font-bold bg-[#f0686a]">
                                                            {i + 1}
                                                        </div>

                                                        {/* Order Details */}
                                                        <div className="bg-white p-4 shadow-md rounded-lg w-full">
                                                            <p className="font-semibold"> {l.status}</p>
                                                            <p className="text-sm text-gray-500">Order Date: {moment(l.timestamp).format("MMMM Do YYYY")}</p>
                                                            <p className="text-sm text-gray-500">{l.status !== 'PLACED' ? l.details : ''}</p>
                                                            <p className="text-sm text-gray-500">Estimated Delivery: {deliveryDate}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}


            </div>
            <div className="flex justify-end py-5 max-w-[66%]">
                <Link to={'/'}>
                    <button
                        className={`bg-[#f0686a] text-white py-2 ease-linear rounded-lg w-[200px] text-center flex justify-center items-center text-xl hover:border-[#f0686a] border-[1px] hover:text-[#f0686a] hover:bg-white font-semibold transition-all `}>
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
}
