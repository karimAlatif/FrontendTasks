export interface UserData {
  customerName: string;
  phone: string;
}

export interface User extends UserData {
  customerId: string;
}
