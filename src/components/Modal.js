import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'

export const ModalWrapper = ({ pointsLeft, animal, image, specialImg, handleCapture, closeModal, openModal, modalIsOpen}) => {
  const leveledUp = pointsLeft === 0

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      maxWidth: '300px',
      maxHeight: '305px',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      {leveledUp ? (
        <LeveledUpModal animal={animal} specialImg={specialImg} />
      ) : (
        <RegularModal
          animal={animal}
          image={image}
          pointsLeft={pointsLeft}
          handleCapture={handleCapture}
          closeModal={closeModal}
        />
      )}
    </Modal>
  )
}

const LeveledUpModal = ({ animal, specialImg }) => {
  const navigate = useNavigate()

  const handleNavToSpecialAnimals = (event) => {
    navigate('/special-animal-lobby')
  }
  return (
    <div>
      <h2 className="modalTitle">`You've leveled up your ${animal}!`</h2>
      <div className="modalImageDiv">
        <img
          className="modalImage"
          src={specialImg}
          alt="your-new-animal"
        />
      </div>
      <button className="modalButtonRight" onClick={handleNavToSpecialAnimals}>
        Capture
      </button>
    </div>
  )
}

const RegularModal = ({ animal, image, pointsLeft, handleCapture, closeModal }) => {
  const readyToLevelUp = pointsLeft === 1
  const pointCountText = readyToLevelUp
    ? 'Last one until level up'
    : `Collect ${pointsLeft} more to level up`

  return (
    <div>
      <h2 className="modalTitle">You caught a {animal}!</h2>
      <div className="modalImageDiv">
        <img className="modalImage" src={image} alt="your-new-animal"></img>
      </div>
      <div className="pointCountModal">{pointCountText}</div>
      <div className="modalChoice">What would you like to do? </div>
      <button className="modalButtonLeft" onClick={closeModal}>
        Release
      </button>
      <button className="modalButtonRight" onClick={handleCapture}>
        Capture
      </button>
    </div>
  )
}
