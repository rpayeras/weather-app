import styles from "./ForecastNow.module.css";
import { Player } from "@lottiefiles/react-lottie-player";
import PropTypes from "prop-types";

export const ForecastNow = ({ data }) => {
  const { tempC, text, icon } = data;

  return (
    <section className={styles.forecast__current}>
      <div>
        <Player
          autoplay
          loop
          src={icon}
          style={{ height: "200px", width: "200px" }}
        ></Player>
      </div>
      <h1>{tempC}°C</h1>
      <h2>{text}</h2>
    </section>
  );
};

ForecastNow.propTypes = {
  data: PropTypes.object.isRequired,
};
