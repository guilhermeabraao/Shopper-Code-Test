import { createContext, useContext, useState } from "react";

export const ProductContext = createContext({});

export default function ProductsProvider({ children }) {
    const [file, setFile] = useState({
        products: ''
    });
    const [products, setProducts] = useState();
    const [notification, setNotification] = useState({
        type: '',
        message: ''
    })
    const [openNotification, setOpenNotification] = useState(false);

    return (
        <ProductContext.Provider value={{ file, setFile, products, setProducts, notification, setNotification, openNotification, setOpenNotification }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductsContext = () => useContext(ProductContext);