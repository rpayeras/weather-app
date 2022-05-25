import { ForecastHourlyCol } from "./ForecastHourlyCol";
import styles from "./ForecastHourlyList.module.css";

export const ForecastHourlyList = ({ data }) => {
  return (
    <section>
      <ul className={styles.forecast__hourlylist}>
        {data.map((item, hour) => (
          <ForecastHourlyCol key={"hourly-" + hour} {...item} />
        ))}
      </ul>
    </section>
  );
};
