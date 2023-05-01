import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import '../styles/animal.css'
import { BsChatLeftFill } from 'react-icons/bs'
import Typewriter from 'typewriter-effect'
import { ModalWrapper } from './Modal.js'

function Animal({ weatherID, token }) {
  const [animal, setAnimal] = useState('')
  const [image, setImage] = useState('')
  const [variation, setVariation] = useState([])
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [pointsLeft, setPointsLeft] = useState(0)
  const [captureBoolean, setCaptureBoolean] = useState('')
  const [specialName, setSpecialName] = useState('')
  const [specialImg, setSpecialImg] = useState('')
  const [special, setSpecial] = useState([])
  const [showBubble, setShowBubble] = useState(false)
  const [modalClickedToCapture, setModalClickedToCapture] = useState(false)
  const [animalClicked, setAnimalClicked] = useState(false)
  const navigate = useNavigate()
  const showConfetti = pointsLeft === 0

  const customStylesConfetti = {
    width: '280px',
    height: '327px',
  }

  useEffect(() => {
    if (weatherID && token) {
      axios
        .get(
          `https://is-it-raining.herokuapp.com/weather-animal/${weatherID}/`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((response) => {
          setAnimal(response.data.name)
          setImage(response.data.image)
          setVariation(response.data.variation_type)
          setCaptureBoolean(response.data.can_capture)
          setPointsLeft(response.data.points_left_until_max)
          setSpecialName(response.data.special_animal[0].special_name)
          setSpecialImg(response.data.special_animal[0].image)

          // console.log(response.data.points_left_until_max)
          // console.log(response.data.can_capture)
          console.log(response.data.special_animal[0].image)
        })
    }
  }, [weatherID, token])

  const handleCapture = (event) => {
    axios
      .post(
        `https://is-it-raining.herokuapp.com/captured/${animal}/${variation}/`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        setPointsLeft(res.data.points)
        closeModal()
        if (pointsLeft > 1) {
          navigate('/animal-lobby')
        }
        console.log(res)
      })
  }

  function openModal() {
    setIsOpen(true)
    console.log('Modal opened.')
  }

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false)
    }, 10000)
    return () => clearTimeout(timer)
  }, [showBubble])

  const handleClick = () => {
    captureBoolean ? openModal() : setShowBubble(true)
  }

  return (
    <div className="animalDiv">
      <>
        {showBubble && (
          <div className="talkBubble">
            <div className="noClickWarningIcon">
              <div className="chatBoxDiv">
                <BsChatLeftFill />
              </div>
            </div>
            <div className="noClickWarningText">
              <div className="warningWords">
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString('Try again later.')
                      .pauseFor(1000)
                      .typeString(' You JUST caught me...')
                      .start()
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </>

      <div className={captureBoolean ? 'animalCanCapture' : 'animal'}>
        <img
          src={image}
          alt="corresponding-weather-animal"
          onClick={handleClick}
        />
      </div>
      {/* { showConfetti && <Confetti style={customStylesConfetti} /> */}
      <ModalWrapper
        pointsLeft={pointsLeft}
        animal={animal}
        image={image}
        specialImg={specialImg}
        handleCapture={handleCapture}
        closeModal={closeModal}
        openModal={openModal}
        modalIsOpen={modalIsOpen}
      />
    </div>
  )
}

export default Animal
