import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import apiRequest from "../services/apiRequest";
import { CRUD_POST } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import PostItem from "../components/PostIem";
import RequestItems from "../components/RequestItems";
import BackNavigate from "../components/BackNavigate";

function Post() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  const fetchCurrentPost = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiRequest({
        method: "get",
        url: `${CRUD_POST}/${id}`,
      });

      console.log(res.data);
      setPost(res.data.post);
      // toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      fetchCurrentPost();
    }
  }, [id]);

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
            {!loading && <PostItem {...post} />}
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
