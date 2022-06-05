import Head from "next/head";
import App from "./App";

type prop = {
  user: {
    username: string;
    avatar: string;
  } | null;
};

export default function app({ user }: prop) {
  return (
    <>
      <Head>
        <title>rin chat</title>
      </Head>
      <App user={user} />
    </>
  );
}