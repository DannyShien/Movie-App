import React, { Component } from 'react';
import axios from 'axios';
import NavBar from '../navbar/NavBar';
import HeroDisplay from '../heroDisplay/HeroDisplay';
import Genre from '../genre/GenreDisplay';
import './MovieApp.css';

class MovieApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			heroSectionData: [],
			action: [],
			adventure: [],
			anime: [],
			documentary: [],
			horror: [],
			scifi: [],
		}
	}

	componentDidMount() {
		this.getHeroSection()
		this.getMovieGenreIds()
	}

	getHeroSection = async () => {
		const TMDB = `${process.env.REACT_APP_TMDB_KEY}`;
		const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB}&language=en-US&page=1`);
		let popularMovie = response.data.results[0]
		// let popularMovies = response.data.results
		// 	.filter((i, index) => (index < 3))
		// 	.map((i, index) => {
		// 		return i
		// 	});
		this.setState ({
			heroSectionData: popularMovie
		});
	}


	// USE ASYNC AWAIT FOR THIS?????
	getMovieGenreIds = () => {
		const TMDB = `${process.env.REACT_APP_TMDB_KEY}`
		fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB}&language=en-US`)
			.then(r => { return r.json() })
			// NOTE: Remember to "return" the response!! This will save you hours of research. Lol
			// On the bright side, I learned a bit more about async/await! #nolosses #onlylessons
			.catch(err => { console.log(err) })
			.then(this.getGenresById)
	}

	getGenresById = (genreObj) => {
		const genreList= genreObj.genres
		const TMDB = `${process.env.REACT_APP_TMDB_KEY}`
		let actionId = genreList[0].id
		let adventureId = genreList[1].id
		// let animeId = genreList[2].id
		// let documentaryId = genreList[5].id
		// let horrorId = genreList[10].id
		// let sciFiId = genreList[14].id

		const actionGenre = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB}&language=en-US&sort_by=popularity.desc&certification_country=US&include_adult=false&include_video=true&page=1&with_genres=${actionId}`)
		const adventureGenre = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB}&language=en-US&sort_by=popularity.desc&certification_country=US&include_adult=false&include_video=true&page=1&with_genres=${adventureId}`)
		// const animeGenre = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB}&language=en-US&sort_by=popularity.desc&certification_country=US&include_adult=false&include_video=true&page=1&with_genres=${animeId}`)
		// const documentaryGenre = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB}&language=en-US&sort_by=popularity.desc&certification_country=US&include_adult=false&include_video=true&page=1&with_genres=${documentaryId}`)
		// const horrorGenre = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB}&language=en-US&sort_by=popularity.desc&certification_country=US&include_adult=false&include_video=true&page=1&with_genres=${horrorId}`)
		// const sciFiGenre = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB}&language=en-US&sort_by=popularity.desc&certification_country=US&include_adult=false&include_video=true&page=1&with_genres=${sciFiId}`)

		Promise.all([ actionGenre, adventureGenre,
			// animeGenre, documentaryGenre,
			// horrorGenre, sciFiGenre,
		])
			.then(values => { return Promise.all(values.map(r => r.json())) })
			.catch(error => {
				console.log('ERROR!')
				console.log(error)
			})
			.then(this.allGenres)
	}

	allGenres = ([ actionGenre, adventureGenre,
		// animeGenre, documentaryGenre,
		// horrorGenre, sciFiGenre
	]) => {
		// console.log(actionGenre)
		let Action = actionGenre.results
		let Adventure = adventureGenre.results
		// let Anime = animeGenre.results
		// let Documentary = documentaryGenre.results
		// let Horror = horrorGenre.results
		// let SciFi = sciFiGenre.results

		this.setState ({
			action: Action,
			adventure: Adventure,
			// anime: Anime,
			// documentary: Documentary,
			// horror: Horror,
			// scifi: SciFi,
		})
	}

	// TODO: Try and work logic for Genre component here and pass down to props..?
	// Maybe pass ...this.state to genreType?

	render() {
		return (
			<div className='landing'>
				{/* 
					NOTE: Would I actually want the navbar here/ to be place where ever I need it?? 
					NavBar still needs design work done. 
				*/}
				<NavBar /> 
				<HeroDisplay popularMovie={ this.state.heroSectionData } />
				<Genre
					genreType={ this.state.action }
					headerText='Action'
					type='Action'
				/>
				<Genre
					genreType={ this.state.adventure }
					headerText='Adventure'
					type='Adventure'
				/>
				{/* <Genre
					genreType={ this.state.anime }
					headerText='Anime'
					type='Anime'
				/>
				<Genre
					genreType={ this.state.documentary }
					headerText='Documentary'
					type='Documentary'
				/> */}
				{/* <Genre
					genreType={ this.state.horror }
					headerText='Horror'
					text='Horror'
				/>
				<Genre
					genreType={ this.state.scifi }
					headerText='SciFi'
					text='SciFi'
				/> */}
			</div>
		)
	}


}

export default MovieApp;