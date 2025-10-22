# Rasa Frontend

A personalized recipe discovery platform built with Next.js that helps users find recipes tailored to their dietary needs and health conditions.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **API**: REST API (NestJS backend)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## UI Design Philosophy

### Design Principles
- **Sleek & Modern**: Clean interfaces with smooth transitions and hover effects
- **Minimalist**: Focus on content with ample white space
- **Visual Hierarchy**: Clear distinction between hero sections and content areas
- **Responsive**: Mobile-first approach with adaptive layouts

### Visual Style
- **Cards**: Vertical rectangles with images (400x500px aspect ratio)
- **Shadows**: Layered shadows that lift on hover for depth
- **Rounded Corners**: Consistent 2xl border radius (rounded-2xl)
- **Gradients**: Subtle gradients in hero sections (primary/20 to surface/50)
- **Typography**: Bold headings (text-6xl for hero), clear hierarchy

### Color System
- Uses CSS variables defined in `globals.css`:
  - `--background`: Main background
  - `--surface`: Card backgrounds
  - `--primary`: Accent color for CTAs and badges
  - `--text`: Main text color with opacity variants (/70, /60, /50)

### Component Patterns
- **Hero Section**: Gradient background, large title, elevated search bar
- **Recipe Cards**: Image-first with overlay badges, hover scale effects
- **Loading States**: Centered spinners with primary color
- **Infinite Scroll**: Intersection Observer for seamless pagination

### Interactions
- **Hover Effects**: Scale (110%), lift (-translate-y-1), shadow increase
- **Transitions**: duration-300 for smooth animations
- **Focus States**: Ring with primary color for accessibility
- **Debounced Search**: 300ms delay for optimal UX

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
│   ├── Hero.tsx
│   └── RecipeCard.tsx
└── hooks/            # Custom React hooks
    ├── useRecipes.ts
    ├── useFilters.ts
    └── useUserProfile.ts
```

## Key Features

- Personalized recipe recommendations based on user health conditions
- Real-time search with debouncing
- Infinite scroll pagination
- Allergy and dietary restriction filtering
- Responsive grid layout (1/2/4 columns)

## Filtering System

### User-Based Filtering (Default)
On initial load, recipes are automatically filtered based on the user's profile:
- **Region**: Shows recipes from user's region
- **Conditions**: Shows recipes suitable for user's health conditions
- **Allergies**: Excludes recipes containing user's allergens

The subtitle dynamically displays: "Currently showing [region][allergies]-free recipes for [conditions] patients."

### Manual Filtering
Users can override automatic filtering by using the filter toggle:
- Click the filter icon next to the search bar
- Select/deselect regions, conditions, or allergies
- Multiple selections allowed per category
- Filter selections are shown as checkboxes in a drawer

**Behavior:**
- Initial filters reflect user profile and are pre-selected in the filter toggle
- User can add or remove filters while keeping the initial selections visible
- Modifying any filter switches from automatic user-based filtering to manual mode
- In manual mode, only the explicitly selected filters are applied
- Clearing all filters shows "Currently showing all recipes"
- Search does not affect filter mode

### Filter Options
Filter options are fetched dynamically from the backend:
- **Regions**: All available cuisine regions in database
- **Conditions**: Health conditions (Diabetes, GERD, Celiac, etc.)
- **Allergies**: Food allergens (Nuts, Dairy, Gluten, etc.)

### API Integration
- `GET /recipes/filters` - Fetches available filter options
- `GET /recipes/user/:userId` - Fetches user profile for initial filters
- `GET /recipes` - Fetches recipes with filters applied
  - `useUserFilters=true` - Uses user profile filters
  - `region`, `condition`, `allergy` - Manual filter parameters
