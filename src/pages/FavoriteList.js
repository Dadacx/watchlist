import '../styles/List.css';
import List from '../components/List';
import { DeleteFavoriteFetch, MultipleDeleteFavoriteFetch, AddFavoriteFetch, EditFavoriteFetch } from '../components/Fetch';

const FavoriteList = ({ data, setData, error, setRefreshData }) => {
  return (
    <>
      {data && <List
        data={data}
        setData={setData}
        error={error}
        setFavoriteData={null} // Ulubione nie mają własnych ulubionych
        title="Ulubione filmy"
        fetchAdd={AddFavoriteFetch}
        fetchEdit={EditFavoriteFetch}
        fetchDelete={DeleteFavoriteFetch}
        fetchMultipleDelete={MultipleDeleteFavoriteFetch}
        fetchAddFavorite={null} // Nie można dodawać ulubionych do ulubionych
        isFavoriteList={true}
        setRefreshData={setRefreshData}
      />}
    </>
  );
};

export default FavoriteList;