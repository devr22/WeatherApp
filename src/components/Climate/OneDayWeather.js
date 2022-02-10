import { Fragment } from "react";
import climate from "../../assets/climate.png";

const OneDayWeather = (props) => {
  console.log("called -> row");
  console.log(props.item.date);
  console.log(props.list.length);
  return (
    <Fragment>
      <div className="col-2 d-flex flex-column align-items-center">
        <p className="fw-bold" style={{ color: "#455a64" }}>
          {props.item.date}
        </p>
        {props.label ? (
          <img src={climate} alt="Climate" width="30" height="30" />
        ) : (
          <img
            src={`https:${props.item.icon}`}
            alt={props.item.text}
            width="30"
            height="30"
          />
        )}
        {props.label ? (
          <p className="fw-bold" style={{ color: "#455a64" }}>
            {props.item.text}
          </p>
        ) : (
          <p>{props.item.text}</p>
        )}

        <div className="d-flex flex-column align-items-center">
          {props.label ? (
            <p className="fw-bold mb-0" style={{ color: "#455a64" }}>
              {props.item.avgTemp}
            </p>
          ) : (
            <p className="fw-bold mb-0">{props.item.avgTemp} &deg;C</p>
          )}
          {props.label ? (
            <p className="mt-0" style={{ color: "#455a64" }}>
              {props.item.tempMaxMin.maxTemp}
            </p>
          ) : (
            <p className="mt-0" style={{ fontSize: "13px" }}>
              {props.item.tempMaxMin.maxTemp} &deg;C / {props.item.day.minTemp}{" "}
              &deg;C
            </p>
          )}
        </div>

        {props.label ? (
          <p className="fw-bold" style={{ color: "#455a64" }}>
            {props.item.sunrise}
          </p>
        ) : (
          <p>{props.item.sunrise}</p>
        )}
        {props.label ? (
          <p className="fw-bold" style={{ color: "#455a64" }}>
            {props.item.sunset}
          </p>
        ) : (
          <p>{props.item.sunset}</p>
        )}
        {props.label ? (
          <p className="fw-bold" style={{ color: "#455a64" }}>
            {props.item.rain}
          </p>
        ) : (
          <p>{props.item.rain}</p>
        )}
      </div>

      {/* <div className="col-2 d-flex flex-column align-items-center">
        <p className="fw-bold" style={{ color: "#455a64" }}>
          {props.label ? "--" : props.item.date.slice(8)}/
          {props.item.date.slice(5, 7)}
        </p>
        {props.label ? (
          <img src={climate} alt="Climate" width="30" height="30" />
        ) : (
          <img
            src={`https:${props.item.day.condition.icon}`}
            alt={props.item.day.condition.text}
            width="30"
            height="30"
          />
        )}

        {props.label ? (
          <p className="fw-bold" style={{ color: "#455a64" }}>
            Condtion
          </p>
        ) : (
          <p>{props.item.day.condition.text}</p>
        )}

        <div className="d-flex flex-column align-items-center">
          {props.label ? (
            <p className="fw-bold mb-0" style={{ color: "#455a64" }}>
              Temperatue
            </p>
          ) : (
            <p className="fw-bold mb-0">{props.item.day.avgtemp_c} &deg;C</p>
          )}
          {props.label ? (
            <p className="mt-0" style={{ color: "#455a64" }}>
              --
            </p>
          ) : (
            <p className="mt-0" style={{ fontSize: "13px" }}>
              {props.item.day.maxtemp_c} &deg;C / {props.item.day.mintemp_c}{" "}
              &deg;C
            </p>
          )}
        </div>

        {props.label ? (
          <p className="fw-bold" style={{ color: "#455a64" }}>
            Sunrise
          </p>
        ) : (
          <p>{props.item.astro.sunrise}</p>
        )}

        {props.label ? (
          <p className="fw-bold" style={{ color: "#455a64" }}>
            Sunset
          </p>
        ) : (
          <p>{props.item.astro.sunset}</p>
        )}

        {props.label ? (
          <p className="fw-bold" style={{ color: "#455a64" }}>
            Rain %
          </p>
        ) : (
          <p>{props.item.day.daily_chance_of_rain}</p>
        )}
      </div> */}
    </Fragment>
  );
};

export default OneDayWeather;
