import {useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import md5 from 'md5';

const PUBLIC_KEY = 'a374491c22342936464e41137fef9616';
const PRIVATE_KEY = '56a57d615e446cbe2cf66aec1986c21772fc29fe';

const BrowseCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      const ts = new Date().getTime();
      const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

      try {
        const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
          params: {
            apikey:PUBLIC_KEY,
            ts,
            hash,
            limit: 15,
          },
        });
        setCharacters(response.data.data.results);
        setLoading(false);
      } catch (error) {
        setError('Error fetching characters');
        console.error('Error fetching characters', error);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Browse Characters</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
          {characters.map((character) => (
            <div key={character.id} style={{ margin: '10px', width: '150px'}}>
              <Link to={`/characters/${character.id}`}>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                style={{ width: '100px', cursor: 'pointer' }}
              />
              <p>{character.name}</p>
              </Link>
            </div>
          ))}
        </div>
    </div>
  );
};

export default BrowseCharacters;