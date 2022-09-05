import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from './NavigationItems.module.css';

const NavigationItems = () => {

    const [isActive,setActive] = useState(false);

    const toggleHumberger = ()=> {
        setActive(!isActive)
    }

    const activeClass  = isActive ? classes.active : '';
    const humbergerClass = isActive ? classes.active : '';

    let activeStyle = {color:'#E83A14'}
    
    return (
        <nav className={classes.navigationItems}>
            <NavLink  to='/' exact className={classes.brand_title}>CryptoWorld</NavLink>
             <ul className={[classes.navMenu,activeClass].join(' ')} onClick={toggleHumberger}>
            <li activeClass className={classes.navItem}>
                <NavLink style={({isActive}) => (isActive ? activeStyle : null)} 
                to='/'  exact >Home</NavLink>
                  
            </li>
            <li className={classes.navItem}> 
                <NavLink style={({isActive}) => (isActive ? activeStyle : null)}  
                to='/cryptocoins'>Crypto Coins</NavLink>
            </li>
            <li className={classes.navItem}> 
                <NavLink style={({isActive}) => (isActive ? activeStyle : null)} 
                to='/exchanges'>Exchanges</NavLink>
            </li>
        </ul>
        <div className={[classes.humberger,humbergerClass].join(' ')}  onClick={toggleHumberger}>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
        </div>
        </nav>
       

    )
}

export default NavigationItems