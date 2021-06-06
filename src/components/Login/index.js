import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Container, FormFeedback } from 'reactstrap';
import {loadUser} from '../../actions/loadUser';
import './Login.css';
import { withRouter } from 'react-router';
import { SIGNUP, FEED_PAGE, FORGOT_PASS_PAGE } from '../../constants';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { loginAction, clearLoginError } from '../../actions/loginAction';

export function Login(props) {

    let loginError = useSelector(state => state.login.error);
    let loginToken = useSelector(state => state.login.token);

    const [authError, setAuthError] = useState("");

    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const [validate, setValidate] = useState({
        username: null,
        password: null,
    })

    const changeInput = event => {
        event.persist();
        setState(state => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    };

    const validateUsername = () => {
        const usernameRex = /^[a-zA-Z]+(([-_.][a-zA-Z ])?[a-zA-Z]*)*$/;
        let validUsername;
        if (usernameRex.test(state.username)) {
            validUsername = true;
        } else {
            validUsername = false;
        }
        setValidate(state => ({
            ...state,
            ["username"]: validUsername
        }));
    }

    const validatePassword = () => {
        let validPassword;
        if (state.password.length < 8) {
            validPassword = false;
        } else {
            validPassword = true;
        }
        setValidate(state => ({
            ...state,
            ["password"]: validPassword
        }));
    }

    if (loginError) {
        setAuthError(loginError);
        props.clearLoginError();
        setState({
            username: "",
            password: ""
        })
        setValidate({
            username: null,
            password: null
        })
    }

    if(loginToken && loginError === false){
        props.loadUser()
        props.history.push(FEED_PAGE);
        props.clearLoginError();
    }

    const submitLoginForm = event => {
        event.preventDefault();
        const { username, password } = validate
        if (username && password) {
            let user = {
                "username": state.username,
                "password": state.password,
            }
            console.log("user: ", user)
            props.loginAction(user);
        }
    }

    const closeLogin = () => {
        props.history.push(`/`);
    }

    return (
        <div className="login-form">
            <div className="signup-form-title">
                Login
            </div>
            <Form onSubmit={submitLoginForm}>
                <Container>
                    <Row>
                        <Input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={state.username}
                            onChange={changeInput}
                            className="signup-form-input"
                            valid={validate.username === true}
                            invalid={validate.username === false}
                            onBlur={validateUsername}
                        />
                        <FormFeedback>
                            Please enter a correct username
                        </FormFeedback>
                    </Row>
                    <Row>
                        <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={state.password}
                            onChange={changeInput}
                            className="signup-form-input"
                            onBlur={validatePassword}
                            valid={validate.password === true}
                            invalid={validate.password === false}
                        />
                        <FormFeedback>
                            Password should be minimum 8 characters long
                        </FormFeedback>
                    </Row>
                    {authError &&
                        <div className="login-error">
                            {authError}
                        </div>
                    }
                    <Row>
                        <Col sm="6" className="signup-buttons">
                            <Button type="submit" color="success">
                                Log In
                            </Button>
                        </Col>
                        <Col sm="6" className="signup-buttons">
                            <Button color="danger" onClick={closeLogin}>
                                Close
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <Link to={FORGOT_PASS_PAGE}>Forgot Password</Link> <br />
            New User? <Link to={SIGNUP}>Signup here</Link>
        </div>
    )
}

export default connect(null, { loginAction, clearLoginError, loadUser })(withRouter(Login));
