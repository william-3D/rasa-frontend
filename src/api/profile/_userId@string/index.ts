export type Methods = {
  get: {
    resBody: {
      id: string;
      fullName: string;
      username: string;
      profilePicture?: string;
      conditions: Array<{ id: string; name: string }>;
      allergies: Array<{ id: string; name: string }>;
    };
  };
  patch: {
    reqBody: {
      fullName?: string;
      username?: string;
      profilePicture?: string;
    };
    resBody: {
      id: string;
      fullName: string;
      username: string;
      profilePicture?: string;
      conditions: Array<{ id: string; name: string }>;
      allergies: Array<{ id: string; name: string }>;
    };
  };
};