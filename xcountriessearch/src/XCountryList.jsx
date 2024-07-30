import React, { useEffect, useState } from 'react'
import axios from "axios"

const XCountryList = () => {
    const [countries,setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [searchTerm , setSearchTerm] = useState('')

    useEffect(()=>{
        axios
        .get("https://restcountries.com/v3.1/all")
        .then((res)=>{
            setCountries(res.data)
            setFilteredCountries(res.data)
        })
        .catch((err)=>{
            console.error("Error fetching data",err)
        })
    },[])

    const handleSearch = ((event)=>{
        const searchTerm = event.target.value.toLowerCase()
        setSearchTerm(searchTerm)
        const filtered = countries.filter((country)=>{
            return country.name.common.toLowerCase().includes(searchTerm)
        })
        setFilteredCountries(filtered)
    })

    const cardStyle = {
        width: "200px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        margin: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      };
    
      const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      };
    
      const imageStyle = {
        width: "100px",
        height: "100px"
      };

      const searchimg = {
        width: "50%",
        border: "1px solid black",
        margin: "0 25%"
      }

  return (
    <div className="container">
            <input 
            type='text' 
            placeholder='search for countries' 
            style={searchimg}
            value={searchTerm}
            onChange={handleSearch} 
            />
    <div style={containerStyle}>
        {filteredCountries.map((country)=>(
            <div style={cardStyle} key={country.cca3} className="countryCard">
                <img src={country.flags.png} alt={`Flag of {country.name.common}`} style={imageStyle}/>
            <h2>{country.name.common}</h2>
            </div>
        ))}
    </div>
    </div>
  )
}

export default XCountryList