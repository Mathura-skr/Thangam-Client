import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateOrder() {
    const navigate = useNavigate();
    const isPaid = true;

    // Sample Order Items List
    const [orderItems, setOrderItems] = useState([
        {
            product: "123",
            name: "Product 1",
            image: "https://via.placeholder.com/65",
            price: 500,
            quantity: 2
        },
        {
            product: "456",
            name: "Product 2",
            image: "https://via.placeholder.com/65",
            price: 1000,
            quantity: 1
        }
    ]);

    const submitHandler = (e) => {
        e.preventDefault();
        toast.success("Order status updated!");
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/5">
                <Sidebar />
            </div>
            <div className="w-full md:w-4/5 p-4">
                <Fragment>
                    <div className="flex flex-col md:flex-row justify-around">
                        <div className="w-full md:w-3/4 p-4 bg-white shadow rounded">
                            <h1 className="text-2xl font-bold my-4">Order # 001</h1>
                            <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
                            <p><b>Name:</b> Mathura</p>
                            <p><b>Phone:</b> 0771234567</p>
                            <p className="mb-4"><b>Address:</b> No:05, Main Road, Trincomalee</p>
                            <p><b>Amount:</b> Rs.2000</p>
                            <hr className="my-4" />
                            <h4 className="text-lg font-semibold mb-2">Payment</h4>
                            <p className={isPaid ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                                {isPaid ? 'PAID' : 'NOT PAID'}
                            </p>
                            <h4 className="text-lg font-semibold my-4">Order Status:</h4>
                            <p><b>Delivered</b></p>
                            <h4 className="text-lg font-semibold my-4">Order Items:</h4>
                            <hr className="my-4" />
                            <div className="my-1">
                                {orderItems.map((item, index) => (
                                    <div key={index} className="flex flex-col md:flex-row items-center my-5">
                                        <div className="w-16 h-16 md:w-20 md:h-20">
                                            <img src={item.image} alt={item.name} className="w-full h-full" />
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <Link to={`/product/${item.product}`} className="text-blue-500 hover:underline">{item.name}</Link>
                                        </div>
                                        <div className="text-gray-700 font-semibold mt-2 md:mt-0">${item.price}</div>
                                        <div className="text-gray-700 mt-2 md:mt-0">{item.quantity} Piece(s)</div>
                                    </div>
                                ))}
                            </div>
                            <hr className="my-4" />
                        </div>
                        <div className="w-full md:w-1/4 mt-5 p-4 bg-white shadow rounded">
                            <h4 className="text-lg font-semibold my-4">Order Status</h4>
                            <div className="mb-4">
                                <select className="w-full p-2 border rounded">
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                            <button onClick={submitHandler} className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
                                Update Status
                            </button>
                        </div>
                    </div>
                </Fragment>
            </div>
        </div>
    );
}
