import { sweCityNames, sweCountryNames, countryCodesToCountry } from "./localizationConstants";



const toSwedishCityName = (airport) => {
    
    var keys = Object.keys(sweCityNames);
    if(keys.some(x => x == airport.city)){
        airport.citySv = sweCityNames[airport.city];
    }
}

const toCountryNames = (airport) => {

    var keys = Object.keys(countryCodesToCountry)
    if(keys.some(x => x == airport.country)){
        airport.countryNameEn = countryCodesToCountry[airport.country];
    }
}

const toSwedishContryNames = (airport) => {
    var keys = Object.keys(sweCountryNames);
    if(keys.some(x => x == airport.countryNameEn)){
        airport.countryNameSv = sweCountryNames[airport.countryNameEn];
    }
}




export const pimpData = (airport) => {

    airport.iATA = airport.iata;
    toSwedishCityName(airport);
    toCountryNames(airport)
    toSwedishContryNames(airport);
    

    return airport;
}















