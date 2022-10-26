import {
  Paper,
  Box,
  Avatar,
  Span,
  IconButton,
  Divider,
  Button,
  useMediaQuery,
  Paragraph,
  Heading,
} from '@marvel/web-ui';
import { people } from '@marvel/web-utils';
import {
  GitHubLogoIcon,
  GlobeIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import Navbar from 'apps/webapp/components/Navbar';
import connectToDB from 'apps/webapp/utils/dbConnector';
import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { useSession } from 'next-auth/react';

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  await connectToDB();
  const person = await people
    //@ts-ignore
    .findOne({ slug: context?.params?.profileSlug })
    .select('-_id -email -id -createdAt -updatedAt')
    .lean()
    .exec();
  console.log('getStaticProps is called in profile page');
  return {
    props: {
      person: JSON.parse(JSON.stringify(person)),
    },
  };
};

const ProfilePage: NextPage = ({
  person,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const session = useSession();
  const authUser = session?.data?.user;
  return (
    <Paper variant={'window'}>
      <Navbar />
      {/* box  */}
      <Box
        css={{
          backgroundColor: '$p0',
          border: '1px solid',
          borderColor: '$p3',
          width: '100%',
          maxWidth: '$lg',
          maxHeight: 'min-content',
          m: '90px $4',
          display: 'flex',
          fd: 'column',
          boxShadow: '0px 20px 50px 25px hsla(0, 0%, 40%, 0.2)',
          '@bp2': { fd: 'row' },
        }}
      >
        {/* profile info box at left  */}
        <Box css={{ minWidth: '300px', height: 'min-content' }}>
          {/* name and image  */}
          <Box css={{ display: 'flex', ai: 'center', p: '$4' }}>
            <Avatar
              src={person?.profilePic}
              alt={person?.name}
              css={{ width: '$7', '&:before': { width: '$7' } }}
            />
            <Box css={{ display: 'flex', fd: 'column', ml: '$4' }}>
              <Span
                css={{
                  display: 'block',
                  maxWidth: '220px',
                  fontSize: '$4',
                }}
              >
                {person?.name}
              </Span>
              {person?.scope?.length !== 0 && (
                <Span css={{ fontSize: '$2', color: '$p6', mt: '$1' }}>
                  Coordinator
                </Span>
              )}
            </Box>
          </Box>
          {!!person?.bio && (
            <>
              <Divider />
              <Paragraph css={{ textAlign: 'center', color: '$p9', m: '$4' }}>
                {person?.bio}
              </Paragraph>
            </>
          )}

          {person?.crdnCourses?.length !== 0 && (
            <>
              <Divider />
              <Box
                css={{
                  width: '100%',
                  display: 'flex',
                  p: '$2 $2 $4 $4',
                  overflowX: 'auto',
                }}
              >
                {person?.crdnCourses?.map((c) => (
                  <Button
                    variant={'outlined'}
                    css={{ mr: '$2', mt: '$2', fontSize: '$1' }}
                  >
                    {c}
                  </Button>
                ))}
              </Box>
            </>
          )}
          {person?.doIKnow === 'KNOWN' && (
            <>
              <Divider />
              <Box
                css={{
                  display: 'flex',
                  jc: 'center',
                  p: '$2',
                }}
              >
                <IconButton
                  variant="text"
                  css={{ mr: '$2' }}
                  disabled={person?.gitHub != ''}
                >
                  <GitHubLogoIcon />
                </IconButton>
                <IconButton
                  variant="text"
                  css={{ mr: '$2' }}
                  disabled={person?.linkedIn != ''}
                >
                  <LinkedInLogoIcon />
                </IconButton>
                <IconButton variant="text" disabled={person?.website != ''}>
                  <GlobeIcon />
                </IconButton>
              </Box>
            </>
          )}

          {person?.slug === authUser?.slug && (
            <>
              <Divider />
              <Box css={{ width: '100%', display: 'flex', p: '$4', jc: 'end' }}>
                {person?.doIKnow === 'UNKNOWN' && (
                  <Button
                    css={{ fontSize: '$2', fontWeight: '600' }}
                    variant="outlined"
                  >
                    Apply for Access
                  </Button>
                )}

                {person?.doIKnow === 'KNOWN' && (
                  <Button css={{ fontSize: '$2', fontWeight: '600' }}>
                    Edit Profile
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>
        {/* end of left  */}
        <Divider orientation="vertical" />
        {/* right container  */}
        <Box
          css={{
            p: '$4',
            width: '100%',
            height: '100%',
            '@bp2': { maxHeight: '600px' },
          }}
        >
          <Heading
            css={{
              fontSize: '$1',
              lineHeight: '0',
              color: '$p9',
            }}
          >
            WORKS
          </Heading>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfilePage;
