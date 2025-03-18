import { Link } from "react-router-dom";

const InfoFilmSeries = ({ movieData }) => {
    if (typeof movieData.movies === 'string') movieData.movies = JSON.parse(movieData.movies)
    return (
        <>
            <div className='short-info'>
                <img className='info-img' alt='info-image' src={movieData.imgs.split('\n')[0]} />
                <div className='content'>
                    <span className='info-title'>{movieData.title}</span>
                    <span className='info-description'>{movieData.description}</span>
                </div>
            </div>
            <div className='info-table'>
                <table className='info-table'>
                    <tbody>
                        <tr><td colSpan={5}>Lista filmów z serii ({movieData.movies.length})</td></tr>
                        {movieData.movies.map((item, i) => <tr key={`movie-${i}`}>
                            <td>{item.title}</td>
                            <td>{item.year}</td>
                            <td>{item.duration}</td>
                            <td>{item.genre}</td>
                            <td><Link target='_blank' to={item.link}>Link</Link></td>
                        </tr>)}
                    </tbody>
                </table>
            </div></>
    );
}

export default InfoFilmSeries;