import { Window } from '@marvel/web-ui';
import Navbar from 'apps/webapp/components/Navbar';
import { unstable_getServerSession } from 'next-auth';
import Manager from './Manager';

export default async function page() {
  const session = await unstable_getServerSession();
  return (
    <Window>
      <div className="w-full max-w-5xl flex justify-center">
        <div className="pt-24">
          <Manager />
        </div>
      </div>
    </Window>
  );
}
