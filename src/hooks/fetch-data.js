import { DOMAIN, LIMIT } from '@/constants';
import request from '@/services';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const fetchData = async ({ url, page, searchKey = 'name', searchValue }) => {
  const searchParam = searchValue ? `&${searchKey}=${searchValue}` : '';
  const fullUrl = `${DOMAIN}/${url}?page=${page}&limit=${LIMIT}${searchParam}`;
  console.log("Request URL:", fullUrl);
  const response = await request(fullUrl);
  return response.data;
};

export const useGetData = (url, page, searchKey, searchValue) => {
  return useQuery({
    queryKey: [url, page, searchKey, searchValue],
    queryFn: () => fetchData({ url, page, searchKey, searchValue }),
    onError: (error) => {
      toast.error('Xatolik yuz berdi');
      console.error(error);
    },
  });
};
