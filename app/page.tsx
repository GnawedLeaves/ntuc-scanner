import ProfileBanner from "./components/profile/profileBanner";
import { useAuth } from "./context/AuthContext";
import SignOutForm from "./login/components/signOutForm";

export default function Home() {
  return (
    <div className={"contentLayout"}>
      <div>Dashboard</div>
      <div>
        <ProfileBanner />
      </div>
      <SignOutForm />
    </div>
  );
}
