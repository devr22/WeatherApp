import { Fragment } from "react";

const HistoryRow = (props) => {
  console.log(props.item.date.slice(8));
  return (
    <Fragment>
      <tr>
        <td>
          {props.item.date.slice(8)}/{props.item.date.slice(5, 7)}
        </td>
        <td>{props.item.day.condition.text}</td>
        <td>
          <p>{props.item.day.avgtemp_c} &deg;C</p>
          <p style={{ fontSize: "12px" }}>
            {props.item.day.maxtemp_c} &deg;C / {props.item.day.mintemp_c}
            &deg;C
          </p>
        </td>
        <td>{props.item.astro.sunrise}</td>
        <td>{props.item.astro.sunset}</td>
        <td>{props.item.hour[9].chance_of_rain}</td>
      </tr>
    </Fragment>
  );
};

export default HistoryRow;
