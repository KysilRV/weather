import React from 'react'

import './header.scss';

import refresh from '../../icons/Refresh BG.svg';

function Header({setDegreePar, degreePar}) {
    return (
        <header className='header'>
            <img src={refresh} alt="refresh" onClick={() => document.location.reload()} className="header__refresh" />
            <div className='header__switch'>
                <button className={!degreePar ? 'header__degree active' : 'header__degree'} onClick={() => setDegreePar(!degreePar)}>°F</button>
                <button className={degreePar ? 'header__degree active' : 'header__degree'} onClick={() => setDegreePar(!degreePar)}>°С</button>
            </div>
        </header>
    )
}

export default Header