import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <div>
      <p>Profile Page</p>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
