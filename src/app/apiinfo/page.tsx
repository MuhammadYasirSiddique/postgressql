import Link from "next/link";
import Button from "../components/button";

export default function apiinfo() {
  return (
    <div className=" bg-gradient-radial from-slate-500 to-slate-800 h-screen text-slate-200">
      <Link href="/">
        <Button name="Home" />
      </Link>
      <h1 className="text-2xl font-bold">API Information</h1>
      <ul>
        <li>
          <Link href="/api/todo">GET /api/todo</Link>
        </li>
      </ul>
      <br />
      <h2 className="text-xl font-bold">Todo api</h2> <br />
      <ul>
        <li>
          <Link href="/api/todo" className="font-bold">
            GET /api/todo
          </Link>
        </li>{" "}
        <br />
        <li>
          <p className="font-bold">POST /api/todo/</p>
          <p className="">Parameters (body params): task(string)</p>
        </li>
        <br />
        <li>
          <p className="font-bold">PUT /api/todo</p>
          <p>Parameters (body params): id(number), task(string)</p>
        </li>
        <br />
        <li>
          <p className="font-bold">DELETE /api/todo?id=number</p>
          <p>Parameters (query params): id=number</p>
        </li>
      </ul>{" "}
      <br />
    </div>
  );
}
