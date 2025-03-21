export const idlFactory = ({ IDL }) => {
  const Trade = IDL.Record({
    'id' : IDL.Nat64,
    'status' : IDL.Text,
    'trade_type' : IDL.Text,
    'user_id' : IDL.Principal,
    'amount' : IDL.Float64,
  });
  const User = IDL.Record({
    'id' : IDL.Principal,
    'username' : IDL.Text,
    'email' : IDL.Text,
  });
  return IDL.Service({
    'create_trade' : IDL.Func(
        [IDL.Text, IDL.Float64],
        [IDL.Variant({ 'Ok' : Trade, 'Err' : IDL.Text })],
        [],
      ),
    'create_user' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Variant({ 'Ok' : User, 'Err' : IDL.Text })],
        [],
      ),
    'get_user' : IDL.Func([IDL.Principal], [IDL.Opt(User)], ['query']),
    'get_user_trades' : IDL.Func([IDL.Principal], [IDL.Vec(Trade)], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
