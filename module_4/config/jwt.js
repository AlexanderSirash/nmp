export const JWT = {
  secret: process.env.JWT_SECRET,
  secInMin: 60,
  expiresAccess: 5,
  expiresRefresh: 30,
};
