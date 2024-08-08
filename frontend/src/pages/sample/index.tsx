import React from "react";
import { NextPageWithLayout } from "@/pages/page";
import PrimaryLayout from "@/components/layouts/primary/PrimaryLayout";

import H1 from "@/components/ui/h1";
import Card from "@/components/ui/card";
import { apiFetchSamples } from "@/apis/SampleApi";
import Alert from "@/components/ui/alert";
import Spinner from '@/components/ui/spinner';

const SamplePage: NextPageWithLayout = () => {

  const { isLoading, data, error } = apiFetchSamples();

  return (
    <section className="py-6 text-sm">
      {error && <Alert>{error.response?.data?.message ?? error.message}</Alert>}
      <div className="flex flex-row justify-between items-center">
        <H1>Samples</H1>
      </div>
      <Card>
        {isLoading ? <Spinner /> : 'Show sample data'}
      </Card>
    </section>
  );
};

SamplePage.getLayout = (page) => {
  return (
    <PrimaryLayout>
      {page}
    </PrimaryLayout>
  );
};

export default SamplePage;
