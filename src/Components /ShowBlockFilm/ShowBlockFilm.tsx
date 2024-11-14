import { Link, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFilmByInfo } from '../../store/ShowFilmSlice/ShowFilmSlice.ts';
import Spinner from '../Spinner/Spinner.tsx';
import Home from '../../Container /Home/Home.tsx';


const ShowFilmBlock = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const showBlock = useSelector((state: RootState) => state.show.showBlock);
  const loading = useSelector((state: RootState) => state.show.loading);
  const error = useSelector((state: RootState) => state.show.error);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchFilmByInfo(params.id));
    }
  }, [dispatch, params.id]);

  if (error || !showBlock) {
    return <div>Show not found or there was an error</div>;
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ):(
        <>
          <Home/>
          <hr/>
          <div className="row mt-5">
            <div className="col-4">
              <img
                className="w-75"
                src={showBlock.image.original}
                alt={showBlock.name}
              />
            </div>
            <div className="col-8 mt-4">
              <h1>{showBlock.name}</h1>
              <div dangerouslySetInnerHTML={{__html: showBlock.summary}}/>
            </div>
          </div>
          <hr/>
          <div className="mt-4">
            <Link to='/' className="btn-primary btn">Back</Link>
          </div>
        </>
      )}
    </>
  );
};

export default ShowFilmBlock;
