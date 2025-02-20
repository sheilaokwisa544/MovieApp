import { createContext,useState,useEffect, useContext } from "react";


const MovieContext = createContext()

export const useMovieContext =()=> useContext(MovieContext)


export const MovieProvider =({children})=>{
    const [favorites, setFavorites]= useState([])

    useEffect(() => {
         const storedFavs = localStorage.getItem("Favorites")

         if (storedFavs) setFavorites(JSON.parse(storedFavs))
    },[])

    useEffect (() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    },[favorites])

    const AddtoFavs = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFavs =(movieId) => {
        setFavorites(prev => prev.filter (movie =>movie.id !== movieId)) 
    }
     const isFavs =(movieId) =>{
        return favorites.some(movie=> movie.id ===movieId)

     } 

     const value = {
        favorites,
        AddtoFavs,
        removeFavs,
        isFavs
     }

    return <MovieContext.Provider value = {value}>
        {children}
    </MovieContext.Provider>
}