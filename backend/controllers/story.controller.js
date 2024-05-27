const Story = require("../models/story.model");

const createStory = async (request, response) => {
  const story = new Story({
    authorId: request.user.id,
    title: request.body.title,
    description: request.body.description,
    content: request.body.content,
    imageUrl: request.body.imageUrl,
    likes: 0,
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    topics: request.body.topics ? request.body.topics : [],
    comments: [],
  });

  const savedStory = await story.save();
  response.status(201).json(savedStory);
};

const getStories = async (request, response) => {
  const stories = await Story.find({}).populate("topics").populate("authorId");
  response.status(200).json(stories);
};

const getStory = async (request, response) => {
  const story = await Story.findById(request.params.id)
    .populate("topics")
    .populate({
      path: "comments",
      populate: {
        path: "authorId",
        model: "User",
      },
    });

  story.views += 1;
  await story.save();

  response.status(200).json(story);
};

const updateStory = async (request, response) => {
  const updatedStory = await Story.findByIdAndUpdate(
    request.params.id,
    { updatedAt: new Date(), ...request.body },
    { new: true }
  );
  response.status(200).json(updatedStory);
};

const addCommentToStory = async (request, response) => {
  let story = await Story.findById(request.params.id);
  story.comments = story.comments.concat(request.body.commentId);
  story = await story.save();
  response.status(201).json(story);
};

const deleteStory = async (request, response) => {
  await Story.findByIdAndDelete(request.params.id);
  response.status(204).end();
};

module.exports = {
  createStory,
  getStories,
  getStory,
  updateStory,
  deleteStory,
  addCommentToStory,
};
