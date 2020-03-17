import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Container, FormText, FormFeedback } from 'reactstrap';
import './Signup.css';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { LOGIN, SIGNUP_SUCCESS_PAGE } from '../../constants';
import { signupAction, clearSignupError } from '../../actions/signupAction';
import { connect, useSelector } from 'react-redux';

function Signup(props) {

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");

    let emailAuthError = useSelector(state => state.signup.emailError);
    let usernameAuthError = useSelector(state => state.signup.usernameError);
    let authError = useSelector(state => state.signup.error);

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        dob: null,
        gender: null
    });

    const [validate, setValidate] = useState({
        firstName: null,
        email: null,
        username: null,
        password: null,
        confirmPassword: null
    });

    const changeInput = event => {
        event.persist();
        setState(state => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    };

    const validateEmail = (e) => {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail;
        if (emailRex.test(state.email)) {
            validEmail = true;
        } else {
            validEmail = false;
            setEmailError("Please input a correct email");
        }
        setValidate(state => ({
            ...state,
            ["email"]: validEmail
        }));
    }

    const validateName = () => {
        const nameRex = /^[a-zA-Z]+(([ ][a-zA-Z ])?[a-zA-Z]*)*$/;
        let validName;
        if (nameRex.test(state.firstName)) {
            validName = true;
        } else {
            validName = false;
        }
        setValidate(state => ({
            ...state,
            ["firstName"]: validName
        }));
    }

    const validateUsername = () => {
        const usernameRex = /^[a-zA-Z]+(([-_.][a-zA-Z ])?[a-zA-Z]*)*$/;
        let validUsername;
        if (usernameRex.test(state.username)) {
            validUsername = true;
        } else {
            validUsername = false;
            setUsernameError("Please enter a correct username");
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

    const validateConfirmPassword = () => {
        let validPassword;
        if (state.confirmPassword === "" || state.password !== state.confirmPassword) {
            validPassword = false;
        } else {
            validPassword = true;
        }
        setValidate(state => ({
            ...state,
            ["confirmPassword"]: validPassword
        }));
    }

    if (authError === false) {
        props.history.push(SIGNUP_SUCCESS_PAGE);
    }

    if (emailAuthError) {
        setEmailError(emailAuthError);
        setValidate(state => ({
            ...state,
            ["email"]: false
        }));
        props.clearSignupError();
    }

    if (usernameAuthError) {
        console.log(usernameAuthError)
        setUsernameError(usernameAuthError);
        setValidate(state => ({
            ...state,
            ["username"]: false
        }));
        props.clearSignupError();
    }

    const submitSignupForm = event => {
        event.preventDefault();
        const { firstName, email, username, password, confirmPassword } = validate
        if (firstName && email && username && password && confirmPassword) {
            let user = {
                "email": state.email,
                "username": state.username,
                "first_name": state.firstName,
                "last_name": state.lastName,
                "password": state.password,
                "date_of_birth": state.dob,
                "gender": state.gender
            }
            console.log("in sugnup component", user)
            props.signupAction(user);
        }
        else {
            console.log("Error in signup component", validate)
        }
    }

    const closeSignup = () => {
        props.history.push(`/`);
    }


    return (
        <div className="signup-form">
            <div className="signup-form-title">
                Signup Form
            </div>
            <Form onSubmit={submitSignupForm}>
                <Container>
                    <Row>
                        <Col sm="6" className="name-input first-name-input">
                            <Input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={state.firstName}
                                onChange={changeInput}
                                onBlur={validateName}
                                valid={validate.firstName === true}
                                invalid={validate.firstName === false}
                            />
                            <FormFeedback className="name-invalid-feedback">
                                Please enter your First Name
                            </FormFeedback>
                        </Col>
                        <Col sm="6" className="name-input">
                            <Input
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={state.lastName}
                                onChange={changeInput}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Input
                            type="text"
                            placeholder="Email ID"
                            name="email"
                            value={state.email}
                            onChange={changeInput}
                            className="signup-form-input"
                            valid={validate.email === true}
                            invalid={validate.email === false}
                            onBlur={validateEmail}
                        />
                        <FormFeedback>
                            {emailError}
                        </FormFeedback>
                    </Row>
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
                            {usernameError}
                        </FormFeedback>
                        <FormText>This username will be used for login</FormText>
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
                    <Row>
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={state.confirmPassword}
                            onChange={changeInput}
                            className="signup-form-input"
                            onBlur={validateConfirmPassword}
                            valid={validate.confirmPassword === true}
                            invalid={validate.confirmPassword === false}
                        />
                        <FormFeedback>
                            Passwords not matching
                        </FormFeedback>
                    </Row>
                    <Row>
                        <Col sm="3">
                            Date of Birth:
                        </Col>
                        <Col sm="9" className="dob-input">
                            <Input
                                type="date"
                                name="dob"
                                onChange={changeInput}
                                className="signup-form-input"
                                required
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="3">
                            Gender:
                        </Col>
                        <Col sm="3">
                            <Input
                                type="radio"
                                name="gender"
                                value="M"
                                onChange={changeInput}
                                className="signup-form-input"
                                required
                            />Male
                        </Col>
                        <Col sm="3">
                            <Input
                                type="radio"
                                name="gender"
                                value="F"
                                onChange={changeInput}
                                className="signup-form-input"
                            />Female
                        </Col>
                        <Col sm="3">
                            <Input
                                type="radio"
                                name="gender"
                                value="O"
                                onChange={changeInput}
                                className="signup-form-input"
                            />Other
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                    <Row>
                        <Col sm="6" className="signup-buttons">
                            <Button type="submit" color="success">
                                Submit
                            </Button>
                        </Col>
                        <Col sm="6" className="signup-buttons">
                            <Button type="danger" color="danger" onClick={closeSignup}>
                                Close
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            Already registered? <Link to={LOGIN}>Login here</Link>
        </div>
    )
}

export default connect(null, { signupAction, clearSignupError })(withRouter(Signup));
