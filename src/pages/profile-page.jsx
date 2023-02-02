import Profile from "../models/profile/profile";
import PageConstructor from "./page-constructor";

export default function ProfilePage() {
  return (
    <PageConstructor>
      <Profile/>
    </PageConstructor>
  )
}
