import styles from "./ForecastNow.module.css";

export const ForecastNow = ({ data }) => {
  const { tempC, text } = data;

  return (
    <section className={styles.forecast__current}>
      <h1>{tempC}</h1>
      <h2>{text}</h2>
    </section>
  );
};
