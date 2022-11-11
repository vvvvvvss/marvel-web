import Navbar from '../../../components/Navbar';
import { ReactNode } from 'react';
import { Window, Paper, Avatar, IconButton } from '@marvel/web-ui';
import connectToDB from '../../../utils/dbConnector';
import { people } from '@marvel/web-utils';
import { AiFillGithub as GitHubIcon } from 'react-icons/ai';
import { AiFillLinkedin as LinkedInIcon } from 'react-icons/ai';
import { SlGlobe as GlobeIcon } from 'react-icons/sl';

const getUserBySlug = async (slug: String) => {
  await connectToDB();
  const person = await people
    //@ts-ignore
    .findOne({ slug: slug })
    .select('-_id -email -id -createdAt -updatedAt -readMe')
    .lean()
    .exec();
  console.info('getUserBySlug is called in profile page');
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
            {/* picture and name  */}
            <div className="flex items-center border-b border-p-7">
              <Avatar src={data?.profilePic} className="w-14" />
              <h1 className="ml-5 text-lg">{data?.name}</h1>
            </div>
            {/* social icons  */}
            <div className="flex items-center border-b p-5">
              <a href={data?.gitHub} target="_blank" rel="noopener norefferer">
                <IconButton>
                  <GitHubIcon />
                </IconButton>
              </a>
              <a
                href={data?.linkedIn}
                target="_blank"
                rel="noopener norefferer"
              >
                <IconButton>
                  <LinkedInIcon />
                </IconButton>
              </a>
              <a href={data?.website} target="_blank" rel="noopener norefferer">
                <IconButton>
                  <GlobeIcon />
                </IconButton>
              </a>
            </div>
          </Paper>
          {/* right box  */}
          <Paper>{children}</Paper>
        </Paper>
      </Window>
    </>
  );
}
