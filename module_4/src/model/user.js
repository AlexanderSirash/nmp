export const userModel = {
  login: data => data.login,
  password: data => data.password,
  age: data => data.age,
  isDeleted: data => data.isDeleted || false,
};
