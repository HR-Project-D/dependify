import Layout from "@/components/_other/Layout";
import QueryList from "@/components/_other/scan/QueryList";
import ScanForm from "@/components/_other/scan/ScanForm";
import BodyBase from "@/components/text/BodyBase";
import TitleLarge from "@/components/text/TitleLarge";
import { type Query } from "@/types/scan";
import { ScanResult } from "@/utils/fakeApi";
import {
  clearRecentQueries,
  clearSavedQueries,
  getRecentQueries,
  getSavedQueries,
  removeRecentQuery,
  removeSavedQuery,
} from "@/utils/query";
import { useEffect, useState } from "react";

export default function Page() {
  const [searchResults, setSearchResults] = useState<ScanResult | undefined>();

  const [savedQueries, setSavedQueries] = useState<Query[] | undefined>();
  const [recentQueries, setRecentQueries] = useState<Query[] | undefined>();

  useEffect(() => {
    function getQueries() {
      const savedQueries = getSavedQueries();
      const recentQueries = getRecentQueries();

      const newSavedQueries = savedQueries.filter((savedQuery) => {
        return !savedQueries.find((savedQuery) => {
          return savedQuery.id === savedQuery.id;
        });
      });

      const newRecentQueries = recentQueries.filter((recentQuery) => {
        return !recentQueries.find((savedQuery) => {
          return recentQuery.id === savedQuery.id;
        });
      });

      setSavedQueries([...newSavedQueries, ...recentQueries]);
      setRecentQueries([...newRecentQueries, ...recentQueries]);
    }

    getQueries();

    window.addEventListener("storage", () => {
      const queries = getQueries();
    });

    return () => {
      window.removeEventListener("storage", () => {
        getQueries();
      });
    };
  }, []);

  return (
    <Layout className="p-16">
      <div className="flex h-full w-full max-w-8xl flex-col gap-16 pt-8">
        <div className="flex w-full flex-col gap-8">
          <div>
            <TitleLarge className="mb-2">Configure your scan</TitleLarge>
            <BodyBase className="text-white-56">
              Search for a dependency and version to see if it is used in any of
              your data sources.
            </BodyBase>
          </div>
        </div>
        <div className="flex w-full gap-16">
          <aside className="flex h-fit min-w-[320px] flex-col gap-8 rounded-lg">
            <QueryList
              onRemove={removeSavedQuery}
              onClear={() => clearSavedQueries()}
              queries={savedQueries}
              title="Saved Queries"
            />
            <hr className="ml-3 mr-3 border-black-8 dark:border-white-8" />
            <QueryList
              onRemove={removeRecentQuery}
              onClear={() => clearRecentQueries()}
              queries={recentQueries}
              title="Recent Queries"
            />
          </aside>

          <ScanForm setSearchResults={setSearchResults} />
        </div>
      </div>
    </Layout>
  );
}
