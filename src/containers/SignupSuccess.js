import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { LOGIN, SIGNUP } from '../constants';
import { useSelector, connect } from 'react-redux';
import { clearSignupError } from '../actions/signupAction';
import './containers.css';
import bgimage from '../assets/weconnect.png';
import { Row, Col, Container } from 'reactstrap';

function SignupSuccess(props) {

    let authError = useSelector(state => state.signup.error);

    useEffect(() => {
        if (authError === null) {
            console.log("authError", authError)
            props.history.push(SIGNUP);
        }
        else {
            props.clearSignupError();
        }
    }, [])

    return (
        <Container className="container signup-container">
            <Row>
                <Col sm="6" className="weconnect-image">
                    <img src={bgimage} alt="Let's Connect" />
                </Col>
                <Col sm="6" className="signup-component">
                    <div className="signup-form">
                        <p>Signup Successful!</p>
                        <p>A verification link is sent to your email id. Click on verify to access all the features of WeConenct</p>
                        <p>Already registered? <Link to={LOGIN}>Login here</Link></p>
                        <p>Register a new account? <Link to={SIGNUP}>Signup here</Link></p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default connect(null, { clearSignupError })(withRouter(SignupSuccess));
