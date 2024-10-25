import cartStyle from "./cart.module.css"
import { useValue } from "../../AppContext";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import db from "../../firebaseinit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { allProducts, setAllProducts, cart, setCart, isLogin } = useValue();
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState();
    const [click, setClick] = useState(true);
    const Purchased = () => toast.success("Items Bought", { autoClose: 2000, style: { width: '500px', margin: '10px', fontSize: '16px' } });
    const Navigate = useNavigate();
   
    let total = 0;
    useEffect(() => {
        async function getData() {
            const snapshot = await getDocs(collection(db, "cart"));
            const allItems = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setCartItems(allItems)

            allItems.map((i) => {
                total += i.qty * i.price;
            });
            setTotalPrice(total.toFixed(2))
        }
        getData();
    }, [cart, click]);

    async function increaseQty(item) {
        setClick(!click)
        const ID = item.id.toString();
        const cartDocRef = doc(db, "cart", ID);
        const docSnap = await getDoc(cartDocRef);
        await updateDoc(cartDocRef, {
            "qty": (docSnap.data().qty) + 1,
        });
    }

    async function decreaseQty(item) {
        setClick(!click)
        const ID = item.id.toString();
        const cartDocRef = doc(db, "cart", ID);
        const docSnap = await getDoc(cartDocRef);
        await updateDoc(cartDocRef, {
            "qty": (docSnap.data().qty) - 1,
        });
    }

    async function deleteCart(item) {
        setClick(!click);
        const ID = item.id.toString();
        await deleteDoc(doc(db, "cart", ID));
    }

    async function handlePurchase(){ 
        if(cartItems.length !== 0){
            await addDoc(collection(db, "purchases"), {...cartItems, orderOn: new Date()});
            cartItems.map((item)=>{
                deleteCart(item);
            });
            Purchased();
            Navigate("/orders")
        }
    }
// console.log(typeof(cartItems.length))
    return (
        <>
            {isLogin &&
                <>
                    {cartItems ?
                        <div className={cartStyle.mainDiv}>
                            <ToastContainer />
                            <div className={cartStyle.leftSection}>
                                <div className={cartStyle.leftSectionMain}>
                                    <section className={cartStyle.filterSection}>
                                        <p>Price <b>{totalPrice}</b></p>
                                        <button className={cartStyle.button} onClick={handlePurchase}>Purchase</button>
                                    </section>
                                </div>
                            </div>
                            <div className={cartStyle.rightSection}>
                                {cartItems && cartItems.map((item) => (
                                    <div className={cartStyle.mainCard} key={item.id}>
                                        <section className={cartStyle.imageSection}>
                                            <img src={item.image} alt={item.title} />
                                        </section>
                                        <section className={cartStyle.textSection}>
                                            <p>{item.title}</p>
                                            <section className={cartStyle.priceSection}>
                                                <p><b>&#8377; {item.price}</b></p>
                                                <section className={cartStyle.qtySection}>
                                                    <button className={cartStyle.qtyButton} onClick={() => decreaseQty(item)} >-</button>
                                                    <p>{item.qty}</p>
                                                    <button className={cartStyle.qtyButton} onClick={() => increaseQty(item)} >+</button>
                                                </section>

                                            </section>
                                            <button className={cartStyle.buttonRed} onClick={() => deleteCart(item)}>Remove Item</button>
                                        </section>
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        <><h1>Cart Empty</h1></>
                    }
                </>
            }
        </>
    )
}