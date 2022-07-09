import { Suspense } from 'react';
import Skeleton from 'lib/components/Skeleton';
import FunctionsList from 'lib/pages/functions/FunctionsList';
import LayoutTitle from 'lib/components/LayoutTitle';
import Button from 'lib/components/Button';
import { trpc } from 'lib/trpc';
import useRandomName from '@scaleway/use-random-name';
import { useRouter } from 'next/router';

const Home = () => {
  const createFunction = trpc.useMutation(['functions.create']);
  const name = useRandomName();
  const router = useRouter();

  return (
    <LayoutTitle
      title="Functions"
      rightItem={
        <Button
          variant="primary"
          disabled={createFunction.isLoading}
          onClick={async () => {
            const func = await createFunction.mutateAsync({
              name,
              domains: [],
              env: [],
              cron: null,
            });

            const body = new FormData();

            body.set('functionId', func.id);
            body.set(
              'code',
              new File(
                [
                  `export function handler(request) {
return new Response("Hello World!")
}`,
                ],
                'index.js',
              ),
            );

            await fetch('/api/deployment', {
              method: 'POST',
              body,
            });

            router.push(`/playground/${func.id}`);
          }}
        >
          Create Function
        </Button>
      }
    >
      <Suspense fallback={<Skeleton variant="card" />}>
        <FunctionsList />
      </Suspense>
    </LayoutTitle>
  );
};

Home.title = 'Functions';

export default Home;
