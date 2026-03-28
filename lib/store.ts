import { create } from "zustand"
import { type ProjectIdea, type FilterState } from "@/types"

interface IdeasStore {
  ideas: ProjectIdea[]
  isLoading: boolean
  error: string | null
  topic: string
  savedIdeas: ProjectIdea[]
  filters: FilterState

  setIdeas: (ideas: ProjectIdea[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setTopic: (topic: string) => void
  saveIdea: (idea: ProjectIdea) => void
  unsaveIdea: (id: string) => void
  isSaved: (id: string) => boolean
  setFilters: (filters: Partial<FilterState>) => void
  clearIdeas: () => void

  filteredIdeas: () => ProjectIdea[]
}

export const useIdeasStore = create<IdeasStore>((set, get) => ({
  ideas: [],
  isLoading: false,
  error: null,
  topic: "",
  savedIdeas: [],
  filters: {
    difficulty: "All",
    category: "All",
    apiNeeded: "All",
    minStars: 0,
  },

  setIdeas: (ideas) => set({ ideas }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setTopic: (topic) => set({ topic }),
  clearIdeas: () => set({ ideas: [], error: null }),

  saveIdea: (idea) =>
    set((state) => ({
      savedIdeas: state.savedIdeas.some((s) => s.id === idea.id)
        ? state.savedIdeas
        : [...state.savedIdeas, idea],
    })),

  unsaveIdea: (id) =>
    set((state) => ({
      savedIdeas: state.savedIdeas.filter((s) => s.id !== id),
    })),

  isSaved: (id) => get().savedIdeas.some((s) => s.id === id),

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  filteredIdeas: () => {
    const { ideas, filters } = get()
    return ideas.filter((idea) => {
      if (filters.difficulty !== "All" && idea.difficulty !== filters.difficulty)
        return false
      if (filters.category !== "All" && idea.category !== filters.category)
        return false
      if (filters.apiNeeded !== "All" && idea.apiNeeded !== filters.apiNeeded)
        return false
      if (idea.starPotential < filters.minStars) return false
      return true
    })
  },
}))
