import { DOMAIN, LIMIT } from '@/constants';
import request from '@/services';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
const fetchData = async ({ url, page }) => {
  const response = await request(
    `${DOMAIN}/${url}?page=${page}&limit=${LIMIT}`
  );
  return response.data;
};

export const useGetData = (url, page) => {
  return useQuery({
    queryKey: [url, page],
    queryFn: () => fetchData({ url, page }),
    onError: (error) => {
      toast.error('boreee');
      console.log(error);
    },
  });
};
