const Modal = ({setIsModalOpen, image:{largeImageURL, user}}) => {
    return (
        <div className="modal">
            <div className="modal__btn" onClick={()=>setIsModalOpen(false)}><i className="fa-solid fa-xmark"></i></div>
            <div className="modal__image">
                <img src={largeImageURL} alt={user}/>
            </div>
        </div>
    );
};

export default Modal;
