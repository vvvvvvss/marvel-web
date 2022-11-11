import Navbar from '../../../components/Navbar';
import { ReactNode } from 'react';
import { Window, Paper, Avatar } from '@marvel/web-ui';
import connectToDB from '../../../utils/dbConnector';
import { people } from '@marvel/web-utils';

const getUserBySlug = async (slug: String) => {
  await connectToDB();
  const person = await people
    //@ts-ignore
    .findOne({ slug: slug })
    .select('-_id -email -id -createdAt -updatedAt -readMe')
    .lean()
    .exec();
  console.log('getUserBySlug is called in profile page');
  return person;
};

export default async function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { profileSlug?: String };
}) {
  const data = await getUserBySlug(params?.profileSlug);
  return (
    <>
      <Navbar />
      <Window className="pt-24">
        {/* whole box  */}
        <Paper
          shadow
          border
          className="w-full max-w-5xl mx-5 flex flex-col md:flex-row "
        >
          {/* left box  */}
          <Paper className="p-5 border-b border-p-7">
            <Avatar src={data?.profilePic} />
            <h1>{data?.name}</h1>
          </Paper>
          {/* right box  */}
          <Paper>{children}</Paper>
        </Paper>
      </Window>
    </>
  );
}
