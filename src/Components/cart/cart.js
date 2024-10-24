import cartStyle from "./cart.module.css"
import { useValue } from "../../AppContext";
import { useEffect, useState } from "react";

export default function Cart() {
    const { allProducts, setAllProducts, cart, setCart } = useValue();
    const [rangeValue, setRangeValue] = useState(1200);
    const [category, setCategory] = useState();

    function RemoveCart(item) {
        console.log(item);
        const data = {...item,qty:1}
        console.log(data);
    }

    return (
        <>
            <div className={cartStyle.mainDiv}>
                <div className={cartStyle.leftSection}>
                    <div className={cartStyle.leftSectionMain}>
                        <section className={cartStyle.filterSection}>
                            <p>Price <b>{rangeValue}</b></p>
                            <button className={cartStyle.button}>Purchase</button>
                        </section>
                    </div>
                </div>
                <div className={cartStyle.rightSection}>
                    {cart && cart.map((item) => (
                        <div className={cartStyle.mainCard} key={item.id}>
                            <section className={cartStyle.imageSection}>
                                <img src={item.image} alt={item.title} />
                            </section>
                            <section className={cartStyle.textSection}>
                                <p>{item.title}</p>
                                <section className={cartStyle.priceSection}>
                                <p><b>&#8377; {item.price}</b></p>

                                </section>
                                <button className={cartStyle.buttonRed} onClick={() => RemoveCart(item)}>Remove Item</button>
                            </section>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}