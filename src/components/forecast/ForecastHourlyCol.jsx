import styles from "./ForecastHourlyCol.module.css";
import PropTypes from "prop-types";

export const ForecastHourlyCol = ({ hour, icon, text, date, temp }) => {
  return (
    <li className={styles.hourly__row}>
      <div>{hour}</div>
      <div>
        <img src={icon} alt={text} />
      </div>
      <div>{temp}º</div>
    </li>
  );
};

ForecastHourlyCol.propTypes = {
  hour: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
};
