import { useCallback, useEffect, useState } from "react";
import useEmoji from "../hooks/useEmoji";
import toast from "react-hot-toast";
import { CRUD_COMMENT, REPLY_ON_COMMENT } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../services/apiRequest";
import { fetchPosts } from "../redux/slicers/post";
import { fetchComments } from "../redux/slicers/comments";

function CommentModal({ isOpen, onClose, postId, comment }) {
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const { PickEmojiComponent, EmojiPickerComponent } = useEmoji({
    setText,
    setShowPicker,
    showPicker,
  });
  const { isLoading, setIsLoading } = useState(false);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);

  const handleCommentSubmit = useCallback(async () => {
    if (!user) {
      toast.error("You must be logged in to comment");
      return;
    }
    try {
      const res = await apiRequest({
        method: "post",
        url: CRUD_COMMENT,
        data: { text, postId },
        token,
      });
      console.log(res);
      toast.success(res.data.message);
      dispatch(fetchPosts());
      dispatch(fetchComments());
      if(location.pathname.startsWith("/profile")){
        
      }
      setText("");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }, [text, postId, onClose, token, dispatch]);

  const handleReplyOnComment = useCallback(async () => {
    try {
      const res = await apiRequest({
        method: "post",
        url: `${REPLY_ON_COMMENT}/${comment?._id}`,
        data: {
          text,
          parent: comment?.parent === null ? comment?._id : comment?.parent,
          post: comment?.post,
        },
        token,
      });
      console.log(res);
      toast.success(res.data.message);
      dispatch(fetchPosts());
      dispatch(fetchComments());
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }, [comment, onClose, text, token, dispatch]);

  const handleSubmit = () => {
    if (comment?._id) {
      handleReplyOnComment();
    } else {
      handleCommentSubmit();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div
      className={` bg-black/60 backdrop-blur-sm items-center flex justify-center fixed z-[9999] top-0 left-0 right-0 bottom-0`}
    >
      <div className=" flex absolute z-[1000] right-0 top-0 p-4">
        <button onClick={onClose} className=" text-2xl text-gray-400">
          &times;
        </button>
      </div>

      {/* Write comment */}
      <div className=" flex flex-col gap-2 md:w-1/3 md:px-0 w-full px-6 relative">
        <h1 className=" text-white">Write your comment</h1>
        <textarea
          className=" w-full border dark:text-white dark:bg-dark_secondary_bg border-gray-300 h-[200px] resize-none rounded-lg p-2"
          placeholder="Write your comment here..."
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setShowPicker(false)}
          value={text}
        />
        <PickEmojiComponent />
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className=" bg-main_dark_violet_color w-1/2 mx-auto hover:bg-main_light_purple transition rounded-full px-8 text-text_color py-2"
        >
          {isLoading ? "Loading.." : "Comment"}
        </button>
        <EmojiPickerComponent />
      </div>
    </div>
  );
}

export default CommentModal;
