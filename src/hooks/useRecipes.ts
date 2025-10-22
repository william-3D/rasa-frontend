import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UseRecipesParams {
  search?: string;
  userId?: string;
  page?: number;
  limit?: number;
  regions?: string[];
  conditions?: string[];
  allergies?: string[];
  useUserFilters?: boolean;
}

export function useRecipes({ search, userId, page = 1, limit = 12, regions, conditions, allergies, useUserFilters }: UseRecipesParams) {
  return useQuery({
    queryKey: ['recipes', search, userId, page, limit, regions, conditions, allergies, useUserFilters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (userId) params.append('userId', userId);
      if (useUserFilters) params.append('useUserFilters', 'true');
      regions?.forEach(r => params.append('region', r));
      conditions?.forEach(c => params.append('condition', c));
      allergies?.forEach(a => params.append('allergy', a));
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const { data } = await axios.get(`http://localhost:4000/recipes?${params}`);
      return data;
    },
  });
}
