import React, { useEffect, useState } from 'react';
import './ShowPosts.css';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withRouter } from 'react-router';
import PostComponent from '../Post';

function ShowPosts(props) {

    let { postList, feedNext, feedCount, fetchMoreData } = props;
    
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

export default connect(null, null)(withRouter(ShowPosts));
