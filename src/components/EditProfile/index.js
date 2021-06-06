import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import './EditProfile.css';
import { Form, Container, Row, Col, Input, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { PROFILE, EDIT_PROFILE_TITLE } from '../../constants';
import ImageUploader from 'react-images-upload';
import { editProfile, editImageAction } from '../../actions/editProfile';

function EditProfile(props) {

    let authError = useSelector(state => state.signup.error);
    let authUser = useSelector(state => state.login.userDetails);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        document.title = EDIT_PROFILE_TITLE;
    }, [])

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    }

    const imageInputChange = event => {
        setState(state => ({
            ...state,
            ['image']: event[0]
        }));
    }

    const [state, setState] = useState({
        firstName: authUser.first_name,
        lastName: authUser.last_name,
        email: authUser.email,
        username: authUser.username,
        dob: authUser.date_of_birth,
        gender: authUser.gender,
        city: authUser.city,
        image: authUser.profile_pic
    });

    const [validate, setValidate] = useState({
        firstName: true,
    });

    const changeInput = event => {
        event.persist();
        setState(state => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    };

    const validateName = () => {
        const nameRex = /^[a-zA-Z]+(([ ][a-zA-Z ])?[a-zA-Z]*)*$/;
        let validName;
        if (nameRex.test(state.firstName)) {
            validName = true;
        } else {
            validName = false;
        }
        setValidate(state => ({
            ...state,
            ["firstName"]: validName
        }));
    }

    if (authError === false) {
        props.history.push(`${PROFILE}${authUser.username}`);
    }

    const editImage = () => {
        let data = new FormData();
        data.append('profile_pic', state.image, state.image.name)
        props.editImageAction(authUser.pk, data);
        toggleModal();
    }

    const submitEditProfileForm = event => {
        event.preventDefault();
        const { firstName } = validate
        if (firstName) {
            let user = {
                "first_name": state.firstName,
                "last_name": state.lastName,
                "date_of_birth": state.dob,
                "gender": state.gender,
                "city": state.city
            }
            props.editProfile(authUser.pk, user);
        }
    }

    const closeEditProfile = () => {
        props.history.push(`${PROFILE}${authUser.username}`);
    }

    return (
        <div className="edit-profile-container">
            <div className="signup-form-title">
                Edit Profile
            </div>
            <Form onSubmit={submitEditProfileForm}>
                <Container>
                    <Row>
                        <Col sm="2">Email:</Col>
                        <Col sm="10">
                            <Input
                                type="text"
                                value={state.email}
                                readOnly
                                className="signup-form-input"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="2">Username:</Col>
                        <Col sm="10">
                            <Input
                                type="text"
                                value={state.username}
                                className="signup-form-input"
                                readOnly
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="3">First Name</Col>
                        <Col sm="9">
                            <Input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={state.firstName}
                                onChange={changeInput}
                                onBlur={validateName}
                                valid={validate.firstName === true}
                                invalid={validate.firstName === false}
                                className="signup-form-input"
                            />
                            <FormFeedback className="name-invalid-feedback">
                                Please enter your First Name
                            </FormFeedback>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="3">Last Name</Col>
                        <Col sm="9">
                            <Input
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={state.lastName}
                                onChange={changeInput}
                                className="signup-form-input"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="3">
                            Date of Birth:
                        </Col>
                        <Col sm="9" className="dob-input">
                            <Input
                                type="date"
                                name="dob"
                                value={state.dob}
                                onChange={changeInput}
                                className="signup-form-input"
                                required
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="3">
                            Gender:
                        </Col>
                        <Col sm="3">
                            <Input
                                type="radio"
                                name="gender"
                                value="M"
                                checked={state.gender === 'M'}
                                onChange={changeInput}
                                className="signup-form-input"
                                required
                            />Male
                        </Col>
                        <Col sm="3">
                            <Input
                                type="radio"
                                name="gender"
                                value="F"
                                checked={state.gender === 'F'}
                                onChange={changeInput}
                                className="signup-form-input"
                            />Female
                        </Col>
                        <Col sm="3">
                            <Input
                                type="radio"
                                name="gender"
                                value="O"
                                checked={state.gender === 'O'}
                                onChange={changeInput}
                                className="signup-form-input"
                            />Other
                        </Col>
                    </Row>
                    <Row className="city-input">
                        <Col sm="2">
                            City:
                        </Col>
                        <Col sm="10" className="city-input">
                            <Input
                                type="text"
                                name="city"
                                value={state.city}
                                onChange={changeInput}
                                className="signup-form-input"
                            />
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                    <Row>
                        <Col sm="4" className="signup-buttons">
                            <Button type="submit" color="success" onClick={submitEditProfileForm}>
                                Submit Edits
                            </Button>
                        </Col>
                        <Col sm="4" className="signup-buttons">
                            <Button color="primary" onClick={toggleModal}>
                                Edit Profile Pic
                            </Button>
                        </Col>
                        <Col sm="4" className="signup-buttons">
                            <Button type="danger" color="danger" onClick={closeEditProfile}>
                                Close
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <Modal toggle={toggleModal} isOpen={modalIsOpen} className="edit-profile-modal">
                <ModalHeader toggle={toggleModal}>
                    Add Profile Picture
                </ModalHeader>
                <ModalBody>
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
                </ModalBody>
                <ModalFooter>
                    <Button color="success" type="submit" onClick={editImage}>Create</Button>
                    <Button color="danger" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

export default connect(null, { editProfile, editImageAction })(withRouter(EditProfile));
