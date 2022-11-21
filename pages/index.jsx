import useSWR from 'swr';
import { useState } from 'react';
import Link from 'next/link';

export default function Movies() {
  const [url, setUrl] = useState('');
  const { data, error } = useSWR(url, theFetcher);
  const onClickHandler = (e) => {
    e.preventDefault();
    if (url === '') setUrl('http://www.omdbapi.com/?apikey=57d69c78&s=Indiana Jones');
    else setUrl('');
  };

  return (
    <div>
      <TheLink url={url} handler={onClickHandler} />
      <TheMovies data={error ? { error: 'Error, there was a problem 🙁' } : data ? data : { Search: '' }} show={url !== ''} />
    </div>
  );
}

async function theFetcher(url) {
  if (url === null || url === '') return { Search: '' };
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export function TheMovies({ data, show }) {
  if (!show) return <div></div>;
  if (data.error) return <div className='Movies_error' >Error, there was a problem in the request 🙁</div>;
  if (data.Search === '') return <div className='Movies_loading'>Loading...</div>;
  return (
    <div className='MoviesContainer'>
      <h1>Here's what i got for 'Indiana Jones' 🤠</h1>
      <ul className='MoviesContainer_ul'>
        {data.Search.map((m) => (
          <li className='MoviesContainer_ul_li' key={m.imdbID}>
            <Link className='MoviesContainer_ul_li_a' href={`/movie/${m.imdbID}`}>{m.Title} | {m.Year}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TheLink({ url, handler }) {
  return (
    <div className="MoviesContainer2">
      <h1 className='MoviesContainer2_h1'>Welcome my friend🫠</h1>
      <Link className='MoviesContainer2_a' href='index.jsx' onClick={handler}>{url === '' ? 'Show' : 'Hide'}</Link>
      <Link className='MoviesContainer2_a' href='searchmovies/[key].jsx'>Search for a movie</Link>
    </div>
  );
}