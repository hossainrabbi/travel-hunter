import jwt from 'jsonwebtoken';

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.REACT_APP_JWT_SECRET as string
    );

    if (decoded) {
      return decoded;
    }
  } catch {
    return null;
  }
}
