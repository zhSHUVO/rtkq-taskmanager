import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMembersQuery } from "../features/members/membersApi";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import { useAddTaskMutation } from "../features/tasks/tasksApi";

export default function AddTask() {
    const {
        data: members,
        isLoading: memberIsLoading,
        isError: memberIsError,
    } = useGetMembersQuery();

    const {
        data: projects,
        isLoading: projectIsLoading,
        isError: projectIsError,
    } = useGetProjectsQuery();

    const [addTask, { isLoading }] = useAddTaskMutation();
    const navigate = useNavigate();

    const [taskName, setTaskName] = useState("");
    const [teamMember, setTeamMember] = useState({});
    const [project, setProject] = useState({});
    const [deadline, setDeadline] = useState("");

    const status = "pending";

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ taskName, teamMember, project, deadline, status });

        navigate("/");
    };

    return (
        <div className="container relative">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                    Create Task for Your Team
                </h1>

                <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                    <form
                        className="space-y-6"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div className="fieldContainer">
                            <label htmlFor="lws-taskName">Task Name</label>
                            <input
                                type="text"
                                name="taskName"
                                id="lws-taskName"
                                required
                                placeholder="Implement RTK Query"
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </div>

                        <div className="fieldContainer">
                            <label>Assign To</label>
                            <select
                                name="teamMember"
                                id="lws-teamMember"
                                required
                                onChange={(e) =>
                                    setTeamMember(
                                        members.find(
                                            (member) =>
                                                member.name === e.target.value
                                        )
                                    )
                                }
                            >
                                <option value="" hidden defaultValue>
                                    Select Job
                                </option>
                                {!memberIsLoading &&
                                    !memberIsError &&
                                    members.map((member) => (
                                        <option>{member.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="lws-projectName">
                                Project Name
                            </label>
                            <select
                                id="lws-projectName"
                                name="projectName"
                                required
                                onChange={(e) =>
                                    setProject(
                                        projects.find(
                                            (project) =>
                                                project.projectName ===
                                                e.target.value
                                        )
                                    )
                                }
                            >
                                <option value="" hidden defaultValue>
                                    Select Project
                                </option>
                                {!projectIsLoading &&
                                    !projectIsError &&
                                    projects.map((project) => (
                                        <option>{project.projectName}</option>
                                    ))}
                            </select>
                        </div>

                        <div className="fieldContainer">
                            <label htmlFor="lws-deadline">Deadline</label>
                            <input
                                type="date"
                                name="deadline"
                                id="lws-deadline"
                                required
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </div>

                        <div className="text-right">
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="lws-submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
