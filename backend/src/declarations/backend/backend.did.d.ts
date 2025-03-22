import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Entry { 'id' : string, 'owner' : Principal }
export interface _SERVICE {
  'add_entry' : ActorMethod<[string], { 'Ok' : null } | { 'Err' : string }>,
  'list_entries' : ActorMethod<[], Array<Entry>>,
  'ping' : ActorMethod<[], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
