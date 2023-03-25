import ProjectsList from './ProjectsList';
import MembersList from './MembersList';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ProjectsList />
      <MembersList />
    </div>
  );
}
