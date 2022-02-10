import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import OneDayWeather from "./OneDayWeather";
import classes from "./ForecastWeather.module.css";
import useHttp from "../../hooks/use-http";
import climate from "../../assets/climate.png";

const forecastLabel = {
  label: true,
  date: "--",
  icon: "--",
  text: "Condtion",
  avgTemp: "Temperatue",
  tempMaxMin: {
    maxTemp: "--",
    minTemp: "--",
  },
  sunrise: "Sunrise",
  sunset: "Sunset",
  rain: "Rain %",
};

const ForecastWeather = (props) => {
  const { sendRequest: getWeatherForecast } = useHttp();
  const [weatherForecast, setWeatherForecast] = useState([forecastLabel]);

  const { locality } = props;

  useEffect(() => {
    for (let i = 1; i <= 5; i++) {
      const date = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);

      const storeWeatherForecast = (responseData) => {
        const forecastObj = {
          label: false,
          date: `${responseData.forecast.forecastday[0].date.slice(
            8
          )}/${responseData.forecast.forecastday[0].date.slice(5, 7)}`,
          icon: responseData.forecast.forecastday[0].day.condition.icon,
          text: responseData.forecast.forecastday[0].day.condition.text,
          avgTemp: responseData.forecast.forecastday[0].day.avgtemp_c,
          tempMaxMin: {
            maxTemp: responseData.forecast.forecastday[0].day.maxtemp_c,
            minTemp: responseData.forecast.forecastday[0].day.mintemp_c,
          },
          sunrise: responseData.forecast.forecastday[0].astro.sunrise,
          sunset: responseData.forecast.forecastday[0].astro.sunset,
          rain: responseData.forecast.forecastday[0].day.daily_chance_of_rain,
        };

        // console.log("forecast", forecastObj);
        // setWeatherForecast((weatherForecast) => {
        //   return [...weatherForecast, forecastObj];
        // });

        setWeatherForecast(weatherForecast.push(forecastObj));

        // setWeatherForecast((prevState) => [...prevState, forecastObj]);

        console.log(weatherForecast.length);
        console.log(weatherForecast);
      };

      getWeatherForecast(
        {
          endPoint: `forecast.json?q=${locality}&dt=${date}`,
        },
        storeWeatherForecast
      );

      getWeatherForecast();
    }
  }, [getWeatherForecast, locality]);

  console.log(weatherForecast);

  return (
    <Container className={classes.main}>
      <h4 className={`col-12 col-md-10 mx-auto ${classes.heading}`}>
        5-Day Forecast
      </h4>

      {/* {weatherForecast.length >= 0 && (
        <div className="col-12 col-md-10 mx-auto d-flex justify-content-between">
          {weatherForecast.map((item, index) => (
            <OneDayWeather
              key={index}
              label={item.label}
              item={item}
              list={weatherForecast}
            />
          ))}
        </div>
      )} */}

      <ul>
        {weatherForecast.length >= 0 &&
          weatherForecast.map((item, index) => (
            <li key={index}>
              <p>{item.text}</p>
            </li>
          ))}
      </ul>

      {/* <OneDayWeather label={true} /> */}

      {/* <OneDayWeather label={true} />
      <OneDayWeather label={false} />
        <OneDayWeather label={false} />
        <OneDayWeather label={false} />
        <OneDayWeather label={false} />
        <OneDayWeather label={false} /> */}
    </Container>
  );
};

export default ForecastWeather;
