import React, { useEffect, useState } from 'react';
import { useSelector, connect, shallowEqual } from 'react-redux';
import defaultPic from '../assets/defaultPic.png';
import { withRouter } from 'react-router';
import './containers.css';
import { Button, Row, Col } from 'reactstrap';
import ShowPosts from '../components/ShowPosts';
import { getUserProfile, getUserPosts, fetchMoreProfilePosts, sendRequestAction } from '../actions/profileActions';
import { resetListChanged } from '../actions/getPosts';
import { checkVerified, clearVerifiedError } from '../actions/loadUser';
import { clearResponded } from '../actions/requestRespond';


function ShowProfile(props) {

    let user = useSelector(state => state.profile.userDetails, shallowEqual);
    let authUser = useSelector(state => state.login.userDetails);
    let postList = useSelector(state => state.profile.postList, shallowEqual);
    let postNext = useSelector(state => state.profile.postNext);
    let postCount = useSelector(state => state.profile.postCount);
    let listChanged = useSelector(state => state.posts.listChanged);
    const userVerified = useSelector(state => state.posts.userVerified);
    let requestSent = useSelector(state => state.friend.requestSent);

    const [verifiedError, setVerifiedError] = useState("");


    if (listChanged) {
        props.getUserPosts(user.username);
        props.resetListChanged();
    }

    const fetchMoreData = () => {
        props.fetchMoreProfilePosts(postNext, user.username);
    }

    useEffect(() => {
        let username = props.match.params.username;
        props.getUserProfile(username);
        props.getUserPosts(username);
    }, [])

    const sendFriendRequest = () => {
        props.checkVerified();
    }

    if(requestSent) {
        let username = props.match.params.username;
        props.getUserProfile(username);
        props.clearResponded();
    }

    if (userVerified) {
        props.sendRequestAction(user.username);
        props.clearVerifiedError();
        setVerifiedError("");
    }

    if (userVerified === false) {
        setVerifiedError("Please verify your account first")
        props.clearVerifiedError();
    }


    return (
        user && authUser &&
        <div>
            <div className="show-profile-container">
                <div className="show-pic-and-name">
                    <div className="show-profile-pic-div">
                        <img src={user.profile_pic} alt="Ankur Palmia" className="show-profile-image" />
                    </div>
                    <div className="show-profile-details">
                        <div className="show-profile-name">
                            {user.full_name}
                        </div>
                        <div className="show-profile-username">
                            @{user.username}
                        </div>
                    </div>
                    {user.username === authUser.username ?
                        (<div className="edit-profile-btn">
                            <Button>
                                Edit Profile
                            </Button>
                        </div>
                        ) : (
                            <div className="friends-btn">
                                {user.is_friend === true &&
                                    <Button color="success">
                                        Friends
                            </Button>
                                }
                                {user.is_friend === false &&
                                    <Button color="secondary">
                                        Pending
                            </Button>
                                }
                                {user.is_friend === null &&
                                    <Button color="primary" onClick={sendFriendRequest}>
                                        Send Friend Request
                            </Button>
                                }

                                {verifiedError}
                            </div>
                        )}
                </div>
                <div className="show-profile-about">
                    About:
                    <div className="show-profile-dob">
                        Date of Birth: {user.date_of_birth ? user.date_of_birth : "Not Provided"}
                    </div>
                    <div className="show-profile-city">
                        City: {user.city ? user.city : "Not provided"}
                    </div>
                </div>
            </div>
            <div className="container">
                <Row>
                    <Col sm="4">

                    </Col>
                    <Col sm="8">
                        <div className="my-feed-div">Posts</div>
                        <ShowPosts
                            postList={postList}
                            feedNext={postNext}
                            feedCount={postCount}
                            fetchMoreData={fetchMoreData}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default connect(null, { getUserProfile, getUserPosts, fetchMoreProfilePosts, resetListChanged, checkVerified, clearVerifiedError, sendRequestAction, clearResponded })(withRouter(ShowProfile));
