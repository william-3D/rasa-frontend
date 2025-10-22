import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:4000/recipes/user/${userId}`);
      return data;
    },
  });
}
