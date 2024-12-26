import { Link } from "react-router-dom";

const InfoSeries = ({ movieData }) => {
    if (typeof movieData.episodes === 'string') movieData.episodes = JSON.parse(movieData.episodes)
    console.log(movieData)
    const DataInDetails = ({ data }) => {
        return (
            <div>
                {data.map((season, index) => (
                    <details className="info-details" key={index}>
                        <summary><span>Sezon {index + 1}</span></summary>
                        <ul>
                            {season.map((title, i) => (
                                <li key={i}>{title}</li>
                            ))}
                        </ul>
                    </details>
                ))}
            </div>
        );
    };
    return (
        <><div className='short-info'>
            <img className='info-img' alt='info-image' src={movieData.imgs.split('\n')[0]} />
            <div className='content'>
                <span className='info-title'>{movieData.title}</span>
                <span className='info-description'><DataInDetails data={movieData.episodes} /></span>
            </div>
        </div><div className='info-table'>
                <table className='info-table'>
                    <tbody>
                        <tr><td>orginalny tytuł</td><td>{movieData.originalTitle}</td></tr>
                        <tr><td>rok premiery</td><td>{movieData.year}</td></tr>
                        <tr><td>liczba sezonów</td><td>{movieData.episodes.length}</td></tr>
                        <tr><td>Link do filmweb</td><td><Link target='_blank' to={movieData.link}>Link</Link></td></tr>
                    </tbody>
                </table>
            </div></>
    );
}

export default InfoSeries;