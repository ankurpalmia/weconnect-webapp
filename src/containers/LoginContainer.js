import React from 'react';
import bgimage from '../assets/weconnect.png';
import { Row, Col, Container } from 'reactstrap';
import Login from '../components/Login';

export default function SignupContainer() {

    return (
        <Container className="container signup-container">
            <Row>
                <Col sm="6" className="weconnect-image">
                    <img src={bgimage} alt="Let's Connect" />
                </Col>
                <Col sm="6" className="signup-component">
                    <Login />
                </Col>
            </Row>
        </Container>
    )
}
