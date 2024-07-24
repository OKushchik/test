import {useEffect, useRef, useState} from 'react'
import './App.css'
import Card from "./components/Card.jsx";
import {getParseFromLocalStorage, setLocalStorage} from "./utils/storageUtils.js";
import Modal from "./components/Modal.jsx";

function App() {
    const [data, setData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [favoriteImages, setFavoriteImages] = useState([]);
    const [chosenImage, setChosenImage] = useState();
    const inputRef = useRef('');

    useEffect(() => {
        if (localStorage.getItem("favoriteImages")) {
            const favoriteImages = getParseFromLocalStorage("favoriteImages")
            setFavoriteImages(favoriteImages)
        }
    }, [])

    const addToFavorite = (id) => {
        setFavoriteImages((prevState) => {
            setLocalStorage("favoriteImages", [...prevState, id])
            return [...prevState, id]
        })
    }

    const removeFromFavorite = (id) => {
        setFavoriteImages((prevState) => prevState.filter((el) => el !== id))
    }

    const filterDataByFavorite = () => {
        setIsFiltered(!isFiltered)
    }

    const openModal = (el) => {
        setChosenImage(el)
        setIsModalOpen(true)
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
                    setIsFiltered(false)
                    setIsLoading(false)

                })
                .catch((error) => console.log(error))
        }
    }

    const getRenderedData = (isFiltered) => {
        return isFiltered ? data.filter((el) => favoriteImages.includes(el.id)) : data
    }

    return (
        <>
            <div className={`searchField ${isLoading ? "middle" : ""}`}>
                <input className='searchInput' ref={inputRef}/>
                <button className='btn searchBtn' onClick={() => searchImages(inputRef.current.value)}>Search</button>
                <button className='btn favoriteBtn'
                        onClick={filterDataByFavorite}>{isFiltered ? 'Show All' : 'My Favorite'}</button>
            </div>
            <div className="classContainer">
                {
                    getRenderedData(isFiltered).map((el) => {
                        return (
                            <Card key={el.id} image={el}
                                  isFavorite={favoriteImages.includes(el.id)} addToFavorite={addToFavorite}
                                  removeFromFavorite={removeFromFavorite} openModal={openModal}/>

                        )
                    })
                }
            </div>
            {
                isModalOpen && <Modal setIsModalOpen={setIsModalOpen} image={chosenImage}/>
            }
        </>
    )
}

export default App;
