import { Window } from 'ui';
import Dashboard from './Dashboard';

export default function page({ pageParams }) {
  return (
    <Window>
      <div className="w-full max-w-5xl p-5">
        <h1 className="text-3xl py-10">Coordinator Dashboard</h1>
        <Dashboard />
      </div>
    </Window>
  );
}
