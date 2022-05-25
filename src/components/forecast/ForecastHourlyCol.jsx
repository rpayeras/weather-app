export const ForecastHourlyCol = ({ hour, icon, text, date, temp }) => {
  return (
    <li>
      <div>{hour}</div>
      <div>
        <img src={icon} alt={text} />
      </div>
      <div>{temp}º</div>
    </li>
  );
};
