// AUTH  & USER APIS
const LOGIN = "/login";
const SIGNUP = "/signup";
const RESET_PASSWORD = "/reset-password";
const GENERATE_RESET_TOKEN = "/generate-reset-token";
const CHANGE_PASSWORD = "/change-password";
const LOGOUT = "/logout";
const SENDOTP = "/otp";
const ACCEPT_AND_REJECT_REQUEST = "/request";
const FOLLOW_AND_UNFOLLOW = "/follow-unfollow";
const FETCH_USER = "/user";
const FETCH_ALL_USERS = "/users";
const UPDATE_INFORMATION = "/info";

// POST APIS
const CRUD_POST = "/posts/post";
const FETCH_ALL_POST = "/posts";
const LIKE_AND_DISLIKE = "/posts/post/likedislike";

// NOTIFICATIONS APIS
const CREATE_NOTIFICATION = "/notifications";
const DELETE_NOTIFICATION = "/notifications";

// COMMENT APIS
const CRUD_COMMENT = "/comment";
const LIKE_ON_COMMENT = "/comment/like";
const FETCH_COMMMENT = "/comment";
const REPLY_ON_COMMENT = "/comment/reply";
const GET_POST_COMMENT = "/comment/post";

// Chats APIS
const FETCH_CHATS = "/chat";
const SEND_CHATS = "/chat/send";
const USER_CHATS = "/chat/user";
const DELETE_CHAT_BY_ONE_SIDE = "/chat/single";
const DELETE_CHAT_BY_ALL = "/chat/all";
const DELETE_FULL_CHAT = "/chat/fullChat";
const READ_CHAT = "/chat/readChat";

// Check Server
const CHECK_SERVER = "/check";

// Exports
export {
  LOGIN,
  SIGNUP,
  RESET_PASSWORD,
  GENERATE_RESET_TOKEN,
  CHANGE_PASSWORD,
  LOGOUT,
  SENDOTP,
  ACCEPT_AND_REJECT_REQUEST,
  FOLLOW_AND_UNFOLLOW,
  FETCH_USER,
  FETCH_ALL_USERS,
  CRUD_POST,
  FETCH_ALL_POST,
  LIKE_AND_DISLIKE,
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  CRUD_COMMENT,
  LIKE_ON_COMMENT,
  FETCH_COMMMENT,
  UPDATE_INFORMATION,
  REPLY_ON_COMMENT,
  FETCH_CHATS,
  SEND_CHATS,
  USER_CHATS,
  DELETE_CHAT_BY_ONE_SIDE,
  DELETE_CHAT_BY_ALL,
  DELETE_FULL_CHAT,
  READ_CHAT,
  GET_POST_COMMENT,
  CHECK_SERVER,
};
