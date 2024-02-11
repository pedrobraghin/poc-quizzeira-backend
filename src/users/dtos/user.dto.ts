export interface UserDTO {
  id: string;
  provider: string;
  providerID: string;
  picture: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}
