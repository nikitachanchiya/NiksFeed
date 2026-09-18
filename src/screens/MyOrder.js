import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {

        try {

            const email = localStorage.getItem('userEmail');

            console.log("User Email:", email);

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/auth/myOrderData`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        email: email
                    })
                }
            );

            const data = await response.json();

            console.log("My Order Response:", data);

            setOrderData(data);

        } catch (error) {

            console.error(
                "Error fetching orders:",
                error
            );

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

                    {orderData?.orderData?.order_data?.length > 0 ? (

                        orderData.orderData.order_data
                            .slice()
                            .reverse()
                            .map((order, index) => {

                                /*
                                 * Date is stored at index 0
                                 */
                                const orderDate = order[0]?.Order_date;

                                /*
                                 * Food items start from index 1
                                 */
                                const items = order.slice(1);

                                return (

                                    <div
                                        key={index}
                                        className='row'
                                    >

                                        {/* ORDER DATE */}

                                        <div className='col-12 mt-5'>

                                            <h5>

                                                Order Date:{" "}

                                                {orderDate
                                                    ? new Date(orderDate).toLocaleString(
                                                        "en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            second: "2-digit"
                                                        }
                                                    )
                                                    : "Date not available"
                                                }

                                            </h5>

                                            <hr />

                                        </div>


                                        {/* ORDER ITEMS */}

                                        {items.map((item, itemIndex) => (

                                            <div
                                                className='col-12 col-md-6 col-lg-3'
                                                key={itemIndex}
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
                                                            style={{
                                                                height: "38px"
                                                            }}
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

                            })

                    ) : (

                        <div className="mt-5">

                            <h4>
                                No orders found.
                            </h4>

                        </div>

                    )}

                </div>

            </div>

            <Footer />

        </div>

    );
}