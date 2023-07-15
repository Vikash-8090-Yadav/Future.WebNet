import { useEffect, useState } from 'react';
import './Home.scss'
import Row from './Row';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {MdViewList} from 'react-icons/md';
import {FaPlay} from 'react-icons/fa';

const apiKey = "17eb73a253982d09780f38a6bc0a962e";
const imgUrl = 'https://image.tmdb.org/t/p/original/'
const url = 'https://api.themoviedb.org/3/movie/';
const z = 13;

export default function Home() {

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [popular, setPopular] = useState([]);
    const [toprated, setToprated] = useState([]);
    const [nowplaying, setnowplaying] = useState([]);
    const [genre, setgenre] = useState([]);

    useEffect(() => {

        const fetchupcomingMovies = async () => {
            const { data: { results } } = await axios.get(`${url}/upcoming?api_key=${apiKey}`);
            setUpcomingMovies(results);
        }


        const fetchPopular = async () => {
            const { data: { results } } = await axios.get(`${url}/popular?api_key=${apiKey}`);
            setPopular(results);
        }


        const fetchTopRated = async () => {
            const { data: { results } } = await axios.get(`${url}/top_rated?api_key=${apiKey}`);
            setToprated(results);
        }


        const fetchnowplaying = async () => {
            const { data: { results } } = await axios.get(`${url}/now_playing?api_key=${apiKey}`);
            setnowplaying(results);
        }

        const getAllgenre = async () => {
            const { data: { results } } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
            setgenre(results);
            console.log(results)
        }

        getAllgenre();
        fetchTopRated();
        fetchnowplaying();
        fetchPopular();
        fetchupcomingMovies();

    }, []);

    return (
        <section className='home'>

            <div className='banner'
                style={{
                    backgroundImage: popular[z] ? `url(${`${imgUrl}/${popular[z].poster_path}`})` : "none"
                }}
            >
                {/* <img src="https://miro.medium.com/v2/resize:fit:1400/1*5lyavS59mazOFnb55Z6znQ.png" alt="" /> */}
                <div style={{ margin: "50px" }}>
                    {
                        popular[z] && (
                            <h1>{popular[z].original_title}</h1>
                        )
                    }
                    {
                        popular[z] && (
                            <p>{popular[z].overview}</p>
                        )
                    }

                </div>

                <div>
                    <button className='btn'><FaPlay style={{fontSize:"0.8rem"}}/> Play </button>
                    <span> </span>
                    <button className='btn'><MdViewList style={{fontSize:"0.8rem"}}/> Wishlist </button>
                </div>
            </div>

            <Row title={"Upcoming Movies"} arr={upcomingMovies} />
            <Row title={"Popular on Netflix"} arr={popular} />
            <Row title={"Top Picks For You"} arr={toprated} />
            <Row title={"Now Playing"} arr={nowplaying} />

            <div className='genreBox'>
                {
                    genre?.map((item, i) => (
                        <Link to={`/genre/${item.id}`} key={i}>{item.name}</Link>
                    ))
                }
            </div>
        </section>
    );
}