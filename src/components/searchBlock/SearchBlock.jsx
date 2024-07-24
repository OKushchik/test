import './searchBlock.css'
import {useRef, useState} from "react";

export const SearchBlock = ({setData, isFavorite, setIsFavorite}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const inputRef = useRef('');
    const filterDataByFavorite = () => {
        setIsFavorite(!isFavorite)
    }

    const searchImages = (searchVal) => {
        if (searchVal) {
            const URL = "https://pixabay.com/api/?key=" + import.meta.env.VITE_IMAGE_API_KEY + "&q=" + encodeURIComponent(searchVal);
            fetch(URL, {
                method: "GET"
            })
                .then((response) => response.json())
                .then((data) => {
                    setData(data.hits)
                    setIsFavorite(false)
                    setIsLoaded(true)

                })
                .catch((error) => console.log(error))
        }
    }

    return (
        <div className={`searchBlock ${!isLoaded ? "middle" : ""}`}>
            <input className='searchInput' ref={inputRef}/>
            <button className='btn searchBtn' onClick={() => searchImages(inputRef.current.value)}>Search</button>
            <button className='btn favoriteBtn'
                    onClick={filterDataByFavorite}>{isFavorite ? 'Show All' : 'My Favorite'}</button>
        </div>
    );
};
