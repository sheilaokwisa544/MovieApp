import MovieCard from "../components/MovieCard";
import React,{useState,useEffect} from "react";
import "../css/Home.css";
import { searchMovies,getPopularMovies } from "../services/api";

function Home (){

    const [searchQuery,setSearchquery] =useState(" ");

const [movies ,setMovies]= useState([]);
const [error,setError] = useState(null);
const [loading, setLoading]=useState(true);
 
useEffect (() => {
    const laodPopularMovies = async ()=> {
        try{
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies)
        } catch (err){
            console.log(err)
            setError("failed to laoad the movies...")
        }
        finally{
            setLoading(false)
        }
    }
    laodPopularMovies()
},
   [])
    
const handleSearch = async (e) =>{
    e.preventDefault()
    if(!searchQuery.trim()) return
    if(loading) return
    setLoading(true)
    try{
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)

    }catch{
        console.log(err)
        setError("failed to search...")

    }finally{
        setLoading(false)
    }


    setSearchquery("")

}


    return ( 
        <div className="home">
    <form action="" onSubmit={handleSearch} 
            className="search-form" >
    <input type="text" 
            placeholder="search for movies..." 
            className="search-input"
            value={searchQuery} 
            onChange={((e) =>setSearchquery (e.target.value))}/>
        <button type="submit" 
            className="search-button">search
        </button>
 </form>
        {error && <div className="error-message">{error}</div>}

        {loading ? (
            <div className="loading">loading...</div>
        ) : (
            <div className="movies-grid">
            {movies.map(( movie) => (
                      <MovieCard movie ={movie} key={movie.id}/> 
                 ))}      
            </div>
        )}
     </div> 
    ); 
}
export default Home