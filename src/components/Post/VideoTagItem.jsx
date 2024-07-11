const VideoTagItem = ({ file }) => {
  return (
    <div className="">
      <video
        className="md:max-h-[720px] max-h-[420px] mx-auto max-w-full rounded-xl p-2 cursor-pointer"
        // autoPlay
        controls
        controlsList="nodownload"
      >
        <source src={file} />
      </video>
    </div>
  );
};

export default VideoTagItem;
