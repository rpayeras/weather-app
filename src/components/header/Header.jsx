import { useContext, useState } from "react";
import { ForecastContext } from "../../context/forecast/ForecastContext";
import styles from "./Header.module.css";
import "./Header.css";

export const Header = () => {
  const {
    location,
    loading,
    refreshlocation,
    getAutocompleteLocation,
    getForecast,
  } = useContext(ForecastContext);

  const [locationsList, setLocationsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCity, setCurrentCity] = useState(
    location.city || location.name
  );
  const [inputValue, setInputValue] = useState("");

  const onChangeInput = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 2) {
      const locations = await getAutocompleteLocation(value);
      setLocationsList(locations);
    }
  };

  const onClickLocation = (e) => {
    const id = Number(e.target.id);
    const location = locationsList.find((location) => location.id === id);

    setCurrentCity(location.name);
    refreshlocation(location);
    setLocationsList([]);
    setShowModal(false);
    setInputValue("");
  };

  const onClickRefresh = async () => {
    getForecast();
  };

  const onClickCity = (e) => {
    setShowModal(!showModal);
  };

  return (
    <header>
      <div>
        <div className={styles.header__title} onClick={onClickCity}>
          {currentCity}
        </div>
        <div className={"header__search " + (showModal ? "show" : "")}>
          <input
            className={styles.header__input}
            type="text"
            placeholder="Type a city name..."
            onChange={onChangeInput}
            value={inputValue}
          />
          <ul className={styles.header__list}>
            {locationsList.map((item) => (
              <li id={item.id} key={item.id} onClick={onClickLocation}>
                {item.name} - {item.country}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={`header__refresh ${loading ? "active" : ""}`}
        onClick={onClickRefresh}
      >
        <img
          style={{ width: "25px", bacgkroundColor: "white" }}
          src="/assets/img/refresh.svg"
          alt="reload"
        />
      </div>
    </header>
  );
};
