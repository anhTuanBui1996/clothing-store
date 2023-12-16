import React from "react";

export type UserInfo =
  | {
      isAdmin: boolean;
      email: string;
      firstName: string;
      lastName: string;
      isMale: boolean;
      authorities: string;
    }
  | undefined;

export type SessionContextType = {
  userInfo?: UserInfo;
  setUserInfo?: (v: UserInfo) => void;
};

export const SessionContext = React.createContext<SessionContextType>({
  userInfo: undefined,
});
