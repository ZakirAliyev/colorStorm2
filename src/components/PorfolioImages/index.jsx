import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./index.scss";
import {PORTFOLIO_URL} from "../../constants.js";
import {useEffect, useRef, useState} from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import {Image, Button} from "antd";
import {FaEye, FaArrowLeft, FaArrowRight} from "react-icons/fa";

export default function PortfolioImages({service}) {
    const swiperRef = useRef(null);
    const videoRefs = useRef({});
    const [videoStates, setVideoStates] = useState({});

    // Initialize AOS
    useEffect(() => {
        const timer = setTimeout(() => {
            AOS.init({
                duration: 1000,
                once: true,
            });
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    // Video control functions
    const togglePlay = (index) => {
        const video = videoRefs.current[index];
        if (video) {
            if (video.paused) {
                video.play();
                setVideoStates((prev) => ({...prev, [index]: {...prev[index], isPlaying: true}}));
            } else {
                video.pause();
                setVideoStates((prev) => ({...prev, [index]: {...prev[index], isPlaying: false}}));
            }
        }
    };

    const toggleFullscreen = (index) => {
        const video = videoRefs.current[index];
        const videoWrapper = video?.parentElement;
        if (video && videoWrapper) {
            if (!document.fullscreenElement) {
                videoWrapper.requestFullscreen();
                setVideoStates((prev) => ({
                    ...prev,
                    [index]: {...prev[index], isFullscreen: true},
                }));
            } else {
                document.exitFullscreen();
                setVideoStates((prev) => ({
                    ...prev,
                    [index]: {...prev[index], isFullscreen: false},
                }));
            }
        }
    };

    const handleProgress = (index) => {
        const video = videoRefs.current[index];
        if (video) {
            const progress = (video.currentTime / video.duration) * 100;
            setVideoStates((prev) => ({...prev, [index]: {...prev[index], progress}}));
        }
    };

    const handleSeek = (index, e) => {
        const video = videoRefs.current[index];
        if (video) {
            const progress = e.target.value;
            video.currentTime = (progress / 100) * video.duration;
            setVideoStates((prev) => ({...prev, [index]: {...prev[index], progress}}));
        }
    };

    const initializeVideoState = (index) => {
        setVideoStates((prev) => ({
            ...prev,
            [index]: {isPlaying: false, isFullscreen: false, progress: 0},
        }));
    };

    const videoExtensions = /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv|m4v|3gp|3g2)$/i;

    // Custom toolbar for image preview
    const renderPreviewToolbar = ({actions}) => {
        const {onPrev, onNext} = actions;
        const isFirstImage = actions.current === 0;
        const isLastImage =
            actions.current === service?.images?.filter((media) => !videoExtensions.test(media)).length - 1;

        return (
            <div className="ant-image-preview-operations">
                <Button
                    icon={<FaArrowLeft/>}
                    onClick={onPrev}
                    disabled={isFirstImage}
                    style={{marginRight: 10}}
                    aria-label="Previous image"
                />
                <Button
                    icon={<FaArrowRight/>}
                    onClick={onNext}
                    disabled={isLastImage}
                    aria-label="Next image"
                />
            </div>
        );
    };

    return (
        <section id="portfolioImages" data-aos="fade-up">
            <Swiper
                spaceBetween={30}
                slidesPerView={1.2}
                freeMode={true}
                freeModeSticky={true}
                touchStartPreventDefault={false}
                simulateTouch={true}
                touchRatio={1.5}
                grabCursor={true}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    320: {slidesPerView: 1.2},
                    480: {slidesPerView: 2.2},
                    768: {slidesPerView: 3.2},
                    1024: {slidesPerView: 3.2},
                }}
                className="mySwiper"
            >
                <Image.PreviewGroup
                    preview={{
                        toolbarRender: renderPreviewToolbar,
                        imageRender: (originalNode, info) => {
                            const isVideo = videoExtensions.test(service?.images[info.current]);
                            return isVideo ? null : originalNode;
                        },
                    }}
                >
                    {service?.images?.map((media, index) => {
                        const isVideo = videoExtensions.test(media);

                        return (
                            <SwiperSlide key={index}>
                                {isVideo ? (
                                    <div className="video-wrapper">
                                        <video
                                            ref={(el) => {
                                                videoRefs.current[index] = el;
                                                if (el && !videoStates[index]) {
                                                    initializeVideoState(index);
                                                }
                                            }}
                                            playsInline
                                            className="swiper-video"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                aspectRatio: "16/9",
                                                objectFit: "contain",
                                                borderRadius: "20px",
                                            }}
                                            title={`Portfolio video ${index + 1}`}
                                            onTimeUpdate={() => handleProgress(index)}
                                        >
                                            <source src={PORTFOLIO_URL + media} type="video/mp4"/>
                                            Your browser does not support the video tag.
                                        </video>
                                        <div className="video-controls">
                                            <button
                                                className="play-pause-btn"
                                                onClick={() => togglePlay(index)}
                                                aria-label={videoStates[index]?.isPlaying ? "Pause video" : "Play video"}
                                            >
                                                {videoStates[index]?.isPlaying ? "⏸" : "▶"}
                                            </button>
                                            <input
                                                type="range"
                                                className="progress-bar"
                                                min="0"
                                                max="100"
                                                value={videoStates[index]?.progress || 0}
                                                onChange={(e) => handleSeek(index, e)}
                                                aria-label="Video progress bar"
                                            />
                                            <button
                                                className="fullscreen-btn"
                                                onClick={() => toggleFullscreen(index)}
                                                aria-label={
                                                    videoStates[index]?.isFullscreen
                                                        ? "Exit fullscreen"
                                                        : "Enter fullscreen"
                                                }
                                            >
                                                {videoStates[index]?.isFullscreen ? "⤡" : "⤢"}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <Image
                                        src={PORTFOLIO_URL + media}
                                        alt={`Portfolio image ${index + 1}`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            aspectRatio: "16/9",
                                            objectFit: "cover",
                                            borderRadius: "20px",
                                        }}
                                        preview={{
                                            mask: <FaEye/>,
                                        }}
                                    />
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Image.PreviewGroup>
            </Swiper>
        </section>
    );
}