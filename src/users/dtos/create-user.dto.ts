export interface CreateUserDTO {
  name: string;
  email: string;
  provider?: string;
  providerID?: string;
  picture?: string;
  passwordHash: string;
}
