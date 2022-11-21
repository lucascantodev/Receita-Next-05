import Link from 'next/link';

const Movies = ({ data }) => {
  if (data.Error) return <div className='SearchMovies_error'>Error, there was a problem in the request 🙁</div>;
  if (!data) return <div className='SearchMovies_loading'>Loading...</div>;

  return (
    <div className="SearchMoviesContainer">
      <a className="SearchMoviesContainer_a" href="http://localhost:3000/index">Home</a>
      <h1>Search any movie you want 😁</h1>
      <br />
      <form>
      <input className='SearchMoviesContainer_form_input' placeholder="Type here" id="text" name="text" type="text"/>
      <input className='SearchMoviesContainer_form_submit' type="submit" value="Search"/>
      </form>
      <br />
      <br />

      <div className='SearchMoviesContainer2'>
        {data.Search.map(({ Title, Year, Poster }) => (
          <div key={Title}>
            <img alt={Title} src={Poster}></img>
            <br />
            <h2 className='SearchMoviesContainer2_h2__Title'>Name: {Title}</h2>
            <h2 className='SearchMoviesContainer2_h2__Year'>Release Date: {Year}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { text } = context.query;
  const res = await fetch(`http://www.omdbapi.com/?apikey=57d69c78&s=${text}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default Movies;