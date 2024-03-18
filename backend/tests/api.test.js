const mongoose = require("mongoose");
const User = require("../models/User");
const Blog = require("../models/Blog");

// Mocking the mongoose model functions
jest.mock("../models/User");
jest.mock("../models/Blog");

describe("Models", () => {
  // Define test data
  const userData = {
    _id: "user_id",
    firstName: "igor",
    lastName: "ihimbazwe",
    email: "igorexample@fmail.com",
    password: "password123",
    isAdmin: false,
  };

  const blogData = {
    _id: "blog_id",
    title: "Test Blog",
    author: "igor",
    description: "This is a test blog",
    image: "test_image.jpg",
    user: userData._id,
  };

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    User.mockClear();
    Blog.mockClear();
  });

  test("should create a new user", async () => {
    // Mock the save function to resolve with the userData
    const saveMock = jest.fn().mockResolvedValue(userData);
    User.mockImplementation(() => ({
      save: saveMock,
    }));

    // Create a new user
    const newUser = new User(userData);

    // Save the user
    const savedUser = await newUser.save();

    // Verify that the save function was called
    expect(saveMock).toHaveBeenCalled();

    // Verify that the saved user data matches the input data
    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.isAdmin).toBe(userData.isAdmin);
  });

  test("should create a new blog", async () => {
    // Mock the save function to resolve with the blogData
    const saveMock = jest.fn().mockResolvedValue(blogData);
    Blog.mockImplementation(() => ({
      save: saveMock,
    }));

    // Create a new blog
    const newBlog = new Blog(blogData);

    // Save the blog
    const savedBlog = await newBlog.save();

    // Verify that the save function was called
    expect(saveMock).toHaveBeenCalled();

    // Verify that the saved blog data matches the input data
    expect(savedBlog.title).toBe(blogData.title);
    expect(savedBlog.author).toBe(blogData.author);
    expect(savedBlog.description).toBe(blogData.description);
    expect(savedBlog.image).toBe(blogData.image);
    expect(savedBlog.user).toBe(blogData.user);
  });

  test("should update an existing user", async () => {
    // Mock the findOneAndUpdate function to resolve with the updated user data
    const findOneAndUpdateMock = jest
      .fn()
      .mockResolvedValue({ ...userData, firstName: "mugabo" });
    User.findOneAndUpdate = findOneAndUpdateMock;

    // Update the user
    const updatedUser = await User.findOneAndUpdate(
      { _id: userData._id },
      { $set: { firstName: "mugabo" } },
      { new: true }
    );

    // Verify that findOneAndUpdate function was called with correct parameters
    expect(findOneAndUpdateMock).toHaveBeenCalledWith(
      { _id: userData._id },
      { $set: { firstName: "mugabo" } },
      { new: true }
    );

    // Verify that the updated user data matches the input data
    expect(updatedUser.firstName).toBe("mugabo");
    expect(updatedUser.lastName).toBe(userData.lastName);
    expect(updatedUser.email).toBe(userData.email);
    expect(updatedUser.password).toBe(userData.password);
    expect(updatedUser.isAdmin).toBe(userData.isAdmin);
  });

  test("should delete an existing user", async () => {
    // Mock the findOneAndDelete function to resolve with the deleted user data
    const findOneAndDeleteMock = jest.fn().mockResolvedValue(userData);
    User.findOneAndDelete = findOneAndDeleteMock;

    // Delete the user
    const deletedUser = await User.findOneAndDelete({ _id: userData._id });

    // Verify that findOneAndDelete function was called with correct parameters
    expect(findOneAndDeleteMock).toHaveBeenCalledWith({ _id: userData._id });

    // Verify that the deleted user data matches the input data
    expect(deletedUser.firstName).toBe(userData.firstName);
    expect(deletedUser.lastName).toBe(userData.lastName);
    expect(deletedUser.email).toBe(userData.email);
    expect(deletedUser.password).toBe(userData.password);
    expect(deletedUser.isAdmin).toBe(userData.isAdmin);
  });

  test("should get all users", async () => {
    // Define mock users data
    const usersData = [
      {
        _id: "user_id_1",
        firstName: "igor",
        lastName: "ihimbazwe",
        email: "igor23@yahho.fr",
        password: "password123",
        isAdmin: false,
      },
      {
        _id: "user_id_2",
        firstName: "mugabo",
        lastName: "kalisa",
        email: "kalisa89@gmail.com",
        password: "password456",
        isAdmin: true,
      },
    ];

    // Mock the find function to resolve with the usersData
    const findMock = jest.fn().mockResolvedValue(usersData);
    User.find = findMock;

    // Get all users
    const allUsers = await User.find();

    // Verify that find function was called without any arguments
    expect(findMock).toHaveBeenCalledWith();

    // Verify that the returned users data matches the mocked users data
    expect(allUsers).toEqual(usersData);
  });

  test("should update an existing blog", async () => {
    // Mock the findOneAndUpdate function to resolve with the updated blog data
    const findOneAndUpdateMock = jest
      .fn()
      .mockResolvedValue({ ...blogData, title: "Updated Test Blog" });
    Blog.findOneAndUpdate = findOneAndUpdateMock;

    // Update the blog
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blogData._id },
      { $set: { title: "Updated Test Blog" } },
      { new: true }
    );

    // Verify that findOneAndUpdate function was called with correct parameters
    expect(findOneAndUpdateMock).toHaveBeenCalledWith(
      { _id: blogData._id },
      { $set: { title: "Updated Test Blog" } },
      { new: true }
    );

    // Verify that the updated blog data matches the input data
    expect(updatedBlog.title).toBe("Updated Test Blog");
    expect(updatedBlog.author).toBe(blogData.author);
    expect(updatedBlog.description).toBe(blogData.description);
    expect(updatedBlog.image).toBe(blogData.image);
    expect(updatedBlog.user).toBe(blogData.user);
  });

  test("should delete an existing blog", async () => {
    // Mock the findOneAndDelete function to resolve with the deleted blog data
    const findOneAndDeleteMock = jest.fn().mockResolvedValue(blogData);
    Blog.findOneAndDelete = findOneAndDeleteMock;

    // Delete the blog
    const deletedBlog = await Blog.findOneAndDelete({ _id: blogData._id });

    // Verify that findOneAndDelete function was called with correct parameters
    expect(findOneAndDeleteMock).toHaveBeenCalledWith({ _id: blogData._id });

    // Verify that the deleted blog data matches the input data
    expect(deletedBlog.title).toBe(blogData.title);
    expect(deletedBlog.author).toBe(blogData.author);
    expect(deletedBlog.description).toBe(blogData.description);
    expect(deletedBlog.image).toBe(blogData.image);
    expect(deletedBlog.user).toBe(blogData.user);
  });

  test("should get all blogs", async () => {
    // Define mock blogs data
    const blogsData = [
      {
        _id: "blog_id_1",
        title: "Blog 1",
        author: "igor",
        description: "Blog 1 description",
        image: "image1.jpg",
        user: "user_id_1",
      },
      {
        _id: "blog_id_2",
        title: "Blog 2",
        author: "ihimbazwe",
        description: "Blog 2 description",
        image: "image2.jpg",
        user: "user_id_2",
      },
    ];

    // Mock the find function to resolve with the blogsData
    const findMock = jest.fn().mockResolvedValue(blogsData);
    Blog.find = findMock;

    // Get all blogs
    const allBlogs = await Blog.find();

    // Verify that find function was called without any arguments
    expect(findMock).toHaveBeenCalledWith();

    // Verify that the returned blogs data matches the mocked blogs data
    expect(allBlogs).toEqual(blogsData);
  });
});
