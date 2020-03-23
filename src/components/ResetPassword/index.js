import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import bgimage from '../../assets/weconnect.png';
import { Container, Row, Col, Form, Input, Button } from 'reactstrap';
import { checkPasswordToken, resetPassword, clearMailError } from '../../actions/forgotPassword';
import { LOGIN } from '../../constants';
import { Link } from 'react-router-dom';

function ResetPassword(props) {

    let userPk = useSelector(state => state.login.userPk);
    let resetSuccess = useSelector(state => state.login.resetPass);
    let tokenError = useSelector(state => state.login.mailError);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        let token = props.match.params.token;
        const data = {
            'token': token
        }
        props.checkPasswordToken(data);
    }, [])

    if (tokenError) {
        props.clearMailError();
    }

    const changePassword = event => {
        setPassword(event.target.value);
    }

    if (resetSuccess) {
        console.log("reset success")
        props.history.push(LOGIN);
    }

    const changeConfirmPassword = event => {
        setConfirmPassword(event.target.value)
        if (password !== event.target.value) {
            setError("Passwords not matching");
        }
        else {
            setError("");
        }
    }

    const validatePassword = () => {
        if (password.length < 8) {
            setError("Password must be minimum 8 characters long");
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (error === "") {
            const data = {
                'pk': userPk,
                'password': password
            }
            props.resetPassword(data);
            props.history.push(LOGIN)
        }
    }

    return (
        <Container className="container signup-container">
            <Row>
                <Col sm="6" className="weconnect-image">
                    <img src={bgimage} alt="Let's Connect" />
                </Col>
                <Col sm="6" className="signup-component">
                    {userPk ? (
                        <div className="login-form">
                            <div className="forgot-password-title">Reset Password</div>
                            <Form onSubmit={submitForm}>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={changePassword}
                                    onBlur={validatePassword}
                                    placeholder="Enter new Password"
                                    className="forgot-password-input"
                                />
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={changeConfirmPassword}
                                    placeholder="Confirm password"
                                    className="forgot-password-input"
                                />
                                {error && <div className="login-error">{error}</div>}
                                <Button type="submit" color="success" onClick={submitForm}>Submit</Button>
                            </Form>
                        </div>
                    ) : (
                            <div className="login-form">
                                Invalid Token <br />
                                <Link to="/"><Button color="danger">Close</Button></Link>
                            </div>
                        )}
                </Col>
            </Row>
        </Container>
    )
}

export default connect(null, { resetPassword, checkPasswordToken, clearMailError })(withRouter(ResetPassword));
