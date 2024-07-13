import { useDispatch } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Posts from "../components/Posts";
import CommentItem from "../components/CommentItem";
import TopSection from "../components/Profile/TopSection";
import FollowersSection from "../components/Profile/FollowersSection";
import UserInfoSection from "../components/Profile/UserSection";
import SwitchPostSection from "../components/Profile/SwitchPostSection";
import LoadingModal from "../components/LoadingModal";
import { fetchProfileUser } from "../redux/slicers/profileUser";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { profileUser, loading } = useSelector((state) => state.profileUser);
  const { posts } = useSelector((state) => state.post);
  const { id } = useParams();
  const dispatch = useDispatch();

  // Switch Post Sections
  const [showPost, setShowPost] = useState(true);
  const [showReplies, setShowReplies] = useState(false);
  const [showLiked, setShowLiked] = useState(false);

  const likedPosts = useMemo(() => {
    return [...posts]?.filter(
      (item) =>
        item.author._id !== user._id &&
        item.likes.some((like) => like === profileUser?._id)
    );
  }, [posts, profileUser, user]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProfileUser({ userId: id }));
    }
  }, [id, dispatch]);

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
            <TopSection currentUser={profileUser} />
            <FollowersSection
              currentUser={profileUser}
              fetchCurrentUser={fetchProfileUser}
              setCurrentUser={() => {}}
            />
            <UserInfoSection currentUser={profileUser} />
            {(profileUser?.privacy === "public" ||
              profileUser?.followers?.includes(user?._id) ||
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
            {(profileUser?.privacy === "public" ||
              profileUser?.followers?.includes(user?._id) ||
              user?._id === id) && (
              <>
                <div className="mt-4 w-full">
                  {showPost && (
                    <Posts posts={profileUser?.posts} condition={"both"} />
                  )}
                  {showReplies &&
                    profileUser?.comments?.map((c, index) => (
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
