export const HOST = import.meta.env.VITE_SERVER_URL;
export const COOKIE_KEY = "jwt";

export const AUTH_ROUTES = "/api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const USER_INFO_ROUTE = `${AUTH_ROUTES}/userInfo`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/updateProfile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/addProfileImage`;
export const DELETE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/deleteProfileImage`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const CONTACTS_ROUTES = "/api/contacts";
export const SEARCH_ROUTE = `${CONTACTS_ROUTES}/search`;
