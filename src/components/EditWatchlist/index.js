import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Multiselect } from 'multiselect-react-dropdown';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getFriendsAction } from '../../actions/getPosts';

function EditWatchlist(props) {

    let myFriendList = [];

    const [watchedFriends, setWatchedFriends] = useState([]);
    const [allFriends, setAllFriends] = useState([]);
    const [newWatching, setNewWatching] = useState([]);
    const [notWatching, setNotWatching] = useState([]);

    useEffect(() => {
        props.getFriendsAction();
    }, [])

    useEffect(() => {
        if (myFriendList) {
            let watchList = [], notWatchList = []
            for (let i = 0; i < myFriendList.length; i++) {
                if (myFriendList[i].watching)
                    watchList.push({ username: myFriendList[i].username, pk: myFriendList[i].pk, id: i })
                else
                    notWatchList.push({ username: myFriendList[i].username, pk: myFriendList[i].pk, id: i })
            }
            setWatchedFriends(watchList);
            setAllFriends(notWatchList);
        }
    }, [myFriendList])

    const addToNewWatching = (selectedlist, selecteditem) => {
        setNewWatching(newWatching.concat(selecteditem.pk));
    }

    const addToNotWatching = (selectedlist, selecteditem) => {
        setNotWatching(notWatching.concat(selecteditem.pk));
    }

    const removeFromNewWatching = (selectedlist, removeitem) => {
        const friends = [...newWatching];
        const index = newWatching.indexOf(removeitem);
        if (index !== -1) {
            friends.splice(index, 1);
            setNewWatching(friends);
        }
    }

    const removeFromNotWatching = (selectedlist, removeitem) => {
        const friends = [...notWatching];
        const index = notWatching.indexOf(removeitem);
        if (index !== -1) {
            friends.splice(index, 1);
            setNotWatching(friends);
        }
    }


    return (
        <div>
            <ModalHeader toggle={props.toggleModal}>
                Edit Watchlist
            </ModalHeader>
            <ModalBody>
                <Multiselect
                    options={allFriends}
                    onSelect={addToNewWatching}
                    onRemove={removeFromNewWatching}
                    displayValue="username"
                    placeholder="Add to watchlist"
                />
                <Multiselect
                    options={watchedFriends}
                    onSelect={addToNotWatching}
                    onRemove={removeFromNotWatching}
                    displayValue="username"
                    placeholder="Remove from watchlist"
                />
            </ModalBody>
            <ModalFooter>

            </ModalFooter>
        </div>
    )
}

export default connect(null, { getFriendsAction })(withRouter(EditWatchlist));
