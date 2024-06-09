// AUTH  & USER APIS
const LOGIN = "/login";
const SIGNUP = "/signup";
const RESET_PASSWORD = "/reset-password";
const GENERATE_RESET_TOKEN = "/generate-reset-token";
const CHANGE_PASSWORD = "/change-password";
const LOGOUT = "/logout";
const SENDOTP = "/otp";
const ACCEPT_AND_REJECT_REQUEST = "/request";
const FOLLOE_AND_UNFOLLOW = "/follow-unfollow";
const FETCH_USER = "/user";
const FETCH_ALL_USERS = "/users";
const UPDATE_INFORMATION = '/info'

// POST APIS
const CRUD_POST = "/post";
const FETCH_ALL_POST = "/post/posts";
const LIKE_AND_DISLIKE = "/post/likedislike";

// NOTIFICATIONS APIS
const CREATE_NOTIFICATION = "/notification";
const DELETE_NOTIFICATION = "/notification";

// COMMENT APIS
const CRUD_COMMENT = "/comment";
const LIKE_ON_COMMENT = "/comment/like";
const FETCH_COMMMENT = "/comment";

// Exports
export  {
  LOGIN,
  SIGNUP,
  RESET_PASSWORD,
  GENERATE_RESET_TOKEN,
  CHANGE_PASSWORD,
  LOGOUT,
  SENDOTP,
  ACCEPT_AND_REJECT_REQUEST,
  FOLLOE_AND_UNFOLLOW,
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
  UPDATE_INFORMATION
};
