import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./index.scss";
import { SERVICE_URL } from "../../constants.js";
import { useEffect, useRef, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Image, Button } from "antd"; // Import Button for navigation
import { FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons

export default function ServiceImages({ service }) {
    const swiperRef = useRef(null);
    const videoRefs = useRef({});

    useEffect(() => {
        const timer = setTimeout(() => {
            AOS.init({
                duration: 1000,
                once: true,
            });
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    const [videoStates, setVideoStates] = useState({});

    const togglePlay = (index) => {
        const video = videoRefs.current[index];
        if (video) {
            if (video.paused) {
                video.play();
                setVideoStates((prev) => ({ ...prev, [index]: { ...prev[index], isPlaying: true } }));
            } else {
                video.pause();
                setVideoStates((prev) => ({ ...prev, [index]: { ...prev[index], isPlaying: false } }));
            }
        }
    };

    const toggleFullscreen = (index) => {
        const video = videoRefs.current[index];
        const videoWrapper = video?.parentElement;
        if (video && videoWrapper) {
            if (!document.fullscreenElement) {
                if (videoWrapper.requestFullscreen) {
                    videoWrapper.requestFullscreen();
                } else if (videoWrapper.mozRequestFullScreen) {
                    videoWrapper.mozRequestFullScreen();
                } else if (videoWrapper.webkitRequestFullscreen) {
                    videoWrapper.webkitRequestFullscreen();
                } else if (videoWrapper.msRequestFullscreen) {
                    videoWrapper.msRequestFullscreen();
                }
                setVideoStates((prev) => ({
                    ...prev,
                    [index]: { ...prev[index], isFullscreen: true },
                }));
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                setVideoStates((prev) => ({
                    ...prev,
                    [index]: { ...prev[index], isFullscreen: false },
                }));
            }
        }
    };

    const handleProgress = (index) => {
        const video = videoRefs.current[index];
        if (video) {
            const progress = (video.currentTime / video.duration) * 100;
            setVideoStates((prev) => ({ ...prev, [index]: { ...prev[index], progress } }));
        }
    };

    const handleSeek = (index, e) => {
        const video = videoRefs.current[index];
        if (video) {
            const progress = e.target.value;
            video.currentTime = (progress / 100) * video.duration;
            setVideoStates((prev) => ({ ...prev, [index]: { ...prev[index], progress } }));
        }
    };

    const initializeVideoState = (index) => {
        setVideoStates((prev) => ({
            ...prev,
            [index]: { isPlaying: false, isFullscreen: false, progress: 0 },
        }));
    };

    const videoExtensions = /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv|m4v|3gp|3g2)$/i;

    // Custom navigation buttons for preview
    const renderPreviewToolbar = ({ image, actions }) => {
        const { onPrev, onNext } = actions; // Ant Design provides these actions
        const isFirstImage = actions.current === 0; // Check if it's the first image
        const isLastImage = actions.current === service?.serviceImages?.filter((media) => !videoExtensions.test(media)).length - 1; // Check if it's the last image

        return (
            <div className="ant-image-preview-operations">
                <Button
                    icon={<FaArrowLeft />}
                    onClick={onPrev}
                    disabled={isFirstImage} // Disable if first image
                    style={{ marginRight: 10 }}
                    aria-label="Previous image"
                />
                <Button
                    icon={<FaArrowRight />}
                    onClick={onNext}
                    disabled={isLastImage} // Disable if last image
                    aria-label="Next image"
                />
            </div>
        );
    };

    return (
        <section id="serviceImages" data-aos="fade-up">
            <Swiper
                spaceBetween={30}
                slidesPerView={1.2}
                className="mySwiper"
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
                    320: { slidesPerView: 1.2 },
                    480: { slidesPerView: 2.2 },
                    768: { slidesPerView: 3.2 },
                    1024: { slidesPerView: 3.2 },
                }}
            >
                <Image.PreviewGroup
                    preview={{
                        toolbarRender: renderPreviewToolbar, // Custom toolbar with navigation
                        imageRender: (originalNode, info) => {
                            // Ensure only images (not videos) are shown in preview
                            const isVideo = videoExtensions.test(service?.serviceImages[info.current]);
                            return isVideo ? null : originalNode;
                        },
                    }}
                >
                    {service?.serviceImages?.map((media, index) => {
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
                                            title={`ColorStorm Events xidməti videosu ${index + 1}`}
                                            onTimeUpdate={() => handleProgress(index)}
                                        >
                                            <source src={SERVICE_URL + media} type="video/mp4" />
                                            Brauzeriniz video etiketini dəstəkləmir.
                                        </video>
                                        <div className="video-controls">
                                            <button
                                                className="play-pause-btn"
                                                onClick={() => togglePlay(index)}
                                                aria-label={videoStates[index]?.isPlaying ? "Videonu dayandır" : "Videonu oynat"}
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
                                                aria-label="Video irəliləmə çubuğu"
                                            />
                                            <button
                                                className="fullscreen-btn"
                                                onClick={() => toggleFullscreen(index)}
                                                aria-label={
                                                    videoStates[index]?.isFullscreen ? "Tam ekrandan çıx" : "Tam ekran et"
                                                }
                                            >
                                                {videoStates[index]?.isFullscreen ? "⤡" : "⤢"}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <Image
                                        src={SERVICE_URL + media}
                                        alt={`ColorStorm Events xidməti ${index + 1}`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            aspectRatio: "16/9",
                                            objectFit: "cover",
                                            borderRadius: "20px",
                                        }}
                                        preview={{
                                            mask: <FaEye />,
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