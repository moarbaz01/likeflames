import { useMemo } from "react";
import Sidebar from "../components/Layout/Sidebar";
import Navbar from "../components/Layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import PostItem from "../components/Post/PostIem";
import RequestItems from "../components/Others/RequestItems";
import BackNavigate from "../components/Layout/BackNavigate";
import { useSelector } from "react-redux";

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.post);

  const post = useMemo(() => {
    if (posts.length === 0) {
      return null;
    } else {
      return posts.find((item) => item._id === id);
    }
  }, [id, posts]);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  // if (loading) {
  //   return <LoadingModal isOpen={loading} message={"Fetching Post"} />;
  // }
  return (
    <div className="">
      <BackNavigate handleNavigateBack={handleNavigateBack} />
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="flex w-full relative justify-center px-2 md:gap-4 md:pt-24 pt-4 md:h-screen rounded-xl md:overflow-y-auto">
        <Sidebar />
        <div className="md:overflow-y-auto relative md:h-full h-auto lg:w-[50vw] md:w-[70vw] w-full ">
          <div className="w-full rounded-xl md:pb-12 pb-24 ">
            {post !== null && <PostItem {...post} />}
          </div>
        </div>
        <div className="sticky z-0 top-0 h-full md:block  ">
          <RequestItems />
        </div>
      </div>
    </div>
  );
}

export default Post;
