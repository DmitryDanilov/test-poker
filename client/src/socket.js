import socketIOClient from "socket.io-client"

const serv = "http://localhost:5000/"
const socket = socketIOClient(serv);

export default socket