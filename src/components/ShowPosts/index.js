import React, { useEffect, useState } from 'react';
import './ShowPosts.css';
import { useSelector, connect, shallowEqual } from 'react-redux';
import { getFriendsAction, getFeedPostsAction, fetchMorePosts, resetListChanged } from '../../actions/getPosts';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withRouter } from 'react-router';
import PostComponent from '../Post';

function ShowPosts(props) {

    let postList = useSelector(state => state.posts.feedPosts, shallowEqual);
    let feedNext = useSelector(state => state.posts.feedNext);
    let feedCount = useSelector(state => state.posts.feedCount);
    let postCreated = useSelector(state => state.posts.postCreated);
    let listChanged = useSelector(state => state.posts.listChanged);

    useEffect(() => {
        props.getFeedPostsAction();
    }, [postCreated])

    const fetchMoreData = () => {
        props.fetchMorePosts(feedNext);
    }

    useEffect(() => {
        props.getFriendsAction();
    }, [])

    if (listChanged) {
        props.getFeedPostsAction();
        props.resetListChanged();
    }


    return (
        postList &&
        <InfiniteScroll
            dataLength={feedCount} //This is important field to render the next data
            next={fetchMoreData}
            hasMore={feedNext ? true : false}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {postList && postList.map(post => (
                <PostComponent post={post} key={post.pk} />
            ))}
        </InfiniteScroll>
    )
}

export default connect(null, { getFeedPostsAction, fetchMorePosts, getFriendsAction, resetListChanged })(withRouter(ShowPosts));
