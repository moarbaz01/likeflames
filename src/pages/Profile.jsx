import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Posts from "../components/Posts";
import apiRequest from "../services/apiRequest";
import { FETCH_USER } from "../services/api";
import CommentItem from "../components/CommentItem";
import TopSection from "../components/Profile/TopSection";
import FollowersSection from "../components/Profile/FollowersSection";
import UserInfoSection from "../components/Profile/UserSection";
import SwitchPostSection from "../components/Profile/SwitchPostSection";
import LoadingModal from "../components/LoadingModal";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [showPost, setShowPost] = useState(true);
  const [showReplies, setShowReplies] = useState(false);
  const { posts } = useSelector((state) => state.post);
  const [showLiked, setShowLiked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const likedPosts = useMemo(() => {
    return [...posts]?.filter((item) =>
      item.likes.some((like) => like === currentUser?._id)
    );
  }, [posts, currentUser?._id]);

  const fetchCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiRequest({
        method: "get",
        url: `${FETCH_USER}/${id}`,
      });
      setCurrentUser((prev) => ({ ...prev, ...res.data.user }));
      console.log(res.data.user);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCurrentUser();
    }
  }, [id]);

  if (loading) {
    return <LoadingModal isOpen={loading} message={"Loading..."} />;
  }

  return (
    <div className="">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="flex w-full justify-center px-2 md:gap-4 md:pt-24 pt-4 md:h-screen rounded-xl md:overflow-y-auto">
        <Sidebar />
        <div className="md:overflow-y-auto md:h-full h-auto md:w-[70vw] w-full ">
          <div className="w-full rounded-xl md:pb-12 pb-24 ">
            <TopSection currentUser={currentUser} />
            <FollowersSection
              currentUser={currentUser}
              fetchCurrentUser={fetchCurrentUser}
              setCurrentUser={setCurrentUser}
            />
            <UserInfoSection currentUser={currentUser} />
            {(currentUser?.privacy === "public" ||
              currentUser?.followers?.includes(user?._id) ||
              user?._id === id) && (
              <SwitchPostSection
                showLiked={showLiked}
                showReplies={showReplies}
                showPost={showPost}
                setShowLiked={setShowLiked}
                setShowPost={setShowPost}
                setShowReplies={setShowReplies}
              />
            )}
            {(currentUser?.privacy === "public" ||
              currentUser?.followers?.includes(user?._id) ||
              user?._id === id) && (
              <>
                <div className="mt-4 w-full">
                  {showPost && (
                    <Posts posts={currentUser?.posts} condition={"both"} />
                  )}
                  {showReplies &&
                    currentUser?.comments?.map((c, index) => (
                      <CommentItem key={index} props={c} tag="profile" />
                    ))}
                  {showLiked && likedPosts?.length > 0 && (
                    <Posts posts={likedPosts} condition={"both"} />
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right */}
        {/* <div className="sticky top-0 h-full md:block  ">
        <RequestItems />
      </div> */}
      </div>
    </div>
  );
};

export default Profile;
