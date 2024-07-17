import { Button } from "~/components/ui/button";

function UserIndex() {
  return (
    <div>
      <section className="h-[50vh] flex bg-[url('images/fruits-bg.jpg')] bg-cover">
        <div className="flex flex-col p-28 w-1/2 gap-8">
          <h1 className="text-7xl text-white">Welcome To Lami Revi Market.</h1>
          <h3 className="text-3xl text-white">Join and save money!</h3>
          <Button className="w-fit rounded-3xl ">Buy now!</Button>
        </div>
      </section>
    </div>
  );
}

export default UserIndex;
