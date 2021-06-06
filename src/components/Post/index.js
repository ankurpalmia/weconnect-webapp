import React, { useEffect, useState } from 'react';
import '../ShowPosts/ShowPosts.css';
import { useSelector, connect } from 'react-redux';
import { Multiselect } from 'multiselect-react-dropdown';
import ImageUploader from 'react-images-upload';
import { editPost, deletePost, likeUnlikeAction } from '../../actions/getPosts';
import { Button, ModalFooter, Input, Label, FormGroup, ModalHeader, Form, Modal, ModalBody } from 'reactstrap';
import { dateFormat } from '../../services/dateUtil';
import { Link } from 'react-router-dom';
import { PROFILE } from '../../constants';


function PostComponent(props) {

    const { post } = props;

    let user = useSelector(state => state.login.userDetails);
    const myFriendsList = useSelector(state => state.posts.myFriends);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);
    const [myFriends, setMyFriends] = useState([]);
    const [postForm, setPostForm] = useState({
        text: post.text,
        image: null,
        privacy: post.privacy,
        customList: post.custom_list
    })

    useEffect(() => {
        if (myFriendsList) {
            let tempFriendsList = []
            for (let index = 0; index < myFriendsList.length; index++) {
                tempFriendsList.push({ username: myFriendsList[index].username, pk: myFriendsList[index].pk, id: index })
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

    const toggleLikeModal = () => {
        setIsLikeModalOpen(!isLikeModalOpen);
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

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    }

    const submitEditPost = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('text', postForm.text);
        if (postForm.image)
            formData.append('image', postForm.image, postForm.image.name);
        formData.append('privacy', postForm.privacy);

        postForm.customList.forEach(item => {
            formData.append('custom_list', item);
        });

        props.editPost(formData, post.pk);
        toggleModal();
    }

    const deletePost = () => {
        props.deletePost(post.pk);
        toggleModal();
    }

    const likePost = () => {
        const pk = parseInt(post.pk);
        const data = {
            'action': 'like'
        }
        props.likeUnlikeAction(pk, data);
    }

    const unlikePost = () => {
        const pk = parseInt(post.pk);
        const data = {
            'action': 'unlike'
        }
        props.likeUnlikeAction(pk, data);
    }

    return (
        <div>
            <div className="post-container">
                <div className="post-user-top">
                    <div className="post-user-info">
                        <img src={post.created_by.profile_pic} alt={post.created_by.full_name} className="post-user-dp" />
                        <Link to={`${PROFILE}${post.created_by.username}`}>{post.created_by.full_name}</Link>
                    </div>
                    <div className="post-user-date">{dateFormat(post.created_at)}</div>
                </div>
                <div className="post-text-div">
                    {post.text}
                </div>
                <div className="post-image-div">
                    {post.image &&
                        <img src={post.image} className="post-image" />
                    }
                </div>
                <div className="post-like-div">
                    <span className="like-unlike-span">
                        {post.liked_by_me ? (
                            <span className="like-unlike unlike-button" onClick={unlikePost}>Liked</span>
                        ) : (
                                <span className="like-unlike like-button" onClick={likePost}>Like</span>
                            )
                        }
                        <span className="like-count" onClick={toggleLikeModal}>Likes: {post.likes}</span>
                    </span>
                    {user && user.username === post.created_by.username &&
                        <span className="edit-button" onClick={toggleModal}>Edit Post</span>
                    }
                </div>
            </div>
            <Modal isOpen={modalIsOpen} toggle={toggleModal} className="create-post-modal">
                <Form onSubmit={submitEditPost}>
                    <ModalHeader toggle={toggleModal} className="create-post-header">
                        Edit Post
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
                        </FormGroup>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" onClick={submitEditPost}>Submit</Button>
                        <Button color="danger" onClick={deletePost}>Delete</Button>
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
            <Modal toggle={toggleLikeModal} isOpen={isLikeModalOpen}>
                <ModalHeader toggle={toggleLikeModal}>
                    Liked by
                </ModalHeader>
                <ModalBody>
                    {post.liked_by.map(user => (
                        <Link to={`${PROFILE}${user}`}>
                            <div className="liked-by-div" key={user}>{user}</div>
                        </Link>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggleLikeModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default connect(null, { editPost, deletePost, likeUnlikeAction })(PostComponent);
