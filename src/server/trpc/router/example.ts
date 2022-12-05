import { EvmChain } from "@moralisweb3/common-evm-utils";
import axios from "axios";
import Moralis from "moralis";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  getCount: publicProcedure.query(async () => {
    const response = await axios({
      url: "https://api.thegraph.com/subgraphs/name/talentlayer/talent-layer-fuji",
      method: "post",
      headers: {
        "accept-encoding": "*",
      },
      data: {
        query: `
        {
          users {
            id
          }
        }
          `,
      },
    });
    return response.data.data.users.length;
  }),
  getAllMinters: publicProcedure.query(async () => {
    const chain = EvmChain.FUJI;
    const address = "0xD1B87CCe7f9FA272c6643Fa89085F135A2AbB234";

    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: process.env.MORALIS_SECRET });
    }

    const response = await Moralis.EvmApi.nft.getNFTOwners({
      address,
      chain,
    });

    return response.result;
  }),
});
