import { IVerifyResponse, verifyCloudProof } from "@worldcoin/idkit";

export default async function handler(
  req: { body: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: IVerifyResponse): void; new (): any };
    };
  }
) {
  const proof = req.body;
  const app_id = process.env.WORLD_APP_ID;
  const action = process.env.WORLD_ACTION_ID;
  const verifyRes = await verifyCloudProof(
    proof,
    app_id as `app_${string}`,
    action as `action_${string}`
  );

  if (verifyRes.success) {
    // This is where you should perform backend actions if the verification succeeds
    // Such as, setting a user as "verified" in a database
    res.status(200).send(verifyRes);
  } else {
    // This is where you should handle errors from the World ID /verify endpoint.
    // Usually these errors are due to a user having already verified.
    res.status(400).send(verifyRes);
  }
}
