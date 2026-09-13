import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        try {
            console.log(localStorage.getItem('userEmail'));

            const response = await fetch(
                "http://localhost:5001/api/auth/myOrderData",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem('userEmail')
                    })
                }
            );

            const data = await response.json();

            console.log("My Order Response:", data);

            setOrderData(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />

            <div className='container'>
                <div className='row'>

                    {orderData?.orderData?.order_data?.map((order, index) => {

                        const orderDate = order[order.length - 1];

                        const items = order.slice(0, -1);

                        return (
                            <div key={index} className='row'>

                                <div className='col-12 mt-5'>
                                    <h5>
                                        Order Date:{" "}
                                        {new Date(orderDate).toLocaleString()}
                                    </h5>
                                    <hr />
                                </div>

                                {items.map((item) => (
                                    <div
                                        className='col-12 col-md-6 col-lg-3'
                                        key={item.id}
                                    >
                                        <div
                                            className="card mt-3"
                                            style={{
                                                width: "16rem",
                                                maxHeight: "360px"
                                            }}
                                        >

                                            {item.img && (
                                                <img
                                                    src={item.img}
                                                    className="card-img-top"
                                                    alt={item.name}
                                                    style={{
                                                        height: "120px",
                                                        objectFit: "fill"
                                                    }}
                                                />
                                            )}

                                            <div className="card-body">

                                                <h5 className="card-title">
                                                    {item.name}
                                                </h5>

                                                <div
                                                    className='container w-100 p-0'
                                                    style={{ height: "38px" }}
                                                >
                                                    <span className='m-1'>
                                                        Qty: {item.qty}
                                                    </span>

                                                    <span className='m-1'>
                                                        {item.size}
                                                    </span>

                                                    <div className='d-inline ms-2 h-100 fs-5'>
                                                        ₹{item.price}/-
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                ))}

                            </div>
                        );
                    })}

                    {!orderData?.orderData?.order_data && (
                        <div className="mt-5">
                            <h4>No orders found.</h4>
                        </div>
                    )}

                </div>
            </div>

            <Footer />
        </div>
    );
}