module.exports = async (req, res, next) => {
  try {
    if (req.user.UserType === "normal") {
      return res
        .status(403)
        .send("Normals are not athourised to undertake this action");
    }

    next();
  } catch (error) {
    return res.status(500).send(error);
  }
};
