import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <p className="fw-bold fs-3">Know About Your Weather</p>
      <p>© Copyright 2022 Weather</p>
    </div>
  );
};

export default Footer;
