const generateUserPayload = (user) => {
  return { name: user.name, role: user.role, id: user._id };
};

module.exports = { generateUserPayload };
