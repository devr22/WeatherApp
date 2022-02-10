import Container from "react-bootstrap/Container";
import classes from "./HistoryWeather.module.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import HistoryRow from "./HistoryRow";
import Form from "react-bootstrap/Form";
import { useRef, useState } from "react";
import useHttp from "../../hooks/use-http";

const HistoryWeather = () => {
  const {
    isLoading,
    error,
    sendRequest: fetchHistoricalWeatherData,
  } = useHttp();
  const [weatherData, setWeatherData] = useState([]);
  const localityRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();

  const storeHistoricalData = (responseData) => {
    document.getElementById("searchForm").reset();
    setWeatherData(responseData.forecast.forecastday);
  };

  const getHistoricalWeatherData = async (locality, from, to) => {
    fetchHistoricalWeatherData(
      {
        endPoint: `history.json?q=${locality}&dt=${from}&end_dt=${to}`,
      },
      storeHistoricalData
    );
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredLocality = localityRef.current.value;
    const enteredFromDate = fromRef.current.value;
    const enteredToDate = toRef.current.value;

    if (
      enteredLocality.trim().length === 0 ||
      enteredFromDate.length === 0 ||
      enteredToDate.length === 0
    ) {
      alert("Please enter the valid place and date range");
      return;
    }

    setWeatherData([]);
    getHistoricalWeatherData(enteredLocality, enteredFromDate, enteredToDate);
  };

  return (
    <Container className={classes.main}>
      <div className="col-12 col-md-10 mx-auto">
        <h4 className={classes.heading}>Weather History</h4>

        <Form
          id="searchForm"
          className="mb-4 mt-4 col-12 col-md-10 mx-auto"
          onSubmit={formSubmitHandler}
        >
          <div className="row mb-3">
            <Form.Group className="col-md-12 col-lg-6" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                ref={localityRef}
                type="text"
                placeholder="Enter your locality"
              />
            </Form.Group>
            <Form.Group className="col-12 col-md-6 col-lg-3" controlId="from">
              <Form.Label>From</Form.Label>

              <Form.Control ref={fromRef} type="date" />
            </Form.Group>
            <Form.Group className="col-12 col-md-6 col-lg-3" controlId="to">
              <Form.Label>To</Form.Label>

              <Form.Control ref={toRef} type="date" />
            </Form.Group>
          </div>
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </Form>

        {weatherData.length === 0 && !isLoading && error === null && (
          <p className="fs-5 fw-bold text-center">
            Start searching for the weather data
          </p>
        )}

        {isLoading && (
          <p className="fs-5 fw-bold text-center">Fetching Weather Data...</p>
        )}

        {error && <p className="fs-5 fw-bold text-center">{error}</p>}

        {weatherData.length > 0 && (
          <div className={`col-12 col-md-10 mx-auto ${classes.table_bg}`}>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Condition</th>
                  <th>Temperatue</th>
                  <th>Sunrise</th>
                  <th>Sunset</th>
                  <th>Rain %</th>
                </tr>
              </thead>
              <tbody>
                {weatherData.map((item) => (
                  <HistoryRow key={item.date_epoch} item={item} />
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </Container>
  );
};

export default HistoryWeather;
