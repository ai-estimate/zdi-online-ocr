import {useRouter} from 'next/router';

export function useChatId() {
  const router = useRouter();
  return router.query?.pk as string;
}
