import { Button, Paper, TextField } from '@marvel/web-ui';
import { Avatar } from 'apps/webapp/components/Avatar';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/navigation';

const ManagePeople = ({ course }) => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const {
    data: peopleFromSearch,
    isLoading: isPeopleLoading,
    refetch: fetchPeople,
  } = useQuery(
    ['people', search],
    async () =>
      (await axios.get('/api/people/search?q=' + search + '&limit=5')).data
        ?.data,
    {
      enabled: false,
    }
  );
  const peopleList = peopleFromSearch?.filter(
    (p) => !course?.Coordinators?.map((p) => p?.personId)?.includes(p?.id)
  );
  const { data, isLoading, mutate } = useMutation(
    async (args: {
      action: 'add-person' | 'remove-person';
      personId: string;
    }) =>
      await axios.post(`/api/course/manage-people?courseId=${course?.id}`, {
        ...args,
      }),
    {
      onSuccess: () => router.refresh(),
      onError: (data: AxiosError) => alert(data?.response?.data?.['message']),
    }
  );
  return (
    <Paper
      border
      className={`rounded-lg p-5 flex gap-5 flex-wrap ${
        isLoading && 'opacity-50 pointer-events-none'
      }`}
    >
      <h6 className="text-2xl w-full">People</h6>
      {/* searching to add authors */}
      <div className="overflow-x-auto w-full">
        <table className="w-full whitespace-nowrap">
          <tbody>
            {course?.Coordinators?.map((p, i) => (
              <tr key={i} className="border-y p-5 border-p-5 dark:border-p-3">
                <td className="flex gap-3 items-center py-3 px-5 text-base">
                  <Avatar
                    className="w-6"
                    alt={p?.person?.name}
                    src={p?.person?.profilePic}
                  />
                  {p?.person?.name}
                </td>
                <td className="px-5 py-3 text-xs">{p?.role}</td>
                <td>
                  <Button
                    onClick={() =>
                      mutate({
                        action: 'remove-person',
                        personId: p?.personId,
                      })
                    }
                    disabled={course?.Coordinators?.length <= 1}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex w-full gap-5">
        <TextField
          className="flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search to add Authors or Coordinators..."
        />
        <Button
          onClick={() => fetchPeople()}
          disabled={search === '' || isPeopleLoading}
        >
          Search
        </Button>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left whitespace-nowrap">
          {peopleList?.length === 0 ? (
            <div className="flex justify-center items-center py-4">
              <p className="text-p-5 text-base">We found nothing.</p>
            </div>
          ) : (
            <tbody>
              {peopleList?.map((p, i) => (
                <tr key={i} className="border-y p-5 border-p-5 dark:border-p-3">
                  <td className="flex gap-3 items-center py-3 text-base">
                    <Avatar className="w-6" alt={p?.name} src={p?.profilePic} />
                    {p?.name}
                  </td>
                  <td className="px-5 py-3 text-xs">
                    {['CRDN', 'ADMIN'].some((s) =>
                      p?.scope?.map((s) => s?.scope)?.includes(s)
                    ) && (
                      <Button
                        onClick={() =>
                          mutate({
                            action: 'add-person',
                            personId: p?.id,
                          })
                        }
                      >
                        Add as Coordinator
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </Paper>
  );
};

export default ManagePeople;
