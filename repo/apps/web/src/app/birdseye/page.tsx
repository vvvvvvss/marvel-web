import { Window } from "ui/server";
import Dashboard from "./Dashboard";

export default function page() {
  return (
    <Window>
      <div className="w-full max-w-5xl p-5 pb-48">
        <h1 className="text-3xl py-10">Coordinator Dashboard</h1>
        <Dashboard />
      </div>
    </Window>
  );
}
