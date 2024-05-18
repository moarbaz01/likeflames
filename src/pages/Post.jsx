import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { comments, posts } from "../data";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";

function Post({ reelData }) {
  const [showReplies, setShowReplies] = useState(false);
  const [heart, setHeart] = useState(false);
  return (
    <div className=" md:pb-0 pb-24 ">
      <div className=" md:static fixed border-b-2 top-0 left-0 w-full z-[999]">
        <Navbar />
      </div>
      <div className="relative mx-auto max-w-[1400px] mt-4">
        <Sidebar />
        <div className=" md:ml-[320px] md:mt-0 mt-20 mx-2 md:mx-0  flex justify-between gap-4 ">
          <div className=" md:h-[90vh] rounded-xl overflow-y-scroll ">
            {/* <Reel
              user={posts[0].user}
              file={posts[0].file}
              likes={posts[0].likes}
              comments={posts[0].comments}
              caption={posts[0].caption}
            /> */}
            {/* Comments */}
            <h1 className=" text-lg font-[400] text-gray-500">All Comments</h1>
            <div className="  p-2 rounded-md">
              {comments.map((comment, index) => {
                return (
                  <div key={index} className="mt-4">
                    <div className=" flex items-start text-lg gap-2 ">
                      <img
                        src={comment.user.profile}
                        alt=""
                        className="w-[40px] h-[40px] rounded-full"
                      />
                      <h1 className=" font-[400] text-gray-500">
                        {comment.user.name}
                      </h1>
                    </div>
                    {/* Gif image */}
                    <div className="ml-12">
                      <img
                        src={comment.gif}
                        alt=""
                        className=" rounded-xl h-[100px] mt-2"
                      />
                      <p className=" mt-2 text-gray-500">{comment.comment}</p>
                      <div className=" w-full flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span>0</span>
                          {!heart ? (
                            <CiHeart
                              onClick={() =>
                                heart ? setHeart(false) : setHeart(true)
                              }
                              className=" cursor-pointer text-xl"
                            />
                          ) : (
                            <FaHeart
                              fill="red"
                              onClick={() =>
                                heart ? setHeart(false) : setHeart(true)
                              }
                              className=" cursor-pointer text-xl"
                            />
                          )}
                        </div>
                        {comment.replies && comment.replies.length > 1 && (
                          <div
                            onClick={() => setShowReplies(!showReplies)}
                            className="flex cursor-pointer hover:text-main_dark_violet_color text-main_dark_violet_color items-center gap-1"
                          >
                            view 2 replies
                          </div>
                        )}
                      </div>
                      {/* Replies */}
                      {showReplies &&
                        comment.replies?.map((reply, index) => {
                          return (
                            <div key={index} className="mt-4">
                              <div className=" flex items-start text-lg gap-2 ">
                                <img
                                  src={reply.user.profile}
                                  alt=""
                                  className="w-[40px] h-[40px] rounded-full"
                                />
                                <h1 className=" font-[400] text-gray-500">
                                  {reply.user.name}
                                </h1>
                                <p className="">@{reply.reciever}</p>
                              </div>
                              {/* Gif image */}
                              <div className="ml-12">
                                <img
                                  src={reply?.gif}
                                  alt=""
                                  className=" rounded-xl h-[100px] mt-2"
                                />
                                <p className=" mt-2 text-gray-500">
                                  {reply?.comment}
                                </p>
                                <div className=" w-full flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <span>0</span>
                                    {!heart ? (
                                      <CiHeart
                                        onClick={() =>
                                          heart
                                            ? setHeart(false)
                                            : setHeart(true)
                                        }
                                        className=" cursor-pointer text-xl"
                                      />
                                    ) : (
                                      <FaHeart
                                        fill="red"
                                        onClick={() =>
                                          heart
                                            ? setHeart(false)
                                            : setHeart(true)
                                        }
                                        className=" cursor-pointer text-xl"
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
