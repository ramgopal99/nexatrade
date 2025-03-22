export const idlFactory = ({ IDL }) => {
  const Entry = IDL.Record({ 'id' : IDL.Text, 'owner' : IDL.Principal });
  return IDL.Service({
    'add_entry' : IDL.Func(
        [IDL.Text],
        [IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text })],
        [],
      ),
    'list_entries' : IDL.Func([], [IDL.Vec(Entry)], ['query']),
    'ping' : IDL.Func([], [IDL.Bool], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
