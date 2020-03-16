import React from 'react';
import './containers.css';
import bgimage from '../assets/weconnect.png';
import { Row, Col, Container, Button } from 'reactstrap';
import { withRouter } from 'react-router';
import { SIGNUP, LOGIN } from '../constants';

function HomeContainer(props) {

    const signupButton = () =>{
        props.history.push(SIGNUP);
    }

    const loginButton = () => {
        props.history.push(LOGIN)
    }

    return (
        <Container className="container signup-container">
            <Row>
                <Col sm="6" className="weconnect-image">
                    <img src={bgimage} alt="Let's Connect" />
                </Col>
                <Col sm="6" className="home-component">
                    <div className="home-component">
                        <p className="home-component-title">
                            Welcome to WeConnect
                        </p>
                        <p className="home-component-text">
                            With WeConnect, you can conenct with your friends online, see their posts, react to them, and share your posts too!
                        </p>
                        <div className="home-component-div">
                            <Button className="home-btn" color="info" onClick={signupButton}>
                                Let's Connect
                            </Button>
                            <Button className="home-btn" color="warning" onClick={loginButton}>
                                Login as existing User
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default withRouter(HomeContainer);
