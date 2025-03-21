import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Trade {
  'id' : bigint,
  'status' : string,
  'trade_type' : string,
  'user_id' : Principal,
  'amount' : number,
}
export interface User {
  'id' : Principal,
  'username' : string,
  'email' : string,
}
export interface _SERVICE {
  'create_trade' : ActorMethod<
    [string, number],
    { 'Ok' : Trade } |
      { 'Err' : string }
  >,
  'create_user' : ActorMethod<
    [string, string],
    { 'Ok' : User } |
      { 'Err' : string }
  >,
  'get_user' : ActorMethod<[Principal], [] | [User]>,
  'get_user_trades' : ActorMethod<[Principal], Array<Trade>>,
  'greet' : ActorMethod<[string], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
