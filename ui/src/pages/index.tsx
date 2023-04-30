import Image from "next/image";
import { CMDK } from "@/components/shared/cmdk/CMDK";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/shared/Layout";

export default function Page() {
  return (
    // <main className='relative h-full min-h-screen w-full'>
    //   <Image
    //     unoptimized
    //     className='absolute left-0 top-0 z-0 h-full w-full object-cover'
    //     src='/images/bg.jpg'
    //     alt='Background'
    //     width={1920}
    //     height={1080}
    //   />

    //   <CMDK key='cmdk' />
    // </main>
    <Layout>
      <h1>test</h1>
    </Layout>
  );
}
