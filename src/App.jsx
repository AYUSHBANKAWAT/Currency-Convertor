import './App.css'
import { Button, colors, Container, Grid, Typography,Box } from '@mui/material'
import InputAmount from './components/Input Amount'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { useContext, useEffect, useState } from 'react'
import CurrencyContext from './context/CurrencyContext'
import CurrencyContextProvider from './context/CurrencyContextProvider.jsx'
import axios from 'axios'


function App() {

  function countryCodeToFlag(countryCode) {
    const codePoints = countryCode.toUpperCase().split('').map(char => 55356 + (char.charCodeAt(0) - 65));
    return String.fromCodePoint(...codePoints);
}

  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount
  } = useContext(CurrencyContext);
  const [ resultCurrency,setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const flagCodeFromCurrency = fromCurrency.split(" ")[0];
  const codeToCurrency = toCurrency.split(" ")[1];
  //console.log(codeFromCurrency+codeToCurrency)
console.log("result",resultCurrency)
  useEffect(()=>{
    if(firstAmount){
      axios("https://api.freecurrencyapi.com/v1/latest",{
        params: {
          apikey:"fca_live_46UGJfwqJiEVYHOWAnGCIv4qzQayyrLWelwLyNAV",
          base_currency:codeFromCurrency,
          currencies:codeToCurrency
        }
      })
      .then(
        response => {setResultCurrency(response.data.data[codeToCurrency])
          console.log(response)
        }

      )
      .catch( error=>
        console.log("Error",error.request.responseURL)
      )
    }
  },[firstAmount,fromCurrency,toCurrency])

  const boxStyles ={
    background:"#fdfdfd",
    textAlign: "center",
    color:"#222",
    minHeight:"20rem",
    borderRadius:2,
    padding:"4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position:"relative"
  }

  return (
    
    <Container maxWidth="md"  sx={ boxStyles } >
      <Typography variant='h4' sx={{marginBottom:"4rem", fontWeight:"normal"}} >Stay Ahead with Accurate Conversion</Typography>
      <Grid container spacing={2}>
        <InputAmount/>
        <SelectCountry value={fromCurrency} setValue ={setFromCurrency} label="from" />
        <SwitchCurrency/>
        <SelectCountry value={toCurrency} setValue ={setToCurrency} label ="to" />
      </Grid>
      {firstAmount? (
        <Box sx={{textAlign:"left", marginTop:"1rem"}}>
          <Typography>{ firstAmount} {fromCurrency} =</Typography>
          <Typography variant='h5' sx={{marginTop:"1px",fontWeight:"bold"}} >{(resultCurrency*firstAmount).toFixed(2)} {toCurrency}</Typography>
        </Box>
      ):""}

    </Container>

  )
}

export default App;
