import { Button } from "@/components/primitives/Button";
import { IconMoon } from "@/components/shared/Icons";
import Layout from "@/components/shared/Layout";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/router";

export default function Page() {
  // if setup hasn't been completed the user should be redirected to the setup page
  //const session = useSession();
  
  return (
    <Layout>
      <header className='flex h-fit w-full justify-center border-b border-white-10 px-8 pt-8'>
        <div className='flex w-full pb-4 max-w-7xl flex-col gap-4'>
          <h1>test</h1>
          <Button intent='mauve' rounded='full' size='medium'>
            <IconMoon className='w-4' />
            Add Source
          </Button>
          <Button intent='mauveDark' rounded='full' size='medium'>
            <IconMoon className='w-4' />
            Add Source
          </Button>
          <Button intent='lightGray' rounded='full' size='medium'>
            <IconMoon className='w-4' />
            Add Source
          </Button>
          <Button intent='primary' rounded='full' size='medium'>
            <IconMoon className='w-4' />
            Add Source
          </Button>
          <Button intent='white' rounded='full' size='medium'>
            <IconMoon className='w-4' />
            Add Source
          </Button>
          <Button intent='noBG' rounded='full' size='medium'>
            <IconMoon className='w-4' />
            Add Source
          </Button>
        </div>
      </header>
    </Layout>
  );
}
