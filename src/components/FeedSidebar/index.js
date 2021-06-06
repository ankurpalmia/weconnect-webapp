import React, { useState, useEffect } from 'react';
import defaultPic from '../../assets/defaultPic.png';
import './FeedSidebar.css';
import { PROFILE, EDIT_PROFILE_PAGE } from '../../constants';
import { Multiselect } from 'multiselect-react-dropdown';
import { withRouter } from 'react-router';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Input, FormGroup, Label } from 'reactstrap';
import { checkVerified, clearVerifiedError } from '../../actions/loadUser';
import { connect, useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload';
import { getFriendsAction, createPost, getFeedPostsAction } from '../../actions/getPosts';

function FeedSidebar(props) {

    const userVerified = useSelector(state => state.posts.userVerified);
    const myFriendsList = useSelector(state => state.posts.myFriends);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [verifiedError, setVerifiedError] = useState("");
    const [myFriends, setMyFriends] = useState([]);
    const [postForm, setPostForm] = useState({
        text: "",
        image: null,
        privacy: 'PUBLIC',
        customList: []
    })

    useEffect(() => {
        if (myFriendsList) {
            let tempFriendsList = []
            for (let i = 0; i < myFriendsList.length; i++) {
                tempFriendsList.push({ username: myFriendsList[i].username, pk: myFriendsList[i].pk, id: i })
            }
            setMyFriends(tempFriendsList);
        }
    }, [myFriendsList])

    const imageInputChange = event => {
        setPostForm(state => ({
            ...state,
            ['image']: event[0]
        }));
    }

    const postFormInputChange = event => {
        event.persist();
        setPostForm(state => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    };

    const addToCustomList = (selectedlist, selecteditem) => {
        setPostForm(state => ({
            ...state,
            ['customList']: postForm.customList.concat(selecteditem.pk)
        }));
    }

    const removeFromCustomList = (selectedlist, removeitem) => {
        const friends = [...postForm.customList];
        const index = postForm.customList.indexOf(removeitem);
        if (index !== -1) {
            friends.splice(index, 1);
            setPostForm(state => ({
                ...state,
                ['customList']: friends
            }));
        }
    }

    const showMyProfile = () => {
        props.history.push(`${PROFILE}${props.user.username}`)
    }

    const toggleModal = () => {
        if (modalIsOpen)
            props.getFeedPostsAction();
        setModalIsOpen(!modalIsOpen);
    }

    if (userVerified) {
        toggleModal();
        props.clearVerifiedError();
        setVerifiedError("");
    }

    if (userVerified === false) {
        setVerifiedError("Please verify your account first")
        props.clearVerifiedError();
    }

    const openCreatePost = () => {
        props.checkVerified();
    }

    const openEditProfile = () => {
        props.history.push(EDIT_PROFILE_PAGE)
    }

    const submitCreatePost = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('text', postForm.text);
        if (postForm.image)
            formData.append('image', postForm.image, postForm.image.name);
        formData.append('privacy', postForm.privacy);

        postForm.customList.forEach(item => {
            formData.append('custom_list', item);
        });

        props.createPost(formData);
        setPostForm({
            text: "",
            image: null,
            privacy: 'PUBLIC',
            customList: []
        })
        toggleModal();
    }

    return (
        <div className="sidebar-container">
            <div>
                <div className="sidebar-pic-div">
                    <img src={"http://localhost:8000" + props.user.profile_pic} alt={props.user.full_name} className="sidebar-pic" />
                </div>
                <div className="sidebar-name" onClick={showMyProfile}>
                    {props.user.full_name}
                </div>
                <div className="sidebar-btn" onClick={openEditProfile}>
                    Edit Profile
                </div>
                <div className="sidebar-btn" onClick={openCreatePost}>
                    Create Post
                </div>
                {verifiedError &&
                    <div className="verified-error-div">
                        {verifiedError}
                    </div>}
            </div>

            <Modal isOpen={modalIsOpen} toggle={toggleModal} className="create-post-modal">
                <Form onSubmit={submitCreatePost}>
                    <ModalHeader toggle={toggleModal} className="create-post-header">
                        Create Post
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Text</Label>
                            <Input
                                type="text"
                                name="text"
                                value={postForm.text}
                                onChange={postFormInputChange}
                                className="post-form-input"
                                required
                            />
                            <ImageUploader
                                withIcon={true}
                                withPreview={true}
                                singleImage={true}
                                buttonText='Choose image'
                                name="image"
                                onChange={imageInputChange}
                                imgExtension={['.jpg', '.png']}
                                maxFileSize={5242880}
                            />
                            <Input
                                type="select"
                                name="privacy"
                                onChange={postFormInputChange}
                                value={postForm.privacy}>
                                <option value='PUBLIC'>Public</option>
                                <option value='PRIVATE'>Private</option>
                                <option value='FRIENDS'>Friends only</option>
                                <option value='CUSTOM'>Custom</option>
                            </Input>
                            {postForm.privacy === 'CUSTOM' &&
                                <Multiselect
                                    options={myFriends}
                                    onSelect={addToCustomList}
                                    onRemove={removeFromCustomList}
                                    displayValue="username"
                                    placeholder="Select Friends"
                                    required={true}
                                />
                            }
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" onClick={submitCreatePost}>Create</Button>
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default connect(null, { checkVerified, createPost, getFeedPostsAction, clearVerifiedError, getFriendsAction })(withRouter(FeedSidebar));
