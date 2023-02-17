import { Window, Paper } from '@marvel/web-ui';
import { Avatar } from '../../../components/Avatar';
import dbClient from 'apps/webapp/utils/dbConnector';
import EditMeta from './EditMeta/EditMeta';

const getWork = async (id: string) => {
  try {
    const work = await dbClient.work.findUniqueOrThrow({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        coverPhoto: true,
        note: true,
        courseCode: true,
        level: true,
        People: {
          select: {
            personId: true,
            person: {
              select: {
                slug: true,
                name: true,
                profilePic: true,
              },
            },
            createdAt: true,
            role: true,
            status: true,
          },
        },
        totalLevels: true,
        typeOfWork: true,
      },
    });
    console.info({ info: 'got work' });
    return work;
  } catch (error) {
    throw new Error("Couldn't get data.");
  }
};

export async function generateStaticParams() {
  return [];
}
export const dynamicParams = true;

export default async function layout({ children, params }) {
  const work = await getWork(params?.workId);
  return (
    <Window className="pt-5 md:pt-12 pb-40">
      {/* whole thing  */}
      <div className="w-full max-w-5xl flex flex-col items-center px-5">
        {/* hero box  */}
        <Paper
          shadow
          border
          className="w-full flex flex-col md:flex-row mx-5 min-h-[250px] h-fit"
        >
          {/* left box  */}
          <Paper className="relative bg-p-1 w-full md:w-1/2 md:h-full p-5 ">
            <div>
              <p className="text-p-6 tracking-widest">{work?.typeOfWork}WORK</p>
              <h1 className="text-4xl my-2">
                {work?.typeOfWork == 'COURSE' ? (
                  <>
                    {work.People.filter((p) => p?.role === 'AUTHOR')
                      .map((a) => a?.person?.name?.split(' ')[0])
                      .join(' and ')}
                    's{' '}
                    <span className="whitespace-nowrap">
                      {work?.courseCode}
                    </span>{' '}
                    course work.{' '}
                    <span className="text-sm bg-p-2 rounded-lg p-2">
                      {work?.level === work?.totalLevels + 1
                        ? 'Completed'
                        : `Lv ${work?.level}`}
                    </span>
                  </>
                ) : (
                  work?.name
                )}
              </h1>
              <p className="text-p-8">{work?.note}</p>
            </div>
            <div className="overflow-x-auto pt-5 ">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <tbody>
                  {work?.People?.sort((p) =>
                    p?.role === 'AUTHOR' ? -1 : 1
                  )?.map((p, i) => (
                    <tr
                      key={i}
                      className="border-y p-5 border-p-5 dark:border-p-3"
                    >
                      <td className="flex gap-3 items-center py-3 text-base">
                        <Avatar
                          className="w-6"
                          alt={p?.person?.name}
                          src={p?.person?.profilePic}
                        />
                        {p?.person?.name}
                      </td>
                      <td className="px-5 py-3 text-xs">{p?.role}</td>
                      <td className="px-5 py-3 text-xs">{p?.status}</td>
                      <td>{p?.createdAt.toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <EditMeta work={work} />
          </Paper>
          <Paper className="p-5 w-full md:w-1/2 h-1/2 md:h-full flex-1">
            {work?.coverPhoto && (
              <img src={work?.coverPhoto} alt={work?.name} />
            )}
          </Paper>
        </Paper>
        <div className="w-full">{children}</div>
      </div>
    </Window>
  );
}
