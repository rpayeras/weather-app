export const Header = ({ location }) => {
  return (
    <header>
      <div>{location ? location.city : "Loading..."}</div>
      <nav>Menu</nav>
    </header>
  );
};
