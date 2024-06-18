import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { _id: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  console.log('🚀 ~ jwtPayload:', jwtPayload);
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
