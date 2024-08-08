// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import md5 from 'md5';



const PUBLIC_KEY = 'a374491c22342936464e41137fef9616';
const PRIVATE_KEY ='56a57d615e446cbe2cf66aec1986c21772fc29fe';


const CharacterDetail = () => {
  const { id } = useParams();
  const [characterDetail, setCharacterDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetail = async  () => {
      const ts = new Date().getTime();
      const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}`, {
          params: {
            apikey: PUBLIC_KEY,
            ts,
            hash,
          },
        });

        console.log(response.data.data.results[0])
        setCharacterDetail(response.data.data.results[0]);
        setLoading(false);
      } catch (error) {
        setError('Error fetching character details');
        console.error('Error fetching character details', error);
        setLoading(false);
      }
    
    };

    if(id) {
      fetchCharacterDetail();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ textAlign: 'center'}}>
      {characterDetail ? (
        <>
          <h2>{characterDetail.name}</h2>
          <img
            src={`${characterDetail.thumbnail.path}.${characterDetail.thumbnail.extension}`}
            alt={characterDetail.name}
            style={{ width: '200px', height: 'auto' }}
          />
          <p>{characterDetail.description || 'No description available.'}</p>
          <h3>Comics:</h3>
          <ul>
            {characterDetail.comics.items.map((comic) => (
              <li key={comic.resourceURI}>{comic.name}</li>
            ))}
          </ul>
       </>
     ) : (
       <p>No character details found</p>
      )}
    </div>
  );
};


export default CharacterDetail; 
  
