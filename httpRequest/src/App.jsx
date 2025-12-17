import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import ErrorComponent from './components/ErrorComponent.jsx';

import { updateUserPlaces, fetchUserPlaces } from './http.js';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [errorUpdatedPlaces, setErrorUpdatedPlaces] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);
  const [error, setError] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function loadUserPlaces() {
      setFetchingData(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError({ message: error.message || 'Something went wrong to load user places!' });
      }
      setFetchingData(false);
    }
    loadUserPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try{
      await updateUserPlaces([selectedPlace, ...userPlaces, ]);
    }catch(error){
      setUserPlaces(userPlaces);
      setErrorUpdatedPlaces({message: error.message || 'Something went wrong to add place!'});
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      const placesToDeelete = userPlaces.filter((place) => place.id !== selectedPlace.current.id);
      await updateUserPlaces(placesToDeelete);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatedPlaces({ message: error.message || 'Something went wrong to delete place!' });
    }

    setModalIsOpen(false);
  }, [userPlaces]);

  return (
    <>
    <Modal open={errorUpdatedPlaces} onClose={() => setErrorUpdatedPlaces(null)}>
      {errorUpdatedPlaces && (
        <ErrorComponent 
          title="An error occurred!" 
          message={errorUpdatedPlaces.message} 
          onConfirm={() => setErrorUpdatedPlaces(null)} />
      )}
    </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <ErrorComponent title="An error occurred!" message={error.message} onConfirm={() => setError(null)} />}
        {!error && <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
          isLoading={fetchingData}
          loadingText="Loading your places..."
        />}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
