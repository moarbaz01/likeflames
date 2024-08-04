import React, { useCallback, useEffect, useRef, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { FaHeart, FaShare } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import toast from "react-hot-toast";
import { fetchUser } from "../../redux/slicers/user";
import { useDispatch, useSelector } from "react-redux";
import { likePost, updatePostOnLike } from "../../redux/slicers/post";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { likePostProfileUser } from "../../redux/slicers/profileUser";
import { motion } from "framer-motion";

const FeedItem = ({
  author,
  description,
  files,
  _id,
  likes,
  shares,
  views,
  dislikes,
  comments,
  postType,
  publish,
}) => {
  const [play, setPlay] = useState(true);
  const { user, token } = useSelector((state) => state.user);
  const [heart, setHeart] = useState(likes?.includes(user?._id) ? true : false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const feedId = searchParams.get("id") || null;
  const location = useLocation();

  useEffect(() => {
    if (feedId === _id) {
      videoRef?.current?.scrollIntoView();
    }
  }, [_id, feedId]);

  const handleLikeAndDislike = useCallback(async () => {
    if (!user) {
      toast.error("Login your account");
      return;
    }
    setHeart(!heart);
    dispatch(likePost({ id: _id }));
    dispatch(updatePostOnLike({ postId: _id, userId: user?._id }));
    dispatch(fetchUser(token));
    if (location.pathname.startsWith("/profile")) {
      dispatch(likePostProfileUser({ postId: _id, userId: user?._id }));
    }
  }, [dispatch, token, _id, heart, user, location.pathname]);

  const togglePlayPause = useCallback(() => {
    setPlay(!play);
    const video = videoRef?.current;
    if (play) {
      video.play();
    } else {
      video.pause();
    }
  }, [play]);

  const handleShare = () => {
    navigator.clipboard.writeText(
      `https://likeflames.vercel.app/feed?id=${_id}`
    );
    toast.success("Link copied to clipboard");
  };

  const handleComment = () => {
    navigate(`/comments?id=${_id}&post=${postType}`);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setPlay(true);
          videoRef.current?.pause();
        } else {
          setPlay(false);
          videoRef.current?.play();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [videoRef, containerRef]);

  return (
    <div
      ref={containerRef}
      className=" h-full w-full md:w-[420px] md:min-w-[320px] snap-start bg-white overflow-hidden"
    >
      <div className="relative h-full w-full md:mx-0 mx-auto flex items-center justify-center">
        <video
          onClick={togglePlayPause}
          loop
          autoPlay
          ref={videoRef}
          className="w-full object-cover object-center h-full"
          src={files[0]}
        />
        {/* Bottom */}
        <div className="absolute bg-white/40 bottom-0 left-0 right-0 px-2 py-3 text-white">
          <div
            className="flex cursor-pointer"
            onClick={() => navigate(`/profile/${author?._id}`)}
          >
            <img
              src={author?.profilePicture}
              className="h-12 w-12 rounded-full "
              alt=""
            />
            <div className="ml-4">
              <h2 className="text-xl font-bold">{author?.name}</h2>
              <p className="text-sm ">2 hours ago</p>
            </div>
          </div>
          <p className="text-sm mt-2">{description}</p>
        </div>

        {/* Right icons */}
        <div className="absolute right-2 top-[50%]">
          <div className="text-white text-center">
            <motion.div
              whileTap={{ scale: 0.9, opacity: 0.8 }}
              onClick={handleLikeAndDislike}
            >
              <FaHeart
                fill={heart ? "red" : "white"}
                size={30}
                className="cursor-pointer"
              />
            </motion.div>
            <span>{likes?.length}</span>
          </div>
          <div onClick={handleComment} className="text-white mt-4 text-center">
            <FaMessage size={30} className="cursor-pointer" />
            <span>{comments?.length}</span>
          </div>
          <div onClick={handleShare} className="text-white mt-4 text-center">
            <FaShare size={30} className="cursor-pointer" />
            {/* <span>{shares?.length}</span> */}
          </div>
        </div>

        {/* Play And Pause Button */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <button onClick={togglePlayPause}>
            {play && (
              <CiPlay1
                size={40}
                className="cursor-pointer text-white bg-main_dark_violet_color p-2 rounded-full"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
