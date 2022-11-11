import { Window, Paper, Avatar } from '@marvel/web-ui';

export default function ({ params, searchParams }) {
  console.log('profile page params and search params', params, searchParams);
  return (
    <div className="border-[#f00] ">
      <h1 className="text-2xl">Page component</h1>
    </div>
  );
}
