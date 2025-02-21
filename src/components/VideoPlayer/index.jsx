import {useRef, useEffect} from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({src}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const player = videojs(videoRef.current, {
            controls: true,
            autoplay: false,
            preload: "auto",
            responsive: true,
            fluid: true,
            inactivityTimeout: 100
        });

        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, []);

    return (
        <video ref={videoRef} className="video-js vjs-theme-city" style={{
            overflow: "hidden",
        }}>
            <source src={src} type={`video/${src.split(".").pop()}`}/>
            Tarayıcınız bu videoyu desteklemiyor.
        </video>
    );
};

export default VideoPlayer;
