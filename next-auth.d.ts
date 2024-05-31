import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

// export type ExtendedUser = DefaultSession["user"] & {
//   id: string;
//   name: string;
//   email: string;
//   address: string;
//   city: string;
//   state: string;
//   gender: string;
//   role: UserRole;
//   isTwoFactorEnabled: boolean;
//   isOAuth: boolean;
// };

// declare module "next-auth" {
//   interface Session {
//     user: ExtendedUser;
//   }
// }

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  gender: string;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
