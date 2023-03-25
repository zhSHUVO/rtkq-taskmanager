import { useGetMembersQuery } from '../features/members/membersApi';
import Member from './Member';

export default function MembersList() {
  const { data: members, isLoading, isError, error } = useGetMembersQuery();

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  if (!isLoading && isError) content = <div>{error}</div>;
  if (!isLoading && !isError && members?.length === 0)
    content = <div>No Member Found!</div>;

  if (!isLoading && !isError && members?.length > 0) {
    content = members.map((member) => (
      <Member key={member.id} member={member} />
    ));
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
