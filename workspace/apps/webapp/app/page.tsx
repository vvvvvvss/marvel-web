import { Window, Button } from '@marvel/web-ui';
import Navbar from '../components/Navbar';

export function Index() {
  return (
    <Window>
      <Navbar home />
      <div className="pt-24">
        <h1 className="relative">
          <span className={'text-base text-p-7 ml-[2.5%] font-semibold'}>
            UVCE's
          </span>
          <br />
          <span className="text-[min(90vw,180px)] w-[100%] text-center leading-[0.6]">
            marvel
          </span>
        </h1>
        <div className="py-5 w-[100%] flex justify-center ">
          <Button className="mr-2 text-sm">Dashboard</Button>
          <Button className="mr-2 text-sm">About</Button>
          <Button className="mr-2 text-sm">Tracks</Button>
          <Button className="mr-2 text-sm">Courses</Button>
          <Button className="mr-2 text-sm">Search</Button>
          <Button className="text-sm">Explore</Button>
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
