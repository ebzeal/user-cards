import React from 'react';

import './country-details.styles.css';

const CountryDetails = ({countries, countryName}) => {

    const theCountry = countries.filter(country => country.name == countryName)
    const {name,alpha3Code, capital, flag, callingCodes, region, subregion, population, timezones, borders, nativeName, currencies, languages} = theCountry[0]
    return (
        <div className="modal-box">
        <div className="card">
            <div>
                Country:<h1> {name} <span> ({alpha3Code} )</span> </h1>
                <img src={flag} alt={'flag of ' + name}/>
                Native name: <i> {nativeName} </i>
                  </div>
            <div> 
            Capital: <i>  {capital} </i> Calling Codes :<i> {callingCodes[0]} </i>
            </div>
        </div>

        <div className="card">
            Region : <i> {region} </i>
            Subregion : <i> {subregion} </i>
            Population: <i> {population} </i> <br/>
            Timezones: {timezones.map(timezone=> <li>{timezone} </li>, )}
        </div>

        <div className="card">
            Borders:  {borders.map(border=> {
               const borderCountry = countries.filter(country=>country.alpha3Code==border)
               return <li> {borderCountry[0].name} </li>

            })}

            Currencies: {currencies.map(currency=>{
                const {code, name, symbol} = currency;
                return <div>
                    <li>code: <span> {code} </span> </li>
                    <li>name: <span> {name} </span> </li>
                    <li>symbol: <span> {symbol} </span> </li>
                    
                </div>
            })}

            Languages: {languages.map(language=> <li> {language.name} </li>)}
        </div>
        </div>
    )
}

export default CountryDetails;