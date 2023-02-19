import Login from "../models/login/login"
import PageConstructor from "./page-constructor";

export default function LoginPage() {
  return (
    <PageConstructor>
      <Login/>
    </PageConstructor>
  )
}