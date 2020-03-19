import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import ShowPosts from '../components/ShowPosts';
import { loadUser } from '../actions/loadUser';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import FeedSidebar from '../components/FeedSidebar';

function FeedContainer(props) {

    let user = useSelector(state => state.login.userDetails);

    useEffect(() => {
        props.loadUser();
    }, [])

    return (
        <div className="container feed-container">
            <Row>
                <Col sm="4">
                    {user &&
                        <FeedSidebar user={user} />
                    }
                </Col>
                <Col sm="8">
                    <div className="my-feed-div">My Feed</div>
                    <ShowPosts />
                </Col>
            </Row>
        </div>
    )
}

export default connect(null, { loadUser })(withRouter(FeedContainer));
