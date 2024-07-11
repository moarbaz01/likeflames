import { useSelector } from "react-redux";
import UserItem from "./UserItem";
import { useEffect, useMemo } from "react";
import BlankProfile from "../assets/blankProfile.png";

function SearchResults({ isOpen, query }) {
  const { users } = useSelector((state) => state.users);
  const results = useMemo(() => {
    if (query.trim() === "") return [];
    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
      );
    });
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="bg-white dark:bg-dark_secondary_bg fixed top-0 left-0 right-0 bottom-0 max-h-screen pt-16 overflow-y-scroll">
      {/* Search Results for {query} */}
      {results.length > 0 ? (
        results.map((user, index) => (
          <UserItem
            key={index}
            profilePicture={user.profilePicture || BlankProfile}
            name={user.name}
            username={user.username}
            userId={user._id}
            type={"profile"}
          />
        ))
      ) : (
        <p className=" text-center mt-20 dark:text-gray-500">
          No results found
        </p>
      )}
    </div>
  );
}

export default SearchResults;
