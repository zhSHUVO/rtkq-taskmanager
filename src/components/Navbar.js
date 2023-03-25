import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { searched } from '../features/filter/filterSlice';

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
            onChange={(e) => dispatch(searched(e.target.value))}
          />
        </div>
      </div>
    </nav>
  );
}
