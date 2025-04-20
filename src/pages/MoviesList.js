import '../styles/List.css';
import List from '../components/List';
import { DeleteFetch, MultipleDeleteFetch, AddFetch, EditFetch, AddFavoriteFetch } from '../components/Fetch';

const MoviesList = ({ data, setData, error, setFavoriteData, setRefreshData }) => {
  return (
    <>
      {data && <List
        data={data}
        setData={setData}
        error={error}
        setFavoriteData={setFavoriteData}
        title="Filmy do obejrzenia"
        fetchAdd={AddFetch}
        fetchEdit={EditFetch}
        fetchDelete={DeleteFetch}
        fetchMultipleDelete={MultipleDeleteFetch}
        fetchAddFavorite={AddFavoriteFetch}
        isFavoriteList={false}
        setRefreshData={setRefreshData}
      />}
    </>
  );
};

export default MoviesList;