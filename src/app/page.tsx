"use client";
import { useState, useEffect, useRef } from "react";
import { useRecipes } from "@/hooks/useRecipes";
import { useFilters } from "@/hooks/useFilters";
import { useUserProfile } from "@/hooks/useUserProfile";
import Hero from "@/components/Hero";
import RecipeCard from "@/components/RecipeCard";
import FilterToggle from "@/components/FilterToggle";
import { Recipe } from "@/types/recipe";

export default function Home() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const userId = "cmgsqn8cb00083seu9bdpj2du";
  const observerRef = useRef<HTMLDivElement>(null);

  const { data: filters } = useFilters();
  const { data: userProfile } = useUserProfile(userId);

  const [initialized, setInitialized] = useState(false);
  const [userModifiedFilters, setUserModifiedFilters] = useState(false);

  useEffect(() => {
    if (userProfile && !initialized) {
      setSelectedRegions(userProfile.region ? [userProfile.region] : []);
      setSelectedConditions(userProfile.conditions || []);
      setSelectedAllergies(userProfile.allergies || []);
      setInitialized(true);
    }
  }, [userProfile, initialized]);

  const hasManualFilters = userModifiedFilters;
  const useUserFilters = !hasManualFilters;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
      setAllRecipes([]);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
    setAllRecipes([]);
  }, [selectedRegions, selectedConditions, selectedAllergies]);

  const { data, isLoading, isFetching } = useRecipes({ 
    search: debouncedSearch, 
    userId, 
    page,
    regions: hasManualFilters ? selectedRegions : undefined,
    conditions: hasManualFilters ? selectedConditions : undefined,
    allergies: hasManualFilters ? selectedAllergies : undefined,
    useUserFilters
  });

  const getFilterPills = () => {
    if (!userProfile) return null;
    
    const pills = [];
    
    if (hasManualFilters) {
      if (selectedRegions.length) pills.push(...selectedRegions);
      if (selectedConditions.length) pills.push(...selectedConditions);
      if (selectedAllergies.length) pills.push(...selectedAllergies.map((a: string) => `${a}-free`));
    } else {
      if (userProfile.region) pills.push(userProfile.region);
      if (userProfile.conditions?.length) pills.push(...userProfile.conditions);
      if (userProfile.allergies?.length) pills.push(...userProfile.allergies.map((a: string) => `${a}-free`));
    }
    
    if (!pills.length) return null;
    
    return (
      <div className="flex flex-wrap gap-2">
        {pills.map((pill, i) => (
          <span key={i} className="px-4 py-2 bg-primary/20 text-text rounded-full text-sm font-medium">
            {pill}
          </span>
        ))}
      </div>
    );
  };
  
  const getSubtitle = () => {
    const hasPills = getFilterPills() !== null;
    return hasPills ? "Currently showing these recipes:" : "Currently showing all recipes.";
  };
  useEffect(() => {
    if (data?.recipes) {
      setAllRecipes(prev => page === 1 ? data.recipes : [...prev, ...data.recipes]);
    }
  }, [data, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && data?.page < data?.totalPages) {
          setPage(p => p + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [isFetching, data]);

  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Welcome back, Sonia!"
        subtitle={getSubtitle()}
        filterPills={getFilterPills()}
        searchValue={search}
        onSearchChange={setSearch}
        filterButton={
          filters && (
            <FilterToggle
              regions={filters.regions}
              conditions={filters.conditions}
              allergies={filters.allergies}
              selectedRegions={selectedRegions}
              selectedConditions={selectedConditions}
              selectedAllergies={selectedAllergies}
              onFiltersChange={(filters) => {
                setSelectedRegions(filters.regions);
                setSelectedConditions(filters.conditions);
                setSelectedAllergies(filters.allergies);
                setUserModifiedFilters(true);
              }}
            />
          )
        }
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {isLoading && page === 1 ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {allRecipes.map((recipe, index) => (
                <div key={recipe.id} className="animate-fade-in" style={{ animationDelay: `${(index % 12) * 100}ms` }}>
                  <RecipeCard
                    title={recipe.title}
                    description={recipe.description}
                    region={recipe.region}
                    imageUrl={recipe.sourceUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=500&fit=crop"}
                  />
                </div>
              ))}
            </div>
            
            <div ref={observerRef} className="h-20 flex justify-center items-center">
              {isFetching && (
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
