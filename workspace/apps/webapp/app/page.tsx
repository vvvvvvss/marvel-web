import { Window, Button } from '@marvel/web-ui';

export function Index() {
  return (
    <Window>
      {/* hero box  */}
      <div className="pt-40 md:pt-32 w-full max-w-5xl flex flex-col items-center px-4">
        <h1 className="flex-col flex">
          <div className={'text-base text-p-7 font-semibold ml-[2.5%]'}>
            UVCE's
          </div>
          <div className={'text-[min(28vw,180px)] leading-[0.5]'}>marvel</div>
        </h1>
        <div className="py-5 flex justify-center mt-3 md:mt-4 flex-wrap">
          <Button className="mr-2 mt-3 text-sm">Dashboard</Button>
          <Button className="mr-2 mt-3 text-sm">About</Button>
          <Button className="mr-2 mt-3 text-sm">Tracks</Button>
          <Button className="mr-2 mt-3 text-sm">Courses</Button>
          <Button className="mr-2 mt-3 text-sm">Search</Button>
          <Button className="text-sm mt-3">Explore</Button>
        </div>
        <p className="text-p-8 max-w-xl text-base font-normal text-center">
          Makerspace for Advanced Research, Vital Education and Learning AKA
          Marvel at University of Visvesvaraya College of Engineering.
        </p>
      </div>
    </Window>
  );
}

export default Index;
