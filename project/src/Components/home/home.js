import homeStyle from "./home.module.css";
import { useValue } from "../../AppContext";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import db from "../../firebaseinit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { Loading, cart, setCart, isLogin } = useValue();
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [rangeValue, setRangeValue] = useState(120);
    const Navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const SuccessNotify = () => toast.success("Added to cart!", { autoClose: 2000, style: { width: '500px', margin: '10px', fontSize: '16px' } });
    

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                setAllProducts(json);
                setFilteredProducts(json); // Initialize filtered products
            });

        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(json => setCategory(json));
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allProducts.filter(product =>
            product.title.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    };

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        if (selectedCategories.includes(value)) {
            setSelectedCategories(prev => prev.filter(item => item !== value));
        } else {
            setSelectedCategories(prev => [...prev, value]);
        }
    };

    useEffect(() => {
        let updatedProducts = allProducts;

        if (selectedCategories.length > 0) {
            updatedProducts = allProducts.filter(product =>
                selectedCategories.includes(product.category)
            );
        }

        setFilteredProducts(updatedProducts);
    }, [selectedCategories]);

    const handleRange = (e) => {
        setRangeValue(e.target.value);
        const filtered = allProducts.filter(product =>
            product.price < e.target.value
        );
        setFilteredProducts(filtered);
    };

    async function handleCart(item) {
        if(isLogin){
        const data = { ...item, qty: 1 };
        setCart(prev => [...prev, data]);

        const cartRef = collection(db, "cart");
        const q = query(cartRef, where("id", "==", item.id));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const cartDocRef = doc(db, "cart", item.id.toString());
            const docSnap = await getDoc(cartDocRef);
            await updateDoc(cartDocRef, {
                qty: docSnap.data().qty + 1,
            });
        } else {
            await setDoc(doc(cartRef, item.id.toString()), data);
        }
        SuccessNotify();
    }else{
        Navigate("/login");
    }
    }

    return (
        <>
            {Loading ? (
                <div className={homeStyle.loaderContainer}>
                    <div className={homeStyle.ldsRoller}>
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                    </div>
                </div>
            ) : (
                <>
                <ToastContainer/>
                    <div className={homeStyle.searchSection}>
                        <input type="text" placeholder="Search By Name" onChange={handleSearch} />
                    </div>
                    <div className={homeStyle.mainDiv}>
                        <div className={homeStyle.leftSection}>
                            <div className={homeStyle.leftSectionMain}>
                                <section className={homeStyle.filterSection}>
                                    <h3>Filter</h3>
                                    <p>Price <b>{rangeValue}</b></p>
                                    <input type='range' value={rangeValue} min="0" max="1500" onChange={handleRange} />
                                </section>
                                <section className={homeStyle.selectSection}>
                                    <h3>Category</h3>
                                    {category.map((item, index) => (
                                        <div key={index}>
                                            <input type="checkbox" id={`category-${index}`} name="category" value={item} onChange={handleCheckboxChange} />
                                            <label htmlFor={`category-${index}`}>{item}</label>
                                        </div>
                                    ))}
                                </section>
                            </div>
                        </div>
                        <div className={homeStyle.rightSection}>
                            {filteredProducts.map(item => (
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
            )}
        </>
    );
}
