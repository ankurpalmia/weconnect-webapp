import React, { useEffect } from 'react';
import Signup from '../components/Signup';
import bgimage from '../assets/weconnect.png';
import { Row, Col, Container } from 'reactstrap';
import { SIGNUP_TITLE } from '../constants';

export default function SignupContainer() {

    useEffect(() => {
        document.title = SIGNUP_TITLE;
    }, [])

    return (
        <Container className="container signup-container">
            <Row>
                <Col sm="6" className="weconnect-image">
                    <img src={bgimage} alt="Let's Connect" />
                </Col>
                <Col sm="6" className="signup-component">
                    <Signup />
                </Col>
            </Row>
        </Container>
    )
}
