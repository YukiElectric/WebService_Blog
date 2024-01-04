import Http from "./http";

export const sign = (data, config) => Http.post("/login", data, config);

export const register = (data, config) => Http.post("/register", data, config);

export const getBlog = (config) => Http.get("/blog", config);

export const getBlogDetail = (id, config) => Http.get(`/blog/${id}`, config);

export const getBlogUser = (id, config) => Http.get(`/blog/user/${id}`, config);

export const createBlog = (data, config) => Http.post("/blog", data, config);

export const search = (config) => Http.get("/search", config);

export const updateBlog = (id, data, config) => Http.put(`/blog/${id}`, data, config);

export const deleteBlog = (id, config) => Http.delete(`/blog/${id}`, config);

export const getComment = (id, config) => Http.get(`/blog/${id}/comment`, config);

export const createComment = (id, data, config) => Http.post(`/blog/${id}/comment`, data, config);

export const updateComment = (id, data, config) => Http.put(`/comment/${id}`, data, config);

export const deleteComment = (id, config) => Http.delete(`/comment/${id}`, config);