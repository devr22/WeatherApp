import { Fragment, useEffect, useState } from "react";
import Navigation from "./components/Layout/Navigation";
import useHttp from "./hooks/use-http";
import CurrentWeather from "./components/Climate/CurrentWeather";
import classes from "./App.module.css";
import ForecastWeather from "./components/Climate/ForecastWeather";
import HistoryWeather from "./components/Climate/HistoryWeather";
import Footer from "./components/Layout/Footer";

function App() {
  const [location, setLocation] = useState(null);
  const [locality, setLocality] = useState("Mohania");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [climateForecast, setClimateForecast] = useState(null);

  const { sendRequest: getWeatherForecast } = useHttp();
  const [weatherForecast, setWeatherForecast] = useState(null);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setLocation({
  //         lat: position.coords.latitude,
  //         lon: position.coords.longitude,
  //       });
  //       console.log(
  //         "GeoLocation",
  //         position.coords.latitude,
  //         position.coords.longitude
  //       );

  //       // try {
  //       //   const response = fetch(
  //       //     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
  //       //   );
  //       //   if (!response.ok) {
  //       //     throw new Error("Failed to fetch your current location");
  //       //   }
  //       //   const localityData = response.json();
  //       //   console.log(localityData.locality);
  //       //   setLocality(localityData.locality);
  //       // } catch (error) {
  //       //   alert(error);
  //       // }

  //       // // const getLocalityName = async (lat, lon) => {
  //       //   try {
  //       //     const response = await fetch(
  //       //       `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
  //       //     );
  //       //     if (!response.ok) {
  //       //       throw new Error("Request Failed!");
  //       //     }
  //       //     const localityData = await response.json();
  //       //     console.log(localityData.locality);
  //       //     setLocality(localityData.locality);
  //       //   } catch (error) {
  //       //     alert("Failed to fetch your current location");
  //       //   }
  //       // };

  //       // getLocalityName(position.coords.latitude, position.coords.longitude);
  //       // console.log(locality);
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (location === null) {
  //     return;
  //   }

  //   const storeCurrentWeather = (reponseData) => {
  //     setCurrentWeather(reponseData);
  //   };
  //   // ${(location.lat, location.lon)}
  //   console.log("EffectLocation", location.lat, location.lon);
  //   getCurrentWeather(
  //     {
  //       endPoint: `current.json?q=${(location.lat, location.lon)}`,
  //     },
  //     storeCurrentWeather
  //   );

  // useEffect(() => {
  //   const storeWeatherForecast = (reponseData) => {
  //     setWeatherForecast(reponseData.forecast.forecastday);
  //   };
  //   getWeatherForecast(
  //     {
  //       endPoint: "forecast.json?q=Mohania",
  //     },
  //     storeWeatherForecast
  //   );

  //   getWeatherForecast();
  // }, [getWeatherForecast]);

  // console.log(weatherForecast);

  const searchHandler = (serachedLocality) => {
    setLocality(serachedLocality);
  };

  return (
    <Fragment>
      <div className={classes.bg}>
        <Navigation onSearch={searchHandler} />
        <h2 className={`text-center mb-4 ${classes.heading}`}>{locality}</h2>
        {/* {weatherForecast.length > 0 && (
          <CurrentWeather locality="Mohania" forecast={weatherForecast} />
        )} */}
        <CurrentWeather id="current" locality={locality} />
      </div>
      {/* {weatherForecast.length > 0 && (
        <ForecastWeather forecast={weatherForecast} />
      )} */}

      {/* {weatherForecast !== null && (
        <ForecastWeather locality="Mohania" />
      )} */}

      <ForecastWeather id="forecast" locality={locality} />

      <HistoryWeather id="history" />

      <Footer />
    </Fragment>
  );
}

export default App;
