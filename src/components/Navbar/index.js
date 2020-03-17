import React from 'react';
import './navbar.css';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { LOGIN } from '../../constants';
import { useSelector, connect } from 'react-redux';
import { logoutAction } from '../../actions/logoutAction';

function Navbar(props) {

    const loggedIn = useSelector(state => state.login.userDetails);

    const logoutButton = () => {
        props.logoutAction();
        props.history.push(LOGIN);
    }

    return (
        <div className="navbar-component">
            <div className="navbar-logo">
                <Link to="/">WeConnect</Link>
            </div>
            {loggedIn &&
                <div className="nav-links-div">
                    <span className="nav-link">
                        <Button color="danger" onClick={logoutButton}>LOGOUT</Button>
                    </span>
                </div>
            }
        </div>
    )
}

export default connect(null, { logoutAction })(withRouter(Navbar));
