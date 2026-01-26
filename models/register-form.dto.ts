export interface RegisterFormDTO {
  firstName?: string; // Optional field
  lastName: string;
  phoneNumber: string;
  country?: string; // Optional field         
  emailAddress: string;
  password: string;
}