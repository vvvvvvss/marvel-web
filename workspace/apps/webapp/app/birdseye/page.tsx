'use client';
import { Tab, TabGroup, Window } from '@marvel/web-ui';

export default function page({ pageParams }) {
  return (
    <Window>
      <div className="w-full max-w-5xl p-5">
        <h1 className="text-3xl py-10">Birds Eye</h1>
        <div className="w-full">
          <TabGroup className="max-w-full overflow-auto w-full">
            <Tab>Reports to review</Tab>
            <Tab>Articles to review</Tab>
            <Tab>List of Coordinators</Tab>
          </TabGroup>
        </div>
      </div>
    </Window>
  );
}
