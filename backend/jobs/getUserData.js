const User = require("../models/userModel");

const getUserData = async (userId) => {
  try {
    // const newUser=await User.create({
    //   userId:userId,
    //   bonusPoints:0,
    //   prizesWon:0,
    //   counter:0
    // })
    // newUser.save();

    const user = await User.findOne({ userId });

    if (!user) {
      return { error: "User not found" };
    }
    return {
      counter: user.counter,
      bonus: user.bonusPoints,
      prizes: user.prizesWon,
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getUserData;
