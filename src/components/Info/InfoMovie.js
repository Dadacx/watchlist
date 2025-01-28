import { Link } from "react-router-dom";

const InfoMovie = ({ movieData }) => {
    return (
        <><div className='short-info'>
            <img className='info-img' alt='info-image' src={movieData.imgs.split('\n')[0]} />
            <div className='content'>
                <span className='info-title'>{movieData.title}</span>
                <span className='info-description'>{movieData.description}</span>
            </div>
        </div><div className='info-table'>
                <table className='info-table'>
                    <tbody>
                        <tr><td>orginalny tytuł</td><td>{movieData.original_title}</td></tr>
                        <tr><td>rok premiery</td><td>{movieData.year}</td></tr>
                        <tr><td>czas trwania</td><td>{movieData.duration}</td></tr>
                        <tr><td>Link do filmweb</td><td><Link target='_blank' to={movieData.link}>Link</Link></td></tr>
                    </tbody>
                </table>
            </div></>
    );
}

export default InfoMovie;