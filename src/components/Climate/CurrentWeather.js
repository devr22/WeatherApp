import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { WiCloudRefresh } from "react-icons/wi";
import useHttp from "../../hooks/use-http";
import classes from "./CurrentWeather.module.css";
import loading from "../../assets/loading.gif";

const CurrentWeather = (props) => {
  const { isLoadingCurrent, sendRequest: getCurrentWeather } = useHttp();
  const { isLoadingAstro, sendRequest: getCurrentWeatherAstro } = useHttp();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentWeatherAstro, setCurrentWeatherAstro] = useState(null);

  const { locality } = props;

  useEffect(() => {
    const storeCurrentWeather = (reponseData) => {
      setCurrentWeather(reponseData);
    };
    getCurrentWeather(
      {
        endPoint: `current.json?q=${locality}`,
      },
      storeCurrentWeather
    );
    getCurrentWeather();
  }, [getCurrentWeather, locality]);

  useEffect(() => {
    const storeCurrentWeatherAstro = (reponseData) => {
      setCurrentWeatherAstro(reponseData);
    };
    getCurrentWeatherAstro(
      {
        endPoint: `forecast.json?q=${locality}`,
      },
      storeCurrentWeatherAstro
    );

    getCurrentWeatherAstro();
  }, [getCurrentWeatherAstro, locality]);

  return (
    <Container>
      {/* <h4 className={`col-12 col-md-10 mx-auto ${classes.heading}`}>Current</h4> */}
      {(isLoadingCurrent || isLoadingAstro) && (
        <p>Stay tuned! Fetching the weather condition..</p>
      )}
      {currentWeather !== null && currentWeatherAstro !== null && (
        <div className={`col-12 col-md-8 mx-auto ${classes.box}`}>
          <div className="d-flex justify-content-between">
            <div>
              <img
                src={`https:${currentWeather.current.condition.icon}`}
                alt={currentWeather.current.condition.text}
                width="60"
                height="60"
              />
              <p className={`d-inline fs-4 ${classes.condition}`}>
                {currentWeather.current.condition.text}
              </p>
            </div>
            <span>
              <WiCloudRefresh className={classes.refresh} />
            </span>
          </div>

          <div className={classes.temp}>
            <p className="fs-1 fw-bold">
              {currentWeather.current.temp_c} &deg;C
            </p>
            <p className="fs-6">
              {currentWeatherAstro.forecast.forecastday[0].day.maxtemp_c} &deg;C
              / {currentWeatherAstro.forecast.forecastday[0].day.mintemp_c}{" "}
              &deg;C
            </p>
          </div>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-md-6 col-lg-4 col-xl-3">
              <p className="fs-5">
                Sunrise:{" "}
                {currentWeatherAstro.forecast.forecastday[0].astro.sunrise}
              </p>
              <p className="fs-5">
                Sunset:{" "}
                {currentWeatherAstro.forecast.forecastday[0].astro.sunset}
              </p>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-3">
              <p className="fs-5">Cloud (%): {currentWeather.current.cloud}</p>
              <p className="fs-5">
                Humidity: {currentWeather.current.humidity}
              </p>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CurrentWeather;
