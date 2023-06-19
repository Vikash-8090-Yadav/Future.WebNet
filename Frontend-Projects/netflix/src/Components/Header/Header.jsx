import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import {RiSearch2Line} from 'react-icons/ri'

export default function Header() {
    return (
        <div className="header">
            <img src={logo} alt="Not Available" />

            <div className='content'>
                <Link to='/tvshows'>TV Shows</Link>
                <Link to='/tvshows'>Movies</Link>
                <Link to='/tvshows'>Recently Added</Link>
                <Link to='/tvshows'>My List</Link>
            </div>

            <RiSearch2Line style={{color:"white", width: "3%", height: "55%", cursor:"pointer"}}/>
        </div>
    );
}