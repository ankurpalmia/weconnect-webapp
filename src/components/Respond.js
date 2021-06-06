import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { requestRespond, clearResponded } from '../actions/requestRespond';
import { FEED_PAGE } from '../constants';

function Respond(props) {

    let responded = useSelector(state => state.friend.respond);

    if (responded) {
        props.history.push(FEED_PAGE);
        props.clearResponded();
    }

    useEffect(() => {
        let accepted = props.match.params.accepted;
        if (accepted === 'accept')
            accepted = true
        else if (accepted === 'reject')
            accepted = false
        const sender = parseInt(props.match.params.sender);
        const receiver = parseInt(props.match.params.receiver);
        props.requestRespond(accepted, sender, receiver);
    }, [])

    return (
        <div className="container">
            Loading...
        </div>
    )
}

export default connect(null, { requestRespond, clearResponded })(withRouter(Respond));
