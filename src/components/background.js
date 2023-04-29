import React, { useState, useEffect } from 'react'
import axios from 'axios'

function BackgroundImages({ weatherCode }) {
    const [image, setImage] = useState('')


    const customStyles = {
        textIndent: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',



    }

    useEffect(() => {
            axios.get(`https://is-it-raining.herokuapp.com/background/?code=${weatherCode}`) 
                .then((response) => {
                    setImage(response.data[0].background_image)
                })
    }, [weatherCode])

    return (
        <div className='background-image'>
            <img src={image} alt='corresponding-weather-background' style={customStyles} onerror="this.style.display='none'" />
        </div>
    )

}

export default BackgroundImages;