import { useQuery } from "@tanstack/react-query";

export function getStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch("/stats.json");
      return response.json();
    },
    staleTime: Infinity,
  });
}