let APP_ID = "22312851a2bf43578977bbd9317185f4";

let token = null;
let uid = String(Math.floor(Math.random()*10000))

let localStream;
let remoteStream;
let peerConnection;

let client;
let channel;

const servers = {
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']
        }
    ]
}

let init = async() =>{
    client = await Agora

    localStream = await navigator.mediaDevices.getUserMedia({video:true,audio:false});
    document.getElementById("user-1").srcObject = localStream;
    createOffer()
}

let createOffer = async() =>{
    peerConnection = new RTCPeerConnection(servers)
    remoteStream = new MediaStream();
    document.getElementById("user-2").srcObject = remoteStream;

    localStream.getTracks().forEach((track)=>{
        peerConnection.addTrack(track,localStream)
    })

    peerConnection.ontrack = (event) =>{
        event.streams[0].getTracks().forEach((track)=>{
            remoteStream.addTrack()
        })
    }

    peerConnection.onicecandidate = async (event) =>{
        if(event.candidate){
            console.log("New ICE Candidate:", event.candidate)
        }
    }

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console.log("Offer :", offer);
}

init();
