import { useEffect, useState } from "react";
import orderStyle from "./order.module.css";
import { collection, doc, onSnapshot } from "firebase/firestore";
import db from "../../firebaseinit";

export default function Order() {
    const [orders, setOrders] = useState();
    let total;

    useEffect(()=>{
        onSnapshot(collection(db, "purchases"), (snapshot) => {
            const allOrders = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(allOrders);
        })
    },[])
    return (
        <div className={orderStyle.mainDiv}>
            <h1>Your Orders</h1>
            {orders && orders.map((order) => (
                
                <div className={orderStyle.mainOrderDiv} key={order.id}>
                    {total = 0 }
                    <h3 className={orderStyle.h3}>Ordered On:- {order.orderOn.seconds}</h3>
                    <section className={orderStyle.displayItemsSection}>
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order && Object.entries(order).slice(0, -2).map(([key, item]) => (

                                    <>
                                    <tr key={key}>
                                        <td>{item.title}</td>
                                        <td>&#8377; {item.price}</td>
                                        <td>{item.qty}</td>
                                        <td>&#8377; {item.price * item.qty}</td>
                                    </tr>
                                    <span style={{display:"none"}}>{total += (item.price * item.qty)}</span>
                                    </>
                                ))}

                            </tbody>
                            
                            <tfoot>
    <tr>
        <td colSpan="4" className={orderStyle.footerCell}>
            &#8377; {total}
        </td>
    </tr>
</tfoot>

                        </table>

                    </section>
                </div>
            ))}
        </div>
    )
}