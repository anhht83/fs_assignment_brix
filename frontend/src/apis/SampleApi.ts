import Api from "./Api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TCreateSample, TFetchSamples } from '@/types/sample';

export const apiCreateSample = (options = {}) => {
  return useMutation({
    mutationKey: ["createSample"],
    mutationFn: async (formData: TCreateSample['request']): Promise<TCreateSample['response']> => {
      const response: any = await Api.fetchData({
          url: "/samples",
          method: "post",
          data: formData,
        }
      )
      return response.data
    },
    ...options
  });
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const apiFetchSamples =
  (options = {}) => useQuery({
    queryKey: ["samples"],
    queryFn: async (): Promise<TFetchSamples['response']> => {
      const response: any = await Api.fetchData({
        url: `/samples`
      });
      return response.data;
    },
    ...options
  });
