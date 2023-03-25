import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMembersQuery } from "../features/members/membersApi";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import { useEditTaskMutation } from "../features/tasks/tasksApi";

export default function EditForm({ task }) {
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

    const {
        taskName: oldName,
        teamMember: oldTeamMember,
        project: oldProject,
        deadline: oldDeadline,
        id,
    } = task;

    const navigate = useNavigate();
    const [editTask, { isLoading }] = useEditTaskMutation();

    const [taskName, setTaskName] = useState(oldName);
    const [teamMember, setTeamMember] = useState(oldTeamMember);
    const [project, setProject] = useState(oldProject);
    const [deadline, setDeadline] = useState(oldDeadline);

    const handleSubmit = (e) => {
        e.preventDefault();
        editTask({
            id,
            data: { taskName, teamMember, project, deadline },
        });

        navigate("/");
    };

    return (
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div className="fieldContainer">
                <label htmlFor="lws-taskName">Task Name</label>
                <input
                    type="text"
                    name="taskName"
                    id="lws-taskName"
                    required
                    placeholder="Implement RTK Query"
                    value={taskName}
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
                                (member) => member.name === e.target.value
                            )
                        )
                    }
                >
                    {!memberIsLoading &&
                        !memberIsError &&
                        members.map((member) => (
                            <option
                                key={member.id}
                                defaultValue={
                                    member.name === teamMember.name
                                        ? "selected"
                                        : null
                                }
                            >
                                {member.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="fieldContainer">
                <label htmlFor="lws-projectName">Project Name</label>
                <select
                    id="lws-projectName"
                    name="projectName"
                    required
                    onChange={(e) =>
                        setProject(
                            projects.find(
                                (project) =>
                                    project.projectName === e.target.value
                            )
                        )
                    }
                >
                    {!projectIsLoading &&
                        !projectIsError &&
                        projects.map((eachProject) => (
                            <option
                                key={eachProject.id}
                                defaultValue={
                                    eachProject.projectName ===
                                    project.projectName
                                        ? "selected"
                                        : null
                                }
                            >
                                {eachProject.projectName}
                            </option>
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
                    value={deadline}
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
    );
}
