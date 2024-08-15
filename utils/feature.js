
// import jwt from "jsonwebtoken";

// export const generateCookie = (email) => {

//     // Generate JWT token
//     const token = jwt.sign({ email  }, process.env.JsonWEBToken, { expiresIn: '24h' });
//     // console.log(token, "token");

//     return token

// }


import jwt from 'jsonwebtoken';

export const generateCookie = (email) => {
  // Ensure the secret key is set
  if (!process.env.JsonWEBToken) {
    throw new Error('JWT secret key is not defined in environment variables');
  }

  // Generate JWT token
  const token = jwt.sign({ email }, process.env.JsonWEBToken, { expiresIn: '24h' });

  // Return the generated token
  return token;
};
