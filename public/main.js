let localVideo = document.getElementById("local-video")
let remoteVideo = document.getElementById("remote-video")


let peer
function def() {
    let userId = document.getElementById("peerId").value
    peer = new Peer(userId, {
        host: '172.18.99.201',
        port: 9000,
        path: '/webrtc'
    })

   document.getElementById("login").style.display="none"
   document.getElementById("user-list").style.display="flow-root"

    listen()
}

let localStream
function listen() {
    peer.on('call', (call) => {
        localVideo = document.getElementById("local-video")
        remoteVideo = document.getElementById("remote-video")

        navigator.getUserMedia({
            audio: true,
            video: true
        }, (stream) => {
            document.getElementById("video-call-div").style.display = "inline"
            localVideo.srcObject = stream
            localStream = stream

            call.answer(stream)
            call.on('stream', (remoteStream) => {
                remoteVideo.srcObject = remoteStream
            })

        })

    })
}

function endCall(){
    peer.destroy()
}

function startCall() {

    document.getElementById("video-call-div").style.display = "inline"

    localVideo = document.getElementById("local-video")
    remoteVideo = document.getElementById("remote-video")

    let otherUserId = document.getElementById("peer-input").textContent

    console.log(otherUserId)
    console.log(localVideo)

    navigator.getUserMedia({
        audio: true,
        video: true
    }, (stream) => {
      //  document.getElementById("user-list").style.display="none"
       
        console.log(stream)
        localVideo.srcObject = stream
        localStream = stream

        const call = peer.call(otherUserId, stream)
        call.on('stream', (remoteStream) => {
            remoteVideo.srcObject = remoteStream

        })

    })


}

let isAudio = true
function muteAudio() {
    isAudio = !isAudio
    localStream.getAudioTracks()[0].enabled = isAudio
}

let isVideo = true
function muteVideo() {
    isVideo = !isVideo
    localStream.getVideoTracks()[0].enabled = isVideo
}