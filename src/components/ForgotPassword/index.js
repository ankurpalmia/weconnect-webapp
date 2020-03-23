import React, { useState } from 'react';
import { Container, Row, Col, Form, Label, Input, Button } from 'reactstrap';
import bgimage from '../../assets/weconnect.png';
import { Link } from 'react-router-dom';
import { sendForgotMailAction, clearMailError } from '../../actions/forgotPassword';
import { connect, useSelector } from 'react-redux';

function ForgotPassword(props) {

    let mailError = useSelector(state => state.login.mailError);
    let mailSent = useSelector(state => state.login.mailSent);

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const changeInput = event => {
        setUsername(event.target.value);
    }

    if(mailError){
        setError(mailError);
        props.clearMailError();
    }

    const submitForm = event => {
        event.preventDefault();
        if (username === "") {
            setError("Username can't be empty");
        }
        else {
            setError("");
            const data = {
                'username': username
            }
            props.sendForgotMailAction(data);
        }
    }

    return (
        <Container className="container signup-container">
            <Row>
                <Col sm="6" className="weconnect-image">
                    <img src={bgimage} alt="Let's Connect" />
                </Col>
                <Col sm="6" className="signup-component">
                    {mailSent ? (
                        <div className="login-form">
                            A mail is sent to your registered email ID. Click on the link to reset the password.
                        </div>
                    ) : (

                    <div className="login-form">
                        <div className="forgot-password-title">Forgot Password</div>
                        <Form onSubmit={submitForm}>
                            <Label>Enter your username</Label>
                            <Input
                                type="text"
                                value={username}
                                onChange={changeInput}
                                className="forgot-password-input"
                            />
                            {error && <div className="login-error">{error}</div>}
                            <Button type="submit" onClick={submitForm}>Submit</Button> &nbsp; &nbsp;
                        </Form>
                    </div>
                    )}
                    <Link to={"/"}><Button color="danger">Close</Button></Link>
                </Col>
            </Row>
        </Container>
    )
}

export default connect(null, { sendForgotMailAction, clearMailError })(ForgotPassword);
