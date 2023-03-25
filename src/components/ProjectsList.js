import { useDispatch } from "react-redux";
import { filterInitialized } from "../features/filter/filterSlice";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import Project from "./Project";

export default function ProjectsList() {
    const { data: projects, isLoading, isError, error } = useGetProjectsQuery();

    const dispatch = useDispatch();

    let content;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>{error}</div>;
    if (!isLoading && !isError && projects?.length === 0)
        content = <div>No Projects Found!</div>;

    if (!isLoading && !isError && projects?.length > 0) {
        dispatch(filterInitialized(projects));
        content = projects.map((project) => (
            <Project key={project.id} project={project} />
        ));
    }

    return (
        <div>
            <h3 className="text-xl font-bold">Projects</h3>
            <div className="mt-3 space-y-4">{content}</div>
        </div>
    );
}
