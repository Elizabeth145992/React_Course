import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorComponent from './ErrorComponent.jsx';

import { fetchAvailablePlaces } from '../http.js';
import { sortPlacesByDistance } from '../loc.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function getPlaces(){
       setFetchingData(true);
      try {
        const resData = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position => {
          const {latitude, longitude} = position.coords;
          const sortedPlaces = sortPlacesByDistance(resData, latitude, longitude);
          setAvailablePlaces(sortedPlaces);
          setFetchingData(false);
        }));
      } catch (error) {
        setError({message: error.message || 'Something went wrong!'});
      }
      setFetchingData(false);
    }

    getPlaces();
  }, []);

  if(error){
    return <ErrorComponent title="An error occurred!" message={error.message} onConfirm={() => setError(null)} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={fetchingData}
      loadingText={'Loading places...'}
    />
  );
}
