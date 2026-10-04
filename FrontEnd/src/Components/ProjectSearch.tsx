import { useState } from "react";
import SearchSelect from "../Components/SearchAndSelect";

type Project = {
  projectId: number;
  projectName: string;
};

type ProjectSearchProps = {
  onProjectSelect: (project: Project) => void;
};

export default function ProjectSearch({
  onProjectSelect,
}: ProjectSearchProps) {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(value: string) {
    setSearch(value);
    setSelectedProject(null);

    if (!value.trim()) {
      setProjects([]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/Projects/Search-Projects?search=${encodeURIComponent(value)}`
      );

      if (!response.ok) {
        throw new Error("Failed to search projects");
      }

      const data: Project[] = await response.json();

      setProjects(data);
    } catch (error) {
      console.error(error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  function handleProjectSelect(project: Project) {
    setSelectedProject(project);
    setProjects([]);

    onProjectSelect(project);
  }

  return (
    <div className="w-[25vw] p-1">

      <p className="m-2.5 block text-m font-medium text-black">Select User</p>
      <SearchSelect
        placeholder="Search project..."
        results={projects}
        loading={loading}
        getKey={(project) => project.projectId}
        getLabel={(project) => project.projectName}
        onSearch={handleSearch}
        onSelect={handleProjectSelect}
      />
    </div>
  );
}