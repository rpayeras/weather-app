import React from "react";
import styles from "./ForecastDailyRow.module.css";
import PropTypes from "prop-types";

export const ForecastDailyRow = ({ icon, text, date, maxTempC, minTempC }) => {
  return (
    <li className={styles.forecast__dailyrow}>
      <div>
        <img src={icon} alt={text} />
      </div>
      <div>{date}</div>
      <div>
        {maxTempC}º / {minTempC}º
      </div>
    </li>
  );
};

ForecastDailyRow.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  maxTempC: PropTypes.number.isRequired,
  minTempC: PropTypes.number.isRequired,
};
