import homeStyle from "./home.module.css";
import { useValue } from "../../AppContext";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import db from "../../firebaseinit";

export default function Home() {
    const { allProducts, setAllProducts, Loading, cart, setCart } = useValue();
    const [selectedCategories, setSelectedCategories] = useState([])
    const [rangeValue, setRangeValue] = useState(1200);
    const [category, setCategory] = useState();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(json => { setCategory(json); })
    }, [])

    function handleSearch(e) {
        fetch(`https://fakestoreapi.com/products`)
            .then(res => res.json())
            .then(json => {
                const filteredProducts = json.filter(product =>
                    product.title.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setAllProducts(filteredProducts);
            });
    }

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        if (selectedCategories.includes(value)) {
            setSelectedCategories(prev => prev.filter(item => item !== value));
        } else {
            setSelectedCategories(prev => [...prev, value]);

        }
    };

    useEffect(() => {
        if (selectedCategories.length === 0) {
            setAllProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(product =>
                selectedCategories.includes(product.category)
            );
            setAllProducts(filteredProducts);
        }
    }, [selectedCategories]);

    function handleRange(e) {
        setRangeValue(e.target.value);
        fetch(`https://fakestoreapi.com/products`)
            .then(res => res.json())
            .then(json => {
                const filteredProducts = json.filter(product =>
                    product.price < e.target.value
                );
                setAllProducts(filteredProducts);
            });
    }

    async function handleCart(item) {
        setCart([...cart, item]);
        const data = { ...item, qty: 1 }

        const cartRef = collection(db, "cart");
        const q = query(cartRef, where("id", "==", item.id));

        const snapshot = await getDocs(q);


        if (!snapshot.empty) {
            
            const ID = item.id.toString();
            const cartDocRef = doc(db, "cart", ID);
            const docSnap = await getDoc(cartDocRef);
            
            let qty = (docSnap.data().qty) + 1;
            console.log("Already exist",qty);
            await updateDoc(cartDocRef, {
                "qty": (docSnap.data().qty)+ 1,
            });

        } else {
            async function saveDataToDb(data) {
                const customId = data.id.toString();
                await setDoc(doc(db, "cart", customId), data)
            }
            saveDataToDb(data);
            console.log("data Saved", data.id)
        }

    }


    return (
        <>
            {Loading ?
                <div className={homeStyle.loaderContainer}>
                    <div className={homeStyle.ldsRoller}>
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                    </div>
                </div>
                :
                <>
                    <div className={homeStyle.searchSection}>
                        <input type="text" placeholder="Search By Name" onChange={(e) => handleSearch(e)} />
                    </div>
                    <div className={homeStyle.mainDiv}>
                        <div className={homeStyle.leftSection}>
                            <div className={homeStyle.leftSectionMain}>
                                <section className={homeStyle.filterSection}>
                                    <h3>Filter</h3>
                                    <p>Price <b>{rangeValue}</b></p>
                                    <input type='range' value={rangeValue} min="0" max="1500" onChange={(e) => handleRange(e)} />
                                </section>
                                <section className={homeStyle.selectSection}>
                                    <h3>Category</h3>
                                    {category && category.map((item, index) => (
                                        <div key={index}>
                                            <input type="checkbox" id={`category-${index}`} name="category" value={item} onChange={(e) => handleCheckboxChange(e)} />
                                            <label htmlFor={`category-${index}`}>{item}</label>
                                        </div>
                                    ))}

                                </section>
                            </div>
                        </div>
                        <div className={homeStyle.rightSection}>
                            {allProducts && allProducts.map((item) => (
                                <div className={homeStyle.mainCard} key={item.id}>
                                    <section className={homeStyle.imageSection}>
                                        <img src={item.image} alt={item.title} />
                                    </section>
                                    <section className={homeStyle.textSection}>
                                        <p>{item.title}</p>
                                        <p><b>&#8377; {item.price}</b></p>
                                        <button onClick={() => handleCart(item)}>Add To Cart</button>
                                    </section>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }

        </>
    )
}