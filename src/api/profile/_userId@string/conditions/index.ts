export type Methods = {
  patch: {
    reqBody: {
      conditionIds: string[];
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
