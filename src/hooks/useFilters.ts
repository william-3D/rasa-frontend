import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFilters() {
  return useQuery({
    queryKey: ['filters'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:4000/recipes/filters');
      return data;
    },
  });
}
