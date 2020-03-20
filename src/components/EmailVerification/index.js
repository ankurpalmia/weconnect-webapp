import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect, useSelector } from 'react-redux';
import { emailVerification, clearEmailError } from '../../actions/emailVerification';
import { Row, Col, Container, Button } from 'reactstrap';
import bgimage from "../../assets/weconnect.png";
import "../../containers/containers.css";
import { Link } from 'react-router-dom';

function EmailVerification(props) {

    let verified = useSelector(state => state.emailVerify.verified);
    let error = useSelector(state => state.emailVerify.error);

    useEffect(() => {
        let token = props.match.params.token;
        props.emailVerification(token);
    }, [])

    return (

        <Container className="container signup-container">
            <Row>
                <Col sm="6" className="weconnect-image">
                    <img src={bgimage} alt="Let's Connect" />
                </Col>
                <Col sm="6" className="signup-component email-verify">
                    {verified &&
                        <div className="verify-success">
                            Email verification Successful
                        </div>
                    }
                    {error &&
                        < div className="verify-error">
                            {error}
                        </div>
                    }
                    <div>
                        <Link to="/"><Button>Home</Button></Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default connect(null, { emailVerification })(withRouter(EmailVerification));
