
export interface UserDTO {
    firstName: string;
    lastName: string;
    middleName?: string;
    gender: string;
    dateOfBirth: string;
    EmailId: string;
    dateOfJoining: string;
    phoneNumber: string;
    alternatePhone?: string;
    country: string;
    state: string;
    city: string;
    address: string;
    zipcode: string;
    secondaryAddress: string;
    inactive: boolean;
    address1: string;   // Add this line
    city1: string;      // Add this line
    state1: string;     // Add this line
    country1: string;   // Add this line
    zipcode1: string;
  }
  