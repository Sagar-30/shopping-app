import { createContext, useContext, useEffect, useState } from "react";

const loginContext = createContext();
const productContext = createContext();


export function useValue() {
    const { allProducts, setAllProducts,Loading, setLoading } = useContext(productContext);
    const { isLogin, setIsLogin, cart, setCart } = useContext(loginContext);

    return {Loading, setLoading, allProducts, setAllProducts, isLogin, setIsLogin, cart, setCart }
}

export default function AppContext({ children }) {
    const [allProducts, setAllProducts] = useState();
    const [isLogin, setIsLogin] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [cart, setCart] = useState([])

    useEffect(() => {
        setLoading(true);
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {setAllProducts(json); setLoading(false)});
    }, []);

    return (
        <productContext.Provider value={{ Loading, setLoading, allProducts, setAllProducts }}>
            <loginContext.Provider value={{ isLogin, setIsLogin, cart, setCart }}>
                {children}
            </loginContext.Provider>
        </productContext.Provider>
    )
}