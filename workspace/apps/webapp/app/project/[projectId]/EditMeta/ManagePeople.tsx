import { Button, Paper, TextField } from '@marvel/web-ui';
import { Avatar } from 'apps/webapp/components/Avatar';
import axios from 'axios';
import { useReducer, useState } from 'react';
import { useQuery } from 'react-query';
import { HiUserAdd as PlusIcon } from 'react-icons/hi';

const ManagePeople = ({ projectWork }) => {
  const [error, setError] = useState('');
  const [authorSearch, setAuthorSearch] = useState('');
  const handleChange = (
    state,
    action: {
      do:
        | 'change-author-role'
        | 'add-author'
        | 'add-coordinator'
        | 'remove-author'
        | 'remove-coordinator';
      data: {
        person: any;
        role?: string;
      };
    }
  ) => {
    const stateCopy = { ...state };
    switch (action?.do) {
      case 'change-author-role':
        const index = state.authors?.findIndex(
          (a) => a?.googleId === action?.data?.person?.googleId
        );
        stateCopy.authors[index].role = action?.data?.role;
        if (!stateCopy?.authors?.find((a) => a?.role === 'WRITER')) {
          setError('Atleast one of them should have WRITER role.');
        } else {
          setError('');
        }
        return stateCopy;
      case 'add-author':
        stateCopy?.authors?.push({
          googleId: action?.data?.person?.googleId,
          profilePic: action?.data?.person?.profilePic,
          slug: action?.data?.person?.slug,
          name: action?.data?.person?.name,
          role: 'ACTIVE',
        });
        return stateCopy;
      default:
        return stateCopy;
    }
  };

  const [copy, setcopy] = useReducer(handleChange, {
    authors: projectWork?.authors,
    coordinators: projectWork?.coordinators,
  });

  const {
    data: peopleList,
    isLoading: isPeopleLoading,
    refetch: fetchPeople,
  } = useQuery(
    ['people', authorSearch],
    async () =>
      (await axios.get('/api/search/people?q=' + authorSearch)).data?.people,
    {
      enabled: false,
    }
  );

  return (
    <div>
      {/* authors */}
      <Paper border className="rounded-lg p-5 flex gap-5 flex-wrap ">
        <div className="w-full">
          <h6 className="text-2xl w-full">Authors</h6>
          <p className="text-[#ff4f4f]">{error}</p>
        </div>
        {copy?.authors?.map((author, i) => (
          <Button
            variant={'standard'}
            className="pl-[0.5rem] flex items-center gap-3"
          >
            <Avatar
              alt={author?.name}
              src={author?.profilePic}
              className="w-6"
            />
            {author?.name}
            <select
              className="bg-p-0 rounded-lg"
              value={author?.role}
              onChange={(e) =>
                setcopy({
                  do: 'change-author-role',
                  data: { person: author, role: e.target?.value },
                })
              }
            >
              <option value={'WRITER'}>WRITER</option>
              <option value={'ACTIVE'}>ACTIVE</option>
              <option value={'INACTIVE'}>INACTIVE</option>
            </select>
          </Button>
        ))}
        {/* searching to add authors */}
        <div className="flex w-full gap-5">
          <TextField
            className="flex-1"
            value={authorSearch}
            onChange={(e) => setAuthorSearch(e.target.value)}
            placeholder="Search to add Authors..."
          />
          <Button onClick={() => fetchPeople()} disabled={authorSearch === ''}>
            Search
          </Button>
        </div>
        {peopleList?.map(
          (p, k) =>
            !copy?.authors?.find((a) => a?.googleId === p?.googleId) && (
              <Button
                onClick={() =>
                  setcopy({ do: 'add-author', data: { person: p } })
                }
                key={k}
                variant={'standard'}
                className="pl-[0.5rem] flex items-center gap-3"
              >
                <Avatar alt={p?.name} src={p?.profilePic} className="w-6" />
                {p?.name}
                <PlusIcon />
              </Button>
            )
        )}
      </Paper>

      <Paper border className="rounded-lg p-5 flex gap-5 flex-wrap mt-5">
        <h6 className="text-2xl w-full">Coordinators</h6>
        {copy?.coordinators?.map((coordinator, i) => (
          <Button
            variant={'standard'}
            className="pl-[0.5rem] flex items-center gap-3"
          >
            <Avatar
              alt={coordinator?.name}
              src={coordinator?.profilePic}
              className="w-6"
            />
            {coordinator?.name}
          </Button>
        ))}
      </Paper>
    </div>
  );
};

export default ManagePeople;
