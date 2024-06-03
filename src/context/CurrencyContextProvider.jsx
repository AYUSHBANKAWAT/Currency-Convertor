import  { React,useState } from "react";
import CurrencyContext from "./CurrencyContext";


const CurrencyContextProvider = ( {children} ) => {
    const [ fromCurrency,setFromCurrency] = useState("🇮🇳 INR - India") ;
    const [toCurrency,setToCurrency] = useState("🇮🇳 INR - India");
    const [firstAmount,setFirstAmount] = useState(0);

    const value = {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        firstAmount,
        setFirstAmount
    };
    
    return (
         <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
    )
};
export default CurrencyContextProvider;
