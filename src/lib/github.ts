import { projectsData } from '@/data/portfolioData';
import { Project } from '@/types';

// Interface matching the relevant fields from GitHub API
interface GitHubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export async function fetchGitHubProjects(): Promise<Project[]> {
  try {
    // Fetch repositories from GitHub API
    // Using Next.js fetch with next: { revalidate: 3600 } for ISR (Incremental Static Regeneration)
    // This caches the result for 1 hour, avoiding rate limits and keeping page load instant.
    const res = await fetch('https://api.github.com/users/Tisee747/repos?per_page=100', {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Tisee747-Portfolio'
      }
    });

    if (!res.ok) {
      console.error('Failed to fetch GitHub repos:', res.statusText);
      return projectsData; // Fallback to static data if API fails
    }

    const repos: GitHubRepo[] = await res.json();

    // Map GitHub data by name to make lookups fast
    // We normalize names by converting hyphens/underscores to lower case to ensure better matching
    const repoMap = new Map<string, GitHubRepo>();
    repos.forEach(repo => {
      const normalizedName = repo.name.toLowerCase().replace(/[-_]/g, '');
      repoMap.set(normalizedName, repo);
    });

    // We STRICTLY only return projects that are listed in projectsData.
    // This ensures no unfinished or local-only projects randomly appear on the website.
    const mergedProjects = projectsData.map(project => {
      // Create a copy of the static project
      const merged = { ...project };
      
      // Try to find the matching GitHub repo. We check project.id or project.title
      const searchKeys = [
        project.id.toLowerCase().replace(/[-_]/g, ''),
        project.title.toLowerCase().replace(/[-_]/g, ''),
        // If repoUrl is explicitly provided, we can extract the repo name
        project.repoUrl ? project.repoUrl.split('/').pop()?.toLowerCase().replace(/[-_]/g, '') : ''
      ];

      for (const key of searchKeys) {
        if (key && repoMap.has(key)) {
          const githubData = repoMap.get(key)!;
          // Update stats and URL from GitHub
          merged.stars = githubData.stargazers_count;
          merged.forks = githubData.forks_count;
          merged.repoUrl = githubData.html_url;
          break; // Stop searching once matched
        }
      }

      return merged;
    });

    return mergedProjects;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return projectsData; // Fallback to static
  }
}
