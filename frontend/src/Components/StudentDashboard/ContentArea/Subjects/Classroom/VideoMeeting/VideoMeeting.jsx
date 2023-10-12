import React, { useState, useEffect, useRef } from "react";
import SimplePeer from "simple-peer";

function VideoMeeting() {
  const [stream, setStream] = useState(null);
  // eslint-disable-next-lin
  const [peer, setPeer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    // Access the user's camera and microphone
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        localVideoRef.current.srcObject = stream;
      });

    // Clean up when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleStartMeeting = () => {
    const newPeer = new SimplePeer({ initiator: true, stream });

    newPeer.on("signal", (data) => {
      // Send the 'data' to the other peer through your signaling channel
    });

    newPeer.on("stream", (remoteStream) => {
      remoteVideoRef.current.srcObject = remoteStream;
    });

    setPeer(newPeer);
  };

  const handlePauseVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !isPaused;
      });
      setIsPaused(!isPaused);
    }
  };

  return (
    <div>
      <h2>Video Meeting</h2>

      <div>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      </div>

      <div>
        <button onClick={handleStartMeeting}>Start Meeting</button>
        <button onClick={handlePauseVideo}>
          {isPaused ? "Pause Video" : "Resume Video"}
        </button>
      </div>

      <div>
        <video
          ref={remoteVideoRef}
          autoPlay
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      </div>
    </div>
  );
}

export default VideoMeeting;
