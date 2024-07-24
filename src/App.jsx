import {useEffect, useRef, useState} from 'react'
import './App.css'
import Card from "./components/Card.jsx";

function App() {
    const [data, setData] = useState([]);
    const [isFiltered,setIsFiltered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchVal, setSearchVal] = useState('');
    const [favoriteImages, setFavoriteImages] = useState([]);
    const inputRef = useRef('');

    useEffect(()=>{
        if(localStorage.getItem("favoriteImages")) {
            const favoriteImages = JSON.parse(localStorage.getItem("favoriteImages"))
            setFavoriteImages(favoriteImages)
        }
    }, [])

    useEffect(()=>{
        if(searchVal){
            fetchFunc()
        }
    }, [searchVal])

    useEffect(()=>{
        localStorage.setItem("favoriteImages", JSON.stringify(favoriteImages));
    }, [favoriteImages])

    const fetchFunc =()=> {
        const URL = "https://pixabay.com/api/?key="+import.meta.env.VITE_IMAGE_API_KEY+"&q="+encodeURIComponent(searchVal);
        fetch(URL,{
            method: "GET"
        })
            .then((response)=>response.json())
            .then((data)=>{
                setTimeout(()=>{
                    setData(data.hits)
                },500)
                setIsLoading(false)
            })
            .catch((error)=>console.log(error))
    }

    const addToFavorite =(id)=>{
        setFavoriteImages((prevState)=>[...prevState,id])
    }

    const removeFromFavorite=(id)=>{
        setFavoriteImages((prevState)=>prevState.filter((el)=>el!==id))
    }

    const filterDataByFavorite=()=>{
        setIsFiltered(!isFiltered)
    }

    const getRenderedData=(isFiltered)=>{
        return isFiltered ? data.filter((el)=>favoriteImages.includes(el.id)) : data
    }

    return (
    <>
        <div className={`searchField ${isLoading ? "middle" : ""}`}>
            <input ref={inputRef} />
            <button onClick={()=>setSearchVal(inputRef.current.value)}>Search</button>
            <button onClick={filterDataByFavorite}>My Favorite</button>
        </div>
        <div className="classContainer">
            {
                 getRenderedData(isFiltered).map((el) => {
                     return (
                         <Card key={el.id} image={el.largeImageURL} imageId={el.id}
                               isFavorite={favoriteImages.includes(el.id)} addToFavorite={addToFavorite}
                               removeFromFavorite={removeFromFavorite}/>
                     )
                 })
            }
        </div>
    </>
  )
}

export default App;