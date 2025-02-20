import { useEffect, useState } from 'react';
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`;

export function App() {    
    const [fact, setFact] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [factError, setFactError] = useState();

    // First effect with one responsability
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => {
            if (!res.ok) throw new Error('Error fetching fact');//Sending error response to the catch block
            return res.json();
        })
        .then(data => {
            const { fact } = data;
            setFact(fact);
        })
        .catch(error => {
            // Receiving error response
            // Getting error from the request like lost connectivity
            setFactError(error.message);            
        })
    }, []);

    //Second effect with other responsability
    useEffect(() => {
        if (!fact) return;

        const threeFirstWords = fact.split(' ').slice(0, 3).join(' ');
        console.log(threeFirstWords);

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
        .then(res => res.json())
        .then(response => {
            console.log(JSON.stringify(response));

            const { url } = response;
            setImageUrl(url);
        })
    }, [fact]);

    return (
      <main>
        <h1>Kittens application</h1>
        <section>
          {fact && <p>{fact}</p>}
          {factError && <p>{factError}</p>}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`Image extracted using the first three words for ${fact}`}
            />
          )}
        </section>
      </main>
    );
}