import { unstable_getServerSession } from 'next-auth/next';
import { Window } from '@marvel/web-ui';
import Navbar from 'apps/webapp/components/Navbar';

export default async function page({ params, searchParams }) {
  return (
    <Window>
      <div className="w-full max-w-5xl flex justify-center">
        <Navbar />
        <div className="pt-24"></div>
      </div>
    </Window>
  );
}
