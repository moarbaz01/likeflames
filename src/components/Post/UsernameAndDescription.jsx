const UsernameAndDescription = ({ user, description }) => (
  <div className="px-2 py-2 mt-4 gap-2 flex-col flex">
    <p className="text-gray-500 dark:text-gray-400">@{user?.username}</p>{" "}
    <p className="text-sm whitespace-pre-wrap md:w-2/3 dark:text-white text-gray-700">
      {description}
    </p>
  </div>
);

export default UsernameAndDescription;
