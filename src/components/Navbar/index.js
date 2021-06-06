import React, { useState } from 'react';
import './navbar.css';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { LOGIN, FEED_PAGE, PROFILE } from '../../constants';
import { useSelector, connect } from 'react-redux';
import { logoutAction } from '../../actions/logoutAction';
import { getUserProfile } from '../../actions/profileActions';

function Navbar(props) {

    const loggedIn = useSelector(state => state.login.userDetails);
    const [searchInput, setSearchInput] = useState("");

    const logoutButton = () => {
        props.logoutAction();
        props.history.push(LOGIN);
    }

    const feedButton = () => {
        props.history.push(FEED_PAGE);
    }

    const profileButton = () => {
        props.getUserProfile(loggedIn.username);
        props.history.push(`${PROFILE}${loggedIn.username}`);
    }

    const changeInput = event => {
        setSearchInput(event.target.value);
    }

    const searchProfile = event => {
        event.preventDefault();
        if (searchInput !== ""){
            props.getUserProfile(searchInput);
            props.history.push(`${PROFILE}${searchInput}`);
        }
        setSearchInput("");
    }

    return (
        <div className="navbar-component">
            <div className="navbar-logo">
                <Link to="/">WeConnect</Link>
            </div>
            <div className="search-bar-div">
                {loggedIn &&
                    <form className="search-form" onSubmit={searchProfile}>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={changeInput}
                            className="search-field"
                        />
                        <input type="submit" value="Search" className="search-button" />
                    </form>
                }
            </div>
            {loggedIn &&
                <div className="nav-links-div">
                    <span className="nav-link">
                        <Button color="secondary" onClick={feedButton}>My Feed</Button>
                    </span>
                    <span className="nav-link">
                        <Button color="secondary" onClick={profileButton}>Profile</Button>
                    </span>
                    <span className="nav-link">
                        <Button color="danger" onClick={logoutButton}>LOGOUT</Button>
                    </span>
                </div>
            }
        </div>
    )
}

export default connect(null, { logoutAction, getUserProfile })(withRouter(Navbar));
