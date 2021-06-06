import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import ShowPosts from '../components/ShowPosts';
import { loadUser } from '../actions/loadUser';
import { connect, useSelector, shallowEqual } from 'react-redux';
import { getFriendsAction, getFeedPostsAction, fetchMorePosts, resetListChanged } from '../actions/getPosts';

import { withRouter } from 'react-router';
import FeedSidebar from '../components/FeedSidebar';
import { FEED_TITLE } from '../constants';

function FeedContainer(props) {

    let user = useSelector(state => state.login.userDetails);

    let postList = useSelector(state => state.posts.feedPosts, shallowEqual);
    let feedNext = useSelector(state => state.posts.feedNext);
    let feedCount = useSelector(state => state.posts.feedCount);
    let listChanged = useSelector(state => state.posts.listChanged);

    const fetchMoreData = () => {
        props.fetchMorePosts(feedNext);
    }

    if (listChanged) {
        props.getFeedPostsAction();
        props.resetListChanged();
    }

    useEffect(() => {
        props.getFeedPostsAction();
        props.loadUser();
        props.getFriendsAction();
        document.title = FEED_TITLE;
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
                    <ShowPosts 
                        postList={postList}
                        feedNext={feedNext}
                        feedCount={feedCount}
                        fetchMoreData={fetchMoreData}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default connect(null, { loadUser, fetchMorePosts, getFeedPostsAction, getFriendsAction, resetListChanged })(withRouter(FeedContainer));
