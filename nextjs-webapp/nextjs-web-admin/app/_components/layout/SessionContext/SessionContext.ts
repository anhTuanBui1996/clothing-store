import React from "react";

export type UserInfo =
  | {
      email: string;
      firstName: string;
      lastName: string;
      isMale: boolean;
      dob: Date;
      citizenId: string;
      roles: string[];
    }
  | undefined;

export type SessionContextType = {
  userInfo?: UserInfo;
  setUserInfo?: (v: UserInfo) => void;
  jsessionId?: string;
  setJsessionId?: (v: string) => void;
  jwtToken?: string;
  setJwtToken?: (v: string) => void;
};

export const SessionContext = React.createContext<SessionContextType>({
  userInfo: undefined,
  jsessionId: undefined,
  jwtToken: undefined,
});

const SessionProvider = () => {
  const [userInfo, setUserInfo] = React.useState<UserInfo>(undefined);
  const [jsessionId, setJsessionId] = React.useState<string | undefined>(
    undefined
  );
  const [jwtToken, setJwtToken] = React.useState<string | undefined>(undefined);
  return SessionContext.Provider({
    value: {
      userInfo,
      setUserInfo,
      jsessionId,
      setJsessionId,
      jwtToken,
      setJwtToken,
    },
  });
};

export default SessionProvider;
