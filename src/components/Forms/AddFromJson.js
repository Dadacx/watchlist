import '../../styles/AddFromJson.css'
import { useRef, useState } from 'react'
import close from '../../images/close.svg'

const AddFromJson = ({ setInitialData, setShowAddFromJson }) => {
    const [error, setError] = useState(null)
    const jsonString = useRef(null)

    function confirm() {
        let json
        try {
            json = JSON.parse(jsonString.current.value)
            
            if(!json.type) throw new Error("Nieprawidłowy kod JSON do dodania filmu! Prawidłowy kod musi zawierać klucz 'type'.");
            if(json.type !== 'movie' && json.type !== 'film-series' && json.type !== 'series') throw new Error("Nieprawidłowa wartość klucza 'type'");

            setInitialData(json)
            setShowAddFromJson(false)
        } catch (err) {
            console.error(err)
            jsonString.current.classList.add('invalid')
            setError(`${err.message}`)
        }
    }
    return (
        <div className='from-json-box'>
            <div className='imgs-preview-close' onClick={() => setShowAddFromJson(false)}><img src={close} alt='close_icon' /></div>
            <h2>Wklej kod JSON w polu poniżej</h2>
            <textarea rows={10} ref={jsonString}></textarea>
            {error && <div className='json-error'>{error}</div>}
            <button className='from-json-btn' onClick={confirm}>Potwierdź</button>
        </div>
    )
}

export default AddFromJson