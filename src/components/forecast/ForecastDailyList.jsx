import React from "react";
import { ForecastDailyRow } from "./ForecastDailyRow";
import PropTypes from "prop-types";

import styles from "./ForecastDailyList.module.css";

export const ForecastDailyList = ({ data }) => {
  return (
    <section>
      {!data.length ? (
        "Loading ..."
      ) : (
        <ul className={styles.forecast__dailylist}>
          {data.map((item, idx) => (
            <ForecastDailyRow key={"daily-" + idx} {...item} />
          ))}
        </ul>
      )}
    </section>
  );
};

ForecastDailyList.propTypes = {
  data: PropTypes.array.isRequired,
};
