import React from "react";

export type UserInfo = {
  email: string;
  firstName: string;
  lastName: string;
  isMale: boolean;
  dob: Date;
  citizenId: string;
  roles: string[];
};

export type SessionContextType = {
  userInfo?: UserInfo;
  jsessionId?: string;
};

export const SessionContext = React.createContext<SessionContextType>({
  userInfo: undefined,
  jsessionId: undefined,
});
