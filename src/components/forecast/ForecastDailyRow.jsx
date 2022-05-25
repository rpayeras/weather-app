import React from "react";
import styles from "./ForecastDailyRow.module.css";

export const ForecastDailyRow = ({ icon, text, date, maxTempC, minTempC }) => {
  return (
    <li className={styles.forecast__dailyrow}>
      <div>
        <img src={icon} alt={text} />
      </div>
      <div>{date}</div>
      <div>
        {Math.trunc(maxTempC)}º / {Math.trunc(minTempC)}º
      </div>
    </li>
  );
};
