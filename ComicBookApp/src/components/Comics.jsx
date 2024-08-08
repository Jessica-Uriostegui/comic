import {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import md5 from 'md5';

 const PUBLIC_KEY = 'a374491c22342936464e41137fef9616';
 const PRIVATE_KEY = '56a57d615e446cbe2cf66aec1986c21772fc29fe';

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] =useState(true);
  const [error,setError] = useState(null);

  useEffect(() => {
    const fetchComics = async () => {
      const ts = new Date().getTime();
      const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

      try {
        const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
          params: {
            apikey:PUBLIC_KEY,
            ts,
            hash,
            limit: 15,
          },
        });
        setComics(response.data.data.results);
        setLoading(false);
      } catch (error) {
        setError('Error fetching comics');
        console.error('Error fetching comics', error);
      }
    };

    fetchComics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <div>
      <h1>Comics</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        {comics.map((comic) => (
          <div key={comic.id} style={{ margin: '10px', width: '150px'}}>
            <Link to={`/comics/${comic.id}`}>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              style={{ width: '100px', cursor: 'pointer' }}
            />
            <p>{comic.title}</p>
            </Link>
          </div>
        ))}  
      </div > 
    </div>
  );
};
      
      

export default Comics;