import { Outlet } from "react-router-dom";
import Nav from "../nav/nav";

export default function Root() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
