import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div >
      <div className="leading-8 p-4 my-2 rounded-md border-b">
        <div className="font-bold ">Natural Language Processing(NLP)</div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae repellendus, fugit ipsum tempora provident voluptate dolorem qui quo placeat assumenda eius aut consequatur? Minima deserunt obcaecati dolor esse nesciunt.
        </div>
        <div className="flex justify-end mt-4 gap-4">
          <Link className="uppercase font-bold bg-slate-200 px-4 py-2 rounded-md text-sm tracking-widest" href='/edit'>
           edit
          </Link>
          <Link className="uppercase font-bold text-white bg-red-500 px-4 py-2 rounded-md text-sm tracking-widest" href='/delete'>
            delete
          </Link>
        </div>
      </div>
    </div>
  );
}
