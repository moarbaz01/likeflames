import { toast } from "react-hot-toast";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CRUD_POST } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../services/apiRequest";
import LoadingModal from "./LoadingModal";
import PostOptionModal from "./Post/PostOptionModal";
import PostTagsItem from "./Post/PostTagsItem";
import WriteCommentAndIconsLabels from "./Post/WriteCommentAndIconsLabels";
import LikeDislikeAndShareIcons from "./Post/LikeDislikeAndShareIcons";
import ImageTagItem from "./Post/ImageTagItem";
import VideoTagItem from "./Post/VideoTagItem";
import PostTopSection from "./Post/PostTopSection";
import UsernameAndDescription from "./Post/UsernameAndDescription";
import { fetchPosts, likePost, updatePostOnLike } from "../redux/slicers/post";
import { fetchUser } from "../redux/slicers/user";
import {
  fetchProfileUser,
  likePostProfileUser,
} from "../redux/slicers/profileUser";
import CommentModal from "./CommentModal";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: true,
};

function PostItem({
  author,
  files,
  likes,
  comments,
  description,
  tags,
  createdAt,
  _id,
  postType,
}) {
  const { user, token } = useSelector((state) => state.user);
  const isLiked = useMemo(() => likes?.includes(user?._id), [user?._id, likes]);
  const [heart, setHeart] = useState(isLiked);
  const [showPostOptionModal, setShowPostOptionModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getFileType = (file) => {
    const firstSplit = file.split("/upload")[0];
    const secondSplit = firstSplit.split("/");
    return secondSplit[secondSplit.length - 1];
  };

  const handleDeletePost = useCallback(async () => {
    if (!user) {
      toast("Login your account");
      return;
    }
    if (!confirm("Are you sure")) return;
    try {
      setLoading(true);
      const res = await apiRequest({
        method: "delete",
        url: `${CRUD_POST}/${_id}`,
        token,
      });
      toast.success(res.data.message);
      dispatch(fetchUser(token));
      dispatch(fetchPosts());
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [user, _id, token, dispatch]);

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

  const handleOpenCommentModal = () => {
    if (!user) {
      toast.error("Login your account");
      return;
    }
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => setShowCommentModal(false);

  useEffect(() => {
    if (heart !== isLiked) {
      setHeart(isLiked);
    }
  }, [isLiked, heart]);

  return (
    <>
      <div className="w-full md:p-4 p-2 mb-4 relative dark:drop-shadow-xl bg-main_bg_white dark:bg-dark_secondary_bg rounded-xl">
        <PostTopSection
          navigateToPostPage={() => navigate(`/profile/${author._id}`)}
          user={author}
          setShowPostOptionModal={setShowPostOptionModal}
          date={createdAt}
        />
        <div className="md:p-4 m-auto">
          <Slider {...settings}>
            {files?.map((file, index) =>
              getFileType(file) === "video" ? (
                <VideoTagItem key={index} file={file} />
              ) : (
                <ImageTagItem key={index} file={file} />
              )
            )}
          </Slider>
        </div>
        <UsernameAndDescription user={author} description={description} />
        <LikeDislikeAndShareIcons
          handleLikeAndDislike={handleLikeAndDislike}
          setHeart={setHeart}
          heart={heart}
          likes={likes}
          comments={comments}
        />
        <WriteCommentAndIconsLabels
          comments={comments}
          likes={likes}
          _id={_id}
          handleOpenCommentModal={handleOpenCommentModal}
          postType={postType}
        />
        <PostTagsItem tags={tags} />
        {showPostOptionModal && (
          <PostOptionModal
            currentUser={author}
            postId={_id}
            postType={postType}
            handleDeletePost={handleDeletePost}
          />
        )}
      </div>
      <LoadingModal isOpen={loading} message={`Deleting ${postType}...`} />
      <CommentModal
        isOpen={showCommentModal}
        onClose={handleCloseCommentModal}
        postId={_id}
      />
    </>
  );
}

export default PostItem;
