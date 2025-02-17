// import PageRender from "@/components/page_render";
import Head from "next/head";
import dynamic from "next/dynamic";

const PageRender = dynamic(() => import("@/components/page_render"), {
  ssr: false,
})

export default function Home() {

  return (
    <>
      <Head>
        <title>School Attendance App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <PageRender />
        <div style={{ position: "absolute", bottom: "10px", left: "10px", fontFamily: "sans-serif", fontSize: ".85rem" }}>Attendance System. <br/> By Davidson Mapetese</div>
    </>
  );
}
