
import { Route, Routes } from 'react-router-dom';
import Home from './Container /Home/Home.tsx';
import ShowFilmBlock from './Components /ShowBlockFilm/ShowBlockFilm.tsx';
import TollBar from './Components /TollBar/TollBar.tsx';

const App = () => {
 return (
   <div className="container">
     <header>
       <TollBar/>
     </header>
     <main>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/show" element={<Home/>}/>
         <Route path="/shows/:id" element={<ShowFilmBlock/>}/>
       </Routes>
     </main>
   </div>
 );
};

export default App;
