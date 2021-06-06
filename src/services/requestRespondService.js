import { RESPOND_REQUEST_API } from "../constants";
import axios from "axios";

let url = RESPOND_REQUEST_API;

export const requestRespondService = (accepted, sender, receiver) => {
    const data = {
        accepted: accepted,
        sender: sender,
        receiver: receiver
    }

    return axios.post(
        url,
        data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}
