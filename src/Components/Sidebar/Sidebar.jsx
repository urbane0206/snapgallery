import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom'; 
import game_icon from '../../assets/game_icon.png';
import automobiles from '../../assets/automobiles.png';
import sports from '../../assets/sports.png';
import entertainment from '../../assets/entertainment.png';
import tech from '../../assets/tech.png';
import music from '../../assets/music.png';
import blogs from '../../assets/blogs.png';
import news from '../../assets/news.png';
import jack from '../../assets/jack.png';
import simon from '../../assets/simon.png';
import tom from '../../assets/tom.png';
import megan from '../../assets/megan.png';
import cameron from '../../assets/cameron.png';
import lionel from '../../assets/lionel.png';

const Sidebar = ({sidebar}) => {
  return (
    <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
        <div className='shortcut-links'>
            <Link to='/category/music' className='side-link'>
                <img src={music} alt="" /><p>Music</p>
            </Link>
            <Link to='/category/gaming' className='side-link'>
                <img src={game_icon} alt="" /><p>Gaming</p>
            </Link>
            <Link to='/category/automobiles' className='side-link'>
                <img src={automobiles} alt="" /><p>Automobiles</p>
            </Link>
            <Link to='/category/sports' className='side-link'>
                <img src={sports} alt="" /><p>Sports</p>
            </Link>
            <Link to='/category/entertainment' className='side-link'>
                <img src={entertainment} alt="" /><p>Entertainment</p>
            </Link>
            <Link to='/category/technology' className='side-link'>
                <img src={tech} alt="" /><p>Technology</p>
            </Link>
            <Link to='/category/blogs' className='side-link'>
                <img src={blogs} alt="" /><p>Blogs</p>
            </Link>
            <Link to='/category/news' className='side-link'>
                <img src={news} alt="" /><p>News</p>
            </Link>
            <hr />
        </div>
        <div className='subscribed-list'>
            <h3>Groupe</h3>
            <div className='side-link'>
                <img src={jack} alt=""/> <p>Maxime Tonnelier</p>
            </div>
            <div className='side-link'>
                <img src={simon} alt=""/> <p>Dieudonné Takasi</p>
            </div>
            <div className='side-link'>
                <img src={lionel} alt=""/> <p>Sean Rogers</p>
            </div>
            <div className='side-link'>
                <img src={tom} alt=""/> <p>Floris Falelavaki</p>
            </div>
            <div className='side-link'>
                <img src={megan} alt=""/> <p>Nicolas MC</p>
            </div>
            <div className='side-link'>
                <img src={cameron} alt=""/> <p>Jo Uto</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar;
