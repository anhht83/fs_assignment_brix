export type TSample =  {
  id: number,
  name: string,
  slug: string,
  createdAt?: string,
  updatedAt?: string,
}
export type TCreateSample = {
  request: {
    name: string,
    slug: string
  },
  response: TSample
}

export type TFetchSamples = {
  request: {},
  response: TSample[]
}
