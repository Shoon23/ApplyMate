import { useAuth } from "@/hooks/useAuth";

const JobPage = () => {
  const { state } = useAuth();

  return (
    <div>
      JobPage
      <div className="">{state.user?.name}</div>
    </div>
  );
};

export default JobPage;
