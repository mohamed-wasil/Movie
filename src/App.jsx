import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Layout from './Layout/Layout';
import Tv from './Pages/Tv/Tv.jsx';
import Home from './Pages/Home/Home';
import News from './Pages/News/News';
import Login from './Pages/Login/Login';
import Movie from './Pages/Movie/Movie';
import CastInfo from './Pages/CastInfo/CastInfo';
import Register from './Pages/Register/Register';
import TvCast from './Pages/Tv/TvCast/TvCast.jsx';
import Popular from './Pages/Movie/Popular/Popular';
import Seasons from './Pages/Tv/Seasons/Seasons.jsx';
import UpComing from './Pages/Movie/UpComing/UpComing';
import TvDetails from './Pages/Tv/TvDetails/TvDetails.jsx';
import TvPopular from './Pages/Tv/TvPopular/TvPopular.jsx';
import TopRated from './Pages/Movie/TopRated/TopRated.jsx';
import NowPlaying from './Pages/Movie/NowPlaying/NowPlaying';
import TvTopRated from './Pages/Tv/TvTopRated/TvTopRated.jsx';
import CastAndCrew from './Pages/Movie/CastAndCrew/CastAndCrew.jsx';
import MoviesDetails from './Pages/Movie/MoviesDetails/MoviesDetails.jsx';
import SeasonDetails from './Pages/Tv/Seasons/SeasonDetails/SeasonDetails.jsx';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage.jsx';
import Similar from './Pages/Movie/MoreMovies/Similar/Similar.jsx';
import Recomendation from './Pages/Movie/MoreMovies/Recomendation/Recomendation.jsx';
import TvSimilar from './Pages/Tv/MoreMovies/TvSimilar/TvSimilar.jsx';
import TvRecomendation from './Pages/Tv/MoreMovies/TvRecomendation/TvRecomendation.jsx';
import AiringToday from './Pages/Tv/AiringToday/AiringToday.jsx';
import OnAir from './Pages/Tv/OnAir/OnAir.jsx';
import SearchContextProvider from './Context/SearchContext.js';
import Search from './Pages/Search/Search.jsx';
import People from './Pages/People/People.jsx';



const myRouter = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: '/home', element: <Home /> },
      {
        path: '/movie', element: <Movie />, children: [
          { index: true, element: <Popular /> },
          { path: 'popular', element: <Popular /> },
          { path: 'nowplaying', element: <NowPlaying /> },
          { path: 'toprated', element: <TopRated /> },
          { path: 'upcoming', element: <UpComing /> },
        ]
      },
      {
        path: '/tv', element: <Tv />, children: [
          { index: true, element: <TvTopRated /> },
          { path: 'toprated', element: <TvTopRated /> },
          { path: 'popular', element: <TvPopular /> },
          { path: 'airingToday', element: <AiringToday /> },
          { path: 'onAir', element: <OnAir /> },
        ]
      },
      { path: '/similar/:movieID', element: <Similar /> },
      { path: '/recommendations/:movieID', element: <Recomendation /> },
      { path: '/tvSimilar/:movieID', element: <TvSimilar /> },
      { path: '/tvRecommendations/:movieID', element: <TvRecomendation /> },
      { path: '/seasons/:seriesID', element: <Seasons /> },
      { path: '/season/:seriesID/:seasonNumber', element: <SeasonDetails /> },
      { path: '/cast/:seriesName/:seriesID', element: <TvCast /> },
      { path: '/people', element: <People /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/search', element: <Search /> },
      { path: '/cast/:castID', element: <CastInfo /> },
      { path: '/moviesDetails/:id', element: <MoviesDetails /> },
      { path: '/tvDetails/:id', element: <TvDetails /> },
      { path: '/castandcrew/:movieID', element: <CastAndCrew /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> }
])


function App() {

  const queryClient = new QueryClient()
  return <>
    <SearchContextProvider >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={myRouter} />
      </QueryClientProvider>
    </SearchContextProvider>

  </>
}

export default App;
