import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { RxCross1 } from "react-icons/rx";
import { MdEmojiEmotions } from "react-icons/md";
import toast from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import AddFileImage from "../assets/addFile.png";
import { CiTrash } from "react-icons/ci";
import { CRUD_POST } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import LoadingModal from "../components/Modal/LoadingModal";
import apiRequest from "../services/apiRequest";
import { fetchUser } from "../redux/slicers/user";
import { fetchPosts } from "../redux/slicers/post";

function CreatePost() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const postType = searchParams.get("type");
  const editType = searchParams.get("edit");
  const postId = searchParams.get('post');
  const [title, setTitle] = useState("");
  const [publish, setPublish] = useState("now");
  const [showPicker, setShowPicker] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [postFiles, setPostFiles] = useState([]);
  const [tag, setTag] = useState("");
  const { token, user } = useSelector((state) => state.user);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // Assuming a fixed post type for this example


  useEffect(() => {
    if (editType) {
      const post = user?.posts.find((post) => post._id === postId);
      if (post) {
        setTitle(post.title);
        setDescription(post.description);
        setTags(post.tags);
        setPublish(post.publish === "public" ? "now" : "later");
      }
    }
  }, [editType, postId, user?.posts]);

  const fileHandler = (e) => {
    const files = Array.from(e.target.files);
    let allowedFiles = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    if (postType === "post" && postFiles.length + allowedFiles.length > 4) {
      toast.error("You can upload only 4 files");
      return;
    }
    if (postType === "reel" && postFiles.length + allowedFiles.length > 1) {
      toast.error("You can upload only 1 file");
      return;
    }

    setAllFiles((prev) => [...prev, ...allowedFiles]);

    setPostFiles((prev) => [
      ...prev,
      ...allowedFiles.map((file) => ({
        type: file.type,
        blob: URL.createObjectURL(file),
      })),
    ]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!postId && postFiles.length === 0) {
      toast.error("Please select a file");
      return;
    }
    if (title.trim().length === 0) {
      toast.error("Please enter a title");
      return;
    }
    if (description.trim().length === 0) {
      toast.error("Please enter a description");
      return;
    }
    if (tags.length === 0) {
      toast.error("Please add at least one tag");
      return;
    }

    const formdata = new FormData();
    if (!(editType && postId)) {
      formdata.append("title", title);
      formdata.append("description", description);
      formdata.append("postType", postType);
      formdata.append("tags", JSON.stringify(tags));
      formdata.append("publish", publish === "later" ? "private" : "public");
      allFiles.forEach((file) => {
        formdata.append("files", file);
      });
    }
    try {
      setLoading(true);
      const res = await apiRequest({
        method: editType ? "put" : "post",
        url: postId ? `${CRUD_POST}/${postId}` : CRUD_POST,
        data: postId ? { title, tags, description, publish: publish === "later" ? "private" : "public" } : formdata,
        token,
      });
      toast.success(res.data.message);
      dispatch(fetchUser());
      dispatch(fetchPosts())
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  const handleShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setDescription((prev) => prev + emoji.native);
  };

  const handleCancle = useCallback((e) => {
    e.preventDefault();
    navigate(-1);
  }, [navigate]);

  const handleSetPostFiles = useCallback((index) => {
    let temp = postFiles.filter((_, i) => i !== index);
    setPostFiles(temp);
  }, [postFiles])

  const handleSetTags = useCallback((index) => {
    const temp = tags.filter((_, i) => i !== index)
    setTags(temp);
  }, [tags])

  const handleAddTag = (e) => {
    e.preventDefault();
    const trimmedTag = tag.trim();
    if (trimmedTag === "") {
      toast.error("Please enter a tag");
      return;
    }
    if (trimmedTag.includes(" ")) {
      toast.error("Tag cannot contain spaces");
      return;
    }
    if (trimmedTag.length > 20) {
      toast.error("Tag cannot be longer than 20 characters");
      return;
    }
    if (trimmedTag.startsWith("#")) {
      toast.error("Tag cannot start with #");
      return;
    }

    // special character not
    if (!/^[a-zA-Z0-9]+$/.test(trimmedTag)) {
      toast.error("Tag can only contain alphanumeric characters");
      return;
    }

    if (tags.includes(trimmedTag)) {
      toast.error("Tag already exists");
      return;
    }

    if (tags.length >= 10) {
      toast.error("You can add only 10 tags");
      return;
    }

    if (tag.length < 3) {
      toast.error("Tag must be at least 3 characters long");
      return;
    }

    setTags((prev) => [...prev, trimmedTag]);
    setTag("");
  };

  useEffect(() => {
    console.log(postFiles);
    return () => {
      // Clean up created object URLs to avoid memory leaks
      postFiles.forEach((file) => URL.revokeObjectURL(file.blob));
    };
  }, [postFiles]);

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <div className={`flex ${editType ? " md:justify-center" : "md:justify-between "} md:max-h-screen md:overflow-y-scroll  md:flex-row flex-col `}>
      {/* Left Side File Uploads */}
      {!(postId && editType) && <div className="flex md:flex-[1] flex-col p-4 pt-4">
        <h1 className="text-3xl font-bold dark:text-main_light_purple">
          Create {postType === "post" ? "Post" : "Reel"}
        </h1>
        <p className="text-md text-gray-400">
          Create a post and share your thoughts with the world
        </p>
        <label
          htmlFor="file"
          className="border-2 mt-4 border-dashed border-main_dark_violet_color text-4xl w-full md:w-fit md:h-2/4 p-4 text-white flex items-center justify-center gap-2 cursor-pointer"
        >
          <img
            src={AddFileImage}
            className="h-full object-contain w-full"
            alt="Add File"
          />
        </label>
        <div className="mt-4 text-lg text-gray-500">Selected Files</div>
        <div className="flex gap-2 flex-wrap">
          {postFiles.length > 0 &&
            postFiles.map((item, index) => (
              <div key={index} className="relative">
                {item.type.startsWith("image/") ? (
                  <img
                    className="size-[200px]  object-cover rounded-xl"
                    src={item.blob}
                    alt="Selected"
                  />
                ) : (
                  <video
                    controls
                    className=" h-[200px] rounded-xl w-full"
                    src={item.blob}
                  />
                )}

                <div
                  onClick={() => handleSetPostFiles(index)}
                  className="absolute top-1 bg-red-500 p-1 rounded-full right-1 text-lg cursor-pointer text-white"
                >
                  <CiTrash />
                </div>
              </div>
            ))}
        </div>
        <input
          className="w-full hidden p-2 border-[1px] border-gray-300 rounded-md mt-4"
          onChange={fileHandler}
          type="file"
          id="file"
          // Accept only 1:1 or 16:9

          accept={postType === "reel" ? "video/*" : "image/*,video/*"}
          multiple
        />
      </div>}

      {/* Right Side */}
      <form
        className={`flex md:sticky top-0 flex-col w-full ${editType ? "md:w-[50%]" : "md:flex-[1]"}  p-4 `}
      >
        <h1 className="text-3xl font-bold dark:text-main_light_purple">
          Post Details
        </h1>
        <label htmlFor="title" className="dark:text-white mt-4">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          id="title"
          className={` ${editType ? "md:w-3/4" : "md:w-2/3"} w-full p-2 border-[1px] border-gray-300 outline-main_dark_violet_color dark:bg-dark_secondary_bg dark:text-white rounded-md mt-2`}
        />

        {/* Content */}
        <label htmlFor="description" className="dark:text-white mt-4">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          placeholder="What's on your mind?"
          onFocus={() => setShowPicker(false)}
          className={`${editType ? "md:w-3/4" : "md:w-2/3"} w-full h-[160px] md:h-[150px] p-2 border-[1px] mt-2 border-gray-300 outline-main_dark_violet_color dark:bg-dark_secondary_bg dark:text-white rounded-md resize-none`}
        />

        {showPicker && (
          <div className="absolute bottom-20 right-10 z-[999] w-fit">
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="dark"
              autoFocusSearch={false}
            />
            <RxCross1
              className="absolute top-1 text-xl cursor-pointer -right-8"
              onClick={() => setShowPicker(false)}
            />
          </div>
        )}
        <MdEmojiEmotions
          className="hidden md:block dark:text-yellow-500 mt-4 text-2xl cursor-pointer"
          onClick={handleShowPicker}
        />

        {/* Tags */}
        <label htmlFor="tags" className="dark:text-white mt-4">
          Tags
        </label>
        <div className="flex items-center gap-2 mt-2">
          <input
            placeholder="Add a tag"
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            id="tags"
            className="md:w-2/4 w-3/4 p-2 border-[1px] border-gray-300 outline-main_dark_violet_color dark:bg-dark_secondary_bg dark:text-white rounded-md"
          />
          <button
            onClick={handleAddTag}
            className="bg-main_dark_violet_color hover:bg-main_light_purple transition rounded-lg px-8 text-text_color py-2"
          >
            Add
          </button>
        </div>

        {tags.length > 0 ? (
          <div className="flex gap-2 flex-wrap w-2/3 mt-4">
            {tags.map((item, index) => (
              <div
                key={index}
                className="bg-gray-600 text-sm flex items-center gap-2 text-white px-4 py-2 hover:bg-slate-500 cursor-pointer transition rounded-full"
              >
                <HiXMark
                  onClick={() => handleSetTags(index)}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 mt-2">No Tags</div>
        )}

        <label htmlFor="publish" className="dark:text-white mt-4">
          Publish
        </label>
        <select
          value={publish}
          onChange={(e) => setPublish(e.target.value)}
          className="w-1/4 p-2 dark:bg-dark_secondary_bg dark:text-white rounded-lg mt-2"
          id="publish"
        >
          <option value="now">Now</option>
          <option value="later">Later</option>
        </select>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-main_dark_violet_color md:w-1/3 w-[50%] text-center hover:bg-main_light_purple transition rounded-lg px-8 text-text_color py-4 text-lg"
          >
            {postId ? "Update" : "Upload"}
          </button>
          <button
            onClick={handleCancle}
            className="bg-red-500 md:w-1/3 w-[50%] text-center text-lg hover:bg-red-400 transition rounded-lg px-8 text-text_color py-4"
          >
            Cancel
          </button>
        </div>
      </form>
      {loading && <LoadingModal isOpen={loading} message={"Creating Post"} />}
    </div>
  );
}

export default CreatePost;
