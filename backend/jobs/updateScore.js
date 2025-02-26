const User = require("../models/userModel");

const updateScore = async (userId) => {
  try {
    const user = await User.findOne({userId});
    if (!user) return { error: "User not found" };

    user.counter += 1;

    let message = "You clicked the button!";
    
    // 50% chance for 10 bonus points
    if (Math.random() < 0.5) {
      user.bonusPoints += 10;
      message = "You earned 10 bonus points!";
    }

    // 25% chance for a prize
    if (Math.random() < 0.25) {
      user.prizesWon += 1;
      message = "Congratulations! You won a prize!";
    }

    await user.save();
    
    return {
      counter: user.counter,
      bonus: user.bonusPoints,
      prizes: user.prizesWon,
      message
    };
  } catch (error) {
    return { error: error.message };
  }
};

const resetScore=async(userId)=>{
  try {

    const user = await User.findOne({userId});
    if (!user) return { error: "User not found" };
    user.counter=0;
    user.bonusPoints=0;
    user.prizesWon=0;

    user.save();
    return {
      success:true,
      message:"successfully reset the scores"
    }

  } catch (error) {
    
  }
}

module.exports = {updateScore,resetScore};
