import '../styles/ContextMenu.css';
import delete_icon from '../images/delete.svg';
import multiple_delete_icon from '../images/multiple_delete.svg';
import edit_icon from '../images/edit.svg';
import favorite_icon from '../images/favorite.svg';

const ContextMenu = ({ menuPosition, setEditMovie, movies, selectedCardId, setMenuVisible, deleteMovie, deleteMultipleMovies,
    isFavoriteList, addFavorite, handleMultipleDelete }) => {

    return (
        <div id='menu' className="menu" onClick={(e) => e.stopPropagation()}
            style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}>
            <img src={edit_icon} alt='edit_icon' className='menu-img' width={25} height={25} title='Edytuj'
                onClick={() => { setEditMovie(movies.filter(movie => movie.id === selectedCardId)[0].type); setMenuVisible(false) }} />
            <img src={delete_icon} alt='delete_icon' className='menu-img' width={25} height={25} title='Usuń'
                onClick={() => { deleteMovie(selectedCardId); setMenuVisible(false) }} />
            <img src={multiple_delete_icon} alt='multiple_delete_icon' className='menu-img' width={25} height={25} title='Usuń kilka'
                onClick={() => { handleMultipleDelete(selectedCardId); setMenuVisible(false) }} />
            {!isFavoriteList && (
                <img src={favorite_icon} alt='favorite_icon' className='menu-img' width={25} height={25} title='Dodaj do ulubionych'
                    onClick={() => { addFavorite(selectedCardId); setMenuVisible(false) }} />
            )}
        </div>
    );
};

export default ContextMenu;
