import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import classes from "./Navigation.module.css";
import weather from "../../assets/weather.png";
import { Form, FormControl } from "react-bootstrap";
import { useRef } from "react";

const Navigation = (props) => {
  const searchRef = useRef();

  const searchHandler = (event) => {
    event.preventDefault();

    const locality = searchRef.current.value.trim();
    if (locality.length === 0) {
      alert("Please enter a valid locality");
      return;
    }

    props.onSearch(locality);

    document.getElementById("searchForm").reset();
  };

  return (
    <Navbar
      className={classes.navbar}
      variant="light"
      expand="lg"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand href="#" className={classes.navbar_brand}>
          <img src={weather} alt="Weather" />
          <h2 className="m-4">WEATHER</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mx-4">
            <Nav.Link className={classes.navLink} href="#current">
              Current
            </Nav.Link>
            <Nav.Link className={classes.navLink} href="#forecast">
              Forecast
            </Nav.Link>
            <Nav.Link className={classes.navLink} href="#history">
              History
            </Nav.Link>
          </Nav>
          <Form id="searchForm" className="d-flex" onSubmit={searchHandler}>
            <FormControl
              type="search"
              ref={searchRef}
              placeholder="Locality"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit" variant="outline-dark">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
