import React from "react";
import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material";
import useAxios from "../hooks/useAxios";


const SelectCountry = (props) =>{
    //const {value,setValue,label} = props;
    //console.log(props)
    const [data,loaded,error] = useAxios("https://restcountries.com/v3.1/all")
    //console.log(data.toString)
    if(loaded){
        return (
            <Grid item xs={12} md={3} >
                <Skeleton variant="rounded" height={60}/>
            </Grid>  
        )
    }
    if(error){
        return "Something went wrong"
    }

    if (!data) {
        return null; // Or any other loading indicator
    }

    const dataFilter = data.filter(item=> "currencies" in item);
    const dataCounteries = dataFilter.map(item=>{
        return `${item.flag} ${Object.keys(item.currencies)[0]} - ${item.name.common}`;
    });
    //console.log(dataCounteries)

        return (
            <Grid item xs={12} md={3} >
                <Autocomplete
                disableClearable
                sx={{fontWeight:"normal"}}
                 value={props.value}
                 onChange={(e,new_value)=>{
                    props.setValue(new_value)
                 }}
                  options={dataCounteries}
                  renderInput={(params) => <TextField {...params} label={props.label} />}
                
                />
            </Grid>
        ) 
}

export default SelectCountry;