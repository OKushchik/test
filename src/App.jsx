import {useEffect, useState} from 'react'
import './App.css'
import Card from "./components/card/Card.jsx";
import {getFromLocalStorage, getParseFromLocalStorage, setLocalStorage} from "./utils/storageUtils.js";
import Modal from "./components/modal/Modal.jsx";
import {SearchBlock} from "./components/searchBlock/SearchBlock.jsx";

function App() {
    const [data, setData] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [favoriteImages, setFavoriteImages] = useState([]);
    const [chosenImage, setChosenImage] = useState();

    useEffect(() => {
        if (getFromLocalStorage("favoriteImages")) {
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
        setFavoriteImages((prevState) => {
            const filteredArray = prevState.filter((el) => el !== id)
            setLocalStorage("favoriteImages", [filteredArray])
            return filteredArray
        })
    }

    const openModal = (el) => {
        setChosenImage(el)
        setIsModalOpen(true)
    }

    const getRenderedData = (isFavorite) => {
        return isFavorite ? data.filter((el) => favoriteImages.includes(el.id)) : data
    }

    return (
        <>
            <SearchBlock isFavorite={isFavorite} setData={setData}
                         setIsFavorite={setIsFavorite}/>


            <div className="imagesContainer">
                {
                    getRenderedData(isFavorite).map((el) => {
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
