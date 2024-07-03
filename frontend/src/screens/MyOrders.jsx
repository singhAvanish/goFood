import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrders() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });
      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);



return (
    <div>
      <Navbar />
      <div className="container" style={{ minHeight: "100vh", position: "relative" }}>
        <div className="row">
          {Object.keys(orderData).length === 0 || !orderData.order_data ? (
            <div style={{textAlign:"center"}}>
              <h1>No orders</h1>
            </div>
          ) : (
            Object.values(orderData).slice(0).reverse().map((order, orderIndex) => (
              <div key={orderIndex}>
                {order.order_data &&
                  order.order_data.map((entry, entryIndex) => (
                    <div key={entryIndex}>
                      {entry[1]?.date && (
                        <div className="m-auto mt-5">
                          {new Date(entry[1].date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          <hr />
                        </div>
                      )}
                      {entry.slice(1).map(
                        (item, itemIndex) =>
                          !item.Order_date && (
                            <div className="row" key={itemIndex}>
                              <div className="col-12 col-md-6 col-lg-3">
                                <div
                                  className="card mt-3"
                                  style={{
                                    width: "16rem",
                                    maxHeight: "360px",
                                  }}
                                >
                                  <img
                                    src={item.img}
                                    className="card-img-top"
                                    alt="..."
                                    style={{
                                      height: "120px",
                                      objectFit: "fill",
                                    }}
                                  />
                                  <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <div
                                      className="container w-100 p-0"
                                      style={{ height: "38px" }}
                                    >
                                      <span className="m-1">{item.qty}</span>
                                      <span className="m-1">{item.size}</span>
  
                                      <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                        ₹{item.price}/-
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  ))}
              </div>
            ))
          )}
        </div>
      </div>
      <div style={{ position: "relative", bottom: 0, left: 0, width: "100%" }}>
      <Footer  />
      </div>
      
    </div>
  );
  
  
}
