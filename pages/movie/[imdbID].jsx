export default function Movies({ data }) {
  return (
    <div>
      <div className='MovieContainer'>
        <a className="SearchMoviesContainer_a" href="../index.jsx">Home</a>  
        <h1>Here's some information about:<br/></h1>
        <h2>{data.Title}</h2>
        <img src={data.Poster}></img>
        <br />
        <ul className='MovieContainer_ul'>
          <h2>{data.Title}</h2>
          <li><b>Year:</b> {data.Year}</li>
          <li><b>Release Date:</b> {data.Released}</li>
          <li><b>Runtime:</b> {data.Runtime}</li>
          <li><b>Genre:</b> {data.Genre}</li>
          <li><b>Director:</b> {data.Director}</li>
          <li><b>Writer:</b> {data.Writer}</li>
          <li><b>Cast:</b> {data.Actors}</li>
          <li><b>Plot:</b> {data.Plot}</li>
          <li><b>Language:</b> {data.Language}</li>
          <li><b>Country:</b> {data.Country}</li>
          <li><b>Awards:</b> {data.Awards}</li>
          <li><b>Rated:</b> {data.Rated}</li>
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { imdbID } = context.query;
  const res = await fetch(`http://www.omdbapi.com/?apikey=57d69c78&i=${imdbID}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}