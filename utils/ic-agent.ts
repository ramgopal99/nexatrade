import { Actor, HttpAgent } from "@dfinity/agent";

const idlFactory = ({ IDL }: { IDL: any }) => {
  return IDL.Service({
    'greet': IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'create_user': IDL.Func([IDL.Text, IDL.Text], [IDL.Variant({ 'Ok': IDL.Record({ 'id': IDL.Principal, 'username': IDL.Text, 'email': IDL.Text }), 'Err': IDL.Text })], []),
    'get_user': IDL.Func([IDL.Principal], [IDL.Opt(IDL.Record({ 'id': IDL.Principal, 'username': IDL.Text, 'email': IDL.Text }))], ['query']),
    'create_trade': IDL.Func([IDL.Text, IDL.Float64], [IDL.Variant({ 'Ok': IDL.Record({ 'id': IDL.Nat64, 'user_id': IDL.Principal, 'trade_type': IDL.Text, 'amount': IDL.Float64, 'status': IDL.Text }), 'Err': IDL.Text })], []),
    'get_user_trades': IDL.Func([IDL.Principal], [IDL.Vec(IDL.Record({ 'id': IDL.Nat64, 'user_id': IDL.Principal, 'trade_type': IDL.Text, 'amount': IDL.Float64, 'status': IDL.Text }))], ['query'])
  });
};

const HOST = process.env.NEXT_PUBLIC_IC_HOST || "http://127.0.0.1:4943";
const CANISTER_ID = process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID;

export const createActor = async () => {
  const agent = new HttpAgent({ host: HOST });

  if (process.env.NODE_ENV !== "production") {
    await agent.fetchRootKey();
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId: CANISTER_ID || "",
  });
};