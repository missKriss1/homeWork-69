import { Link } from "react-router-dom";

const TollBar = () => {
  return (
    <div>
      <div>
        <nav className="navbar navbar-dark bg-primary ">
          <div className="container-fluid d-flex justify-content-between">
            <div>
              <Link to="/" className="navbar-brand text-white fw-bold">
                TV shows
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default TollBar;
