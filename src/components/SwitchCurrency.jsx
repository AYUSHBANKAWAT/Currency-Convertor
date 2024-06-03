import React, { useContext } from "react";
import { Button, Grid } from "@mui/material";
import CurrencyContext from "../context/CurrencyContext";
import { CompareArrowsSharp } from "@mui/icons-material";



const SwitchCurrency = () =>{
    const {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency
      } = useContext(CurrencyContext);
      const handleClick =()=>{
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
      }
   return ( 
   <Grid item  xs={12} md="auto" >
    <Button onClick={handleClick} sx={{borderRadius:1,height:"100%"}} >
        <CompareArrowsSharp  sx={{fontSize:30}} />
    </Button>
   </Grid> 
   );
}

export default SwitchCurrency;