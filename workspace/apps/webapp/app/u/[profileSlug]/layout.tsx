import Navbar from 'apps/webapp/components/Navbar';
import { ReactNode } from 'react';
import { Window, Paper, Avatar } from '@marvel/web-ui';

const layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: Object;
}) => {
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
            {/* <Avatar src="shite" /> */}
            <h1>Abhishek Y</h1>
          </Paper>
          {/* right box  */}
          <Paper>{children}</Paper>
        </Paper>
      </Window>
    </>
  );
};

export default layout;
