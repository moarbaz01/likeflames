import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import CommentItem from "../components/CommentItem";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import CommentModal from "../components/CommentModal";
import BackNavigate from "../components/BackNavigate";
import RequestItems from "../components/RequestItems";
function Comments() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const postType = searchParams.get("post");
  const [newComments, setNewComments] = useState([]);
  const { comments, isLoading } = useSelector((state) => state.comment);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleOpenCommentModal = () => {
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
  };

  const handleNavigateBack = () => {
    if (postType === "reel") {
      navigate(`/feed?id=${id}`);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const postComments = comments?.filter(
      (item) => !item.parent && item.post === id
    );

    const sortedComments = postComments?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    // Set sorted comments to state
    setNewComments(sortedComments);
  }, [id, comments]);

  return (
    <div className="">
      <BackNavigate handleNavigateBack={handleNavigateBack} />
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="flex w-full relative justify-center px-2 md:gap-4 md:pt-24 pt-4 md:h-screen rounded-xl md:overflow-y-auto">
        <Sidebar />
        <div className="md:overflow-y-auto relative h-auto lg:w-[50vw] md:w-[70vw] w-full ">
          <div className="w-full rounded-xl md:pb-4 pb-0 ">
            {/* Comments */}
            <h1 className=" text-lg font-[400] text-gray-500">All Comments</h1>
            <div className="  p-2 rounded-md">
              {newComments?.length > 0 &&
                newComments?.map((comment, index) => {
                  return <CommentItem key={index} props={comment} />;
                })}
            </div>
          </div>
          {user && (
            <div
              onClick={handleOpenCommentModal}
              className="fixed md:sticky md:w-fit float-end md:right-0 right-4 bottom-10  cursor-pointer z-[50] bg-main_light_purple p-4 flex items-center justify-center rounded-full text-3xl"
            >
              <CiEdit />
            </div>
          )}
        </div>
        <div className="sticky z-0 top-0 h-full md:block  ">
          <RequestItems />
        </div>
      </div>

      <CommentModal
        isOpen={showCommentModal}
        onClose={handleCloseCommentModal}
        postId={id}
      />
    </div>
  );
}

export default Comments;
