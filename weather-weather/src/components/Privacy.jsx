import { Link } from 'react-router-dom';

const Header = ({ location, setLocation, fetchWeather }) => {
  return (
    <header>
      <h1>Weather App</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms and Conditions</Link>
      </nav>
      {/* Additional header content */}
    </header>
  );
};

export default Header;
