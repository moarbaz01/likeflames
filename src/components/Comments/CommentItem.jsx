import React, { useCallback, useMemo, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../../redux/slicers/post";
import toast from "react-hot-toast";
import CommentModal from "../Modal/CommentModal";
import {
  fetchComments,
  likeOnComment,
  likeOnCommentApi,
} from "../../redux/slicers/comments";
import useRelativeTime from "../../hooks/useRelativeTime";

const CommentItem = ({ props, hiddenReplies = true, tag }) => {
  const {
    author,
    text,
    gif,
    likes,
    replies,
    _id,
    createdAt,
    parent,
    replyTo,
    post,
  } = props;
  const { user, token } = useSelector((state) => state.user);
  const relativeTime = useRelativeTime(new Date(createdAt));
  const [showReplies, setShowReplies] = useState(false);
  const [isLiked, setIsLiked] = useState(likes?.includes(user?._id));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const { comments } = useSelector((state) => state.comment);

  const repliesData = useMemo(
    () => comments?.filter((c) => c?.parent?._id === _id) || [],
    [comments, _id]
  );

  const handleGoToPost = useCallback(() => {
    if (navigate) {
      navigate(`/post/${post}`);
    }
  }, [post, navigate]);

  const handleLikeAndUnlike = useCallback(async () => {
    if (!user) {
      toast.error("Please login to like or unlike");
      return;
    }
    setIsLiked((prevIsLiked) => !prevIsLiked); // Toggle like state
    dispatch(likeOnCommentApi({ _id }));
    dispatch(likeOnComment({ userId: user?._id, commentId: _id }));
    dispatch(fetchPosts());
  }, [user, _id, dispatch]);

  return (
    <div>
      <div className="mt-4 bg-white rounded-lg p-4 shadow-sm dark:bg-dark_secondary_bg">
        <div className="flex items-start text-lg gap-2">
          <img
            onClick={() => navigate(`/profile/${author._id}`)}
            src={author?.profilePicture}
            alt={author?.username}
            className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
          />
          <div className="flex flex-col text-gray-500 dark:text-white">
            <p
              onClick={() =>
                hiddenReplies && navigate(`/profile/${author._id}`)
              }
              className="cursor-pointer font-semibold hover:opacity-80"
            >
              {user?._id === author?._id
                ? "You"
                : hiddenReplies
                ? `@${author?.username}`
                : `Reply @${replyTo?.author?.username}`}
            </p>
            <p className="text-xs text-gray-400">{relativeTime}</p>
          </div>
        </div>
        {/* Gif image */}
        {gif && (
          <img src={gif} alt="" className="rounded-xl mt-4 h-52 object-cover" />
        )}
        <p className="mt-4 text-gray-500 dark:text-gray-300 md:w-2/3 whitespace-pre-wrap">
          {text}
        </p>
        <div className="flex items-center justify-between w-full mt-4">
          {tag === "profile" && (
            <div
              onClick={handleGoToPost}
              className="cursor-pointer hover:text-main_light_purple text-lg text-main_dark_violet_color items-center gap-1"
            >
              Go to post
            </div>
          )}
          {user && (
            <div className="flex items-center gap-4">
              {tag !== "profile" && (
                <button
                  onClick={() => setShowCommentModal(true)}
                  className="hover:bg-main_light_purple text-lg bg-main_dark_violet_color px-4 py-1 rounded-md text-white"
                >
                  Reply...
                </button>
              )}
              {tag !== "profile" && hiddenReplies && replies?.length !== 0 && (
                <div
                  onClick={() => setShowReplies(!showReplies)}
                  className="cursor-pointer hover:text-main_light_purple text-lg text-main_dark_violet_color items-center gap-1"
                >
                  {!showReplies ? "View" : "Hide"} {repliesData?.length} replies
                </div>
              )}
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="dark:text-white">
              {likes?.length} {tag === "profile" ? "Likes" : ""}
            </span>
            {tag !== "profile" && (
              <FaHeart
                onClick={handleLikeAndUnlike}
                className={`cursor-pointer text-xl ${
                  isLiked ? "text-red-500" : "dark:text-white"
                }`}
              />
            )}
          </div>
        </div>
      </div>

      <div className="ml-6">
        {showReplies &&
          repliesData?.map((r) => (
            <div key={r._id} className="">
              <CommentItem props={r} hiddenReplies={false} />
            </div>
          ))}
      </div>

      <CommentModal
        isOpen={showCommentModal}
        comment={{ _id, parent, post }}
        onClose={() => setShowCommentModal(false)}
      />
    </div>
  );
};

export default CommentItem;
