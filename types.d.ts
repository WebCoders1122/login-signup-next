type UserType = {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  verifyToken?: string;
  verifyTokenExpiry?: string | number;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: string | number;
};

type TokenDataType = {
  id: string;
  email: string;
  username: string;
};
