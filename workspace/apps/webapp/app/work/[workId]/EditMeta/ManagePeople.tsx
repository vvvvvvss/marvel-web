import { Button, Paper, TextField } from '@marvel/web-ui';
import { Avatar } from 'apps/webapp/components/Avatar';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { HiUserAdd as PlusIcon } from 'react-icons/hi';

const ManagePeople = ({ work }) => {
  const [search, setSearch] = useState('');

  const {
    data: peopleList,
    isLoading: isPeopleLoading,
    refetch: fetchPeople,
  } = useQuery(
    ['people', search],
    async () =>
      (await axios.get('/api/people/search?q=' + search + '&limit=5')).data
        ?.people,
    {
      enabled: false,
    }
  );
  return (
    <Paper border className="rounded-lg p-5 flex gap-5 flex-wrap ">
      <h6 className="text-2xl w-full">People</h6>
      {/* searching to add authors */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <tbody>
            {work?.People?.sort((p) => (p?.role === 'AUTHOR' ? -1 : 1))?.map(
              (p, i) => (
                <tr key={i} className="border-y p-5 border-p-5 dark:border-p-3">
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
                  <td>
                    <Button
                      disabled={
                        (p?.role === 'AUTHOR' &&
                          work?.People?.filter(
                            (p) => p?.role == 'AUTHOR' && p?.status == 'ACTIVE'
                          ).length == 1) ||
                        (p?.role === 'COORDINATOR' &&
                          work?.People?.filter(
                            (p) =>
                              p?.role == 'COORDINATOR' && p?.status == 'ACTIVE'
                          ).length == 1)
                      }
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              )
            )}
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
        <table className="w-full text-sm text-left whitespace-nowrap">
          <tbody>
            {peopleList?.map((p, i) => (
              <tr key={i} className="border-y p-5 border-p-5 dark:border-p-3">
                <td className="flex gap-3 items-center py-3 text-base">
                  <Avatar className="w-6" alt={p?.name} src={p?.profilePic} />
                  {p?.name}
                </td>
                <td className="px-5 py-3 text-xs">{p?.role}</td>
                <td>
                  <Button>Add</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Paper>
  );
};

export default ManagePeople;
