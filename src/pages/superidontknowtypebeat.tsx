import type { EvmNft } from "@moralisweb3/common-evm-utils";
import { type NextPage } from "next";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Testing: NextPage = () => {
  // const [minters, setMinters] = useState<EvmNft[]>([]);
  const minters: EvmNft[] | undefined =
    trpc.example.getAllMinters.useQuery().data;

  const totalmints = trpc.example.getCount.useQuery().data;
  // if (data && data.length > 0) {
  //   setMinters(data);
  // }

  if (!minters) return null;

  return (
    <>
      <p>
        last 100mints, in total <strong>{totalmints}</strong>
      </p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6" scope="col">
                TalentLayerId
              </th>
              <th className="py-3 px-6" scope="col">
                Minted Block
              </th>
              {/* <th className="py-3 px-6" scope="col">
                Datetime
              </th> */}
            </tr>
          </thead>
          <tbody>
            {minters?.map((nft, i) => {
              return (
                <tr
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-900"
                  key={i}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                  >
                    {nft.metadata["name"]}
                  </th>
                  <td className="py-4 px-6">{nft.blockNumberMinted}</td>
                  {/* <td className="py-4 px-6">
                    {new Date(nft.lastTokenUriSync).toLocaleString("PT")}
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Testing;
