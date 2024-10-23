import { createContext, useContext, useEffect, useState } from "react";

const loginContext = createContext();
const productContext = createContext();


export function useValue() {
    const { allProducts, setAllProducts } = useContext(productContext);
    const { isLogin, setIsLogin } = useContext(loginContext);

    return { allProducts, setAllProducts, isLogin, setIsLogin }
}

export default function AppContext({ children }) {
    const [allProducts, setAllProducts] = useState();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setAllProducts(json))
    }, []);

    
    return (
        <productContext.Provider value={{ allProducts, setAllProducts }}>
            <loginContext.Provider value={{ isLogin, setIsLogin }}>
                {children}
            </loginContext.Provider>
        </productContext.Provider>
    )
}