function Card({
                  image: {id, largeImageURL, webformatURL, user},
                  isFavorite,
                  addToFavorite,
                  removeFromFavorite,
                  openModal
              }) {
    return (
        <div className="card">
            <img src={webformatURL} alt={user} onClick={() => openModal({largeImageURL, user})}/>
            {
                isFavorite ? <i className="fa-solid fa-heart" onClick={() => removeFromFavorite(id)}></i> :
                    <i className="fa-regular fa-heart" onClick={() => addToFavorite(id)}></i>
            }

        </div>
    );
}

export default Card;
