import { useSelector } from 'react-redux';
import { useGetTasksQuery } from '../features/tasks/tasksApi';
import Task from './Task';

export default function TaskList() {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  const { filter, searchTerm } = useSelector((state) => state.filter);

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && tasks?.length === 0)
    content = <div>No Tasks Found!</div>;

  if (!isLoading && !isError && tasks?.length > 0) {
    content = tasks
      .filter((task) =>
        task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((task) => filter.includes(task.project.projectName))
      .map((task) => <Task key={task.id} task={task} />);
  }

  return <div className="lws-task-list">{content}</div>;
}
