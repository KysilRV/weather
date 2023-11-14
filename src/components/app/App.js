import cities from 'cities.json';

import './App.scss';

import Map from '../map/map';
import SearchByInput from '../searchByName/searchByInput';
import Loading from '../loading/loading';
import Header from '../header/header';

import { useCallback, useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState(null);
    const [degreePar, setDegreePar] = useState(true);
    const [size, setSize] = useState(false);

    const headers = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    useEffect(() => {
        setLoading(true);
        getAllCountries();
        getWeather(localStorage.getItem('city'));
    }, []);

    window.addEventListener('resize', () => {
        if (window.screen.width <= 860) {
            setSize(true);
        } else {
            setSize(false);
        }
    });

    const getAllCountries =  useCallback(() => {
        setCountries(cities.map(arr => arr.name.toLowerCase()));
    }, [])

    const getWeather = async (city = 'sumy') => {
        const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=dcfdac2838c845a6b5e72054232305&q=${city}&aqi=yes`, {headers})    
                            .then(res => res.json())
                            .catch(rejected => {
                                console.log(rejected);
                            });
        setData(res);
        setLoading(false);
    }

    const checkCountry = (val) => {
        if (countries.find(el => el === val.replace(/ /, ''))) {
            localStorage.setItem('city', val);
            getWeather(val);
        } else {
            setLoading(false)
            alert('Invalid name')
        }
    }

    const loadingEl = loading ? <Loading/> : null
    const content = !data ? null : <View size={size}
                                        setDegreePar={setDegreePar} 
                                        degreePar={degreePar} 
                                        setLoading={setLoading} 
                                        checkCountry={checkCountry}
                                        city={data.location.name}
                                        country={data.location.country}
                                        lat={data.location.lat}
                                        lng={data.location.lon}
                                        date={data.current.last_updated}
                                        degree={Math.floor(data.current.temp_c)}
                                        far={Math.floor(data.current.temp_f)}
                                        feelsLikeC={Math.floor(data.current.feelslike_c)}
                                        feelsLikeF={Math.floor(data.current.feelslike_f)}
                                        condition={data.current.condition.text}
                                        conditionIcon={data.current.condition.icon}
                                        wind={Math.floor(data.current.wind_kph)}
                                        humidity={data.current.humidity}/>

    return (
        <>
            {loadingEl}
            {content}
        </>
    )
}

const View = ({size, setDegreePar, degreePar, setLoading, checkCountry, city, country, lat, lng, date, far, degree, feelsLikeC, feelsLikeF, condition, conditionIcon, wind, humidity}) => {
    return (
        <div className="app">
            <div className="app__top">
                <Header setDegreePar={setDegreePar} degreePar={degreePar}/>
                <SearchByInput setLoading={setLoading} checkCountry={checkCountry}/>
            </div>
            <div className="app__wrapper">
                <div className="app__info">
                    <h1 className="app__city">{city}, {country}</h1>
                    <h2 className="app__subtitle">{date}</h2>
                    <div className="app__data">
                        <div className="app__degrees">{degreePar ? `${degree}°` : `${far}°`}</div>
                        <div className="app__more">
                            <img src={conditionIcon} alt={condition} className="app__more-img" />
                            <div className="app__more-info">
                                <div className="app__more-item">{condition}</div>
                                <div className="app__more-item">Feels like: {degreePar ? `${feelsLikeC}°` : `${feelsLikeF}°`}</div>
                                <div className="app__more-item">Wind: {wind} k/h </div>
                                <div className="app__more-item">Humidity: {humidity}%</div>
                            </div>
                        </div>
                    </div>
                </div>
                {size || window.screen.width <= 860 ? null : <div className="app__visual">
                    <Map lat={lat} lng={lng}/>
                    <div className="app__where">Latitude: {lat}'</div>
                    <div className="app__where">Longitude: {lng}'</div>
                </div>}
            </div>
        </div>
    )
}

export default App;
