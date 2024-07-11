const PostTagsItem = ({ tags }) => (
  <div className="flex gap-2 flex-wrap w-2/3 mt-4">
    {tags?.map((item, index) => (
      <div
        key={index}
        className="dark:bg-gray-600 bg-gray-200 text-sm flex items-center gap-2 dark:text-white px-4 py-2 dark:hover:bg-slate-500 cursor-pointer transition rounded-full"
      >
        <span>{item}</span>
      </div>
    ))}
  </div>
);

export default PostTagsItem;
