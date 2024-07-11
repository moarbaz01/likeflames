const ImageTagItem = ({ file }) => {
  return (
    <div className="flex items-center justify-center">
      <img
        className="rounded-xl md:block mx-auto h-contain md:max-h-[500px] w-contain p-2 cursor-pointer"
        src={file}
        alt=""
      />
    </div>
  );
};

export default ImageTagItem;
