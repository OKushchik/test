import React from 'react';

function Card({image, imageId, isFavorite, addToFavorite, removeFromFavorite}) {


    return (
        <div className="card">
            <img src={image} alt="img"/>
            {
                isFavorite ? <i className="fa-solid fa-heart" onClick={()=>removeFromFavorite(imageId)}></i> :
                             <i className="fa-regular fa-heart" onClick={()=>addToFavorite(imageId)}></i>
            }

        </div>
    );
}

export default Card;
