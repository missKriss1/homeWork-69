
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store.ts';
import { fetchShowFilmAll } from '../../store/ShowFilmSlice/ShowFilmSlice.ts';
import { Show } from '../../types';

const Home = () => {
  const shows = useSelector((state: RootState) => state.show.shows);
  const [show, setShow] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (show.length > 2) {
      dispatch(fetchShowFilmAll(show));
    }
  }, [show, dispatch]);

  const onSearchAutoComlete = (query: string) => {
    setShow(query);
  };

  const onSelectAutocomplite = (item: Show) => {
    navigate(`/shows/${item.id}`);
  };

  const resultFormatAutocomplete = (item: { name: string }) => {
    return <span>{item.name}</span>;
  };

  const showItems = shows.map((show) => ({
    id: show.id,
    name: show.name,
  }));

  return (
    <div className="row mt-4">
      <div className="col-3">
        <h2>Search for TV Show:</h2>
      </div>
      <div className="col-3 mt-2">
        <ReactSearchAutocomplete
          items={showItems}
          onSearch={onSearchAutoComlete}
          onSelect={onSelectAutocomplite}
          autoFocus
          formatResult={resultFormatAutocomplete}
          placeholder="Search film..."
        />
      </div>
    </div>
  );
};

export default Home;
