use candid::{CandidType, Principal};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;

#[ic_cdk::query]
fn get_my_principal() -> Principal {
    ic_cdk::caller()
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct User {
    id: Principal,
    username: String,
    email: String,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Trade {
    id: u64,
    user_id: Principal,
    trade_type: String,
    amount: f64,
    status: String,
}

thread_local! {
    static USERS: RefCell<HashMap<Principal, User>> = RefCell::new(HashMap::new());
    static TRADES: RefCell<HashMap<u64, Trade>> = RefCell::new(HashMap::new());
    static TRADE_ID_COUNTER: RefCell<u64> = RefCell::new(0);
}

#[ic_cdk::update]
fn create_user(username: String, email: String) -> Result<User, String> {
    let caller = ic_cdk::caller();
    
    let user = User {
        id: caller,
        username,
        email,
    };

    USERS.with(|users| {
        users.borrow_mut().insert(caller, user.clone());
    });

    Ok(user)
}

#[ic_cdk::query]
fn get_user(user_id: Principal) -> Option<User> {
    USERS.with(|users| users.borrow().get(&user_id).cloned())
}

#[ic_cdk::update]
fn create_trade(trade_type: String, amount: f64) -> Result<Trade, String> {
    let caller = ic_cdk::caller();
    
    let trade_id = TRADE_ID_COUNTER.with(|counter| {
        let current = *counter.borrow();
        *counter.borrow_mut() += 1;
        current
    });

    let trade = Trade {
        id: trade_id,
        user_id: caller,
        trade_type,
        amount,
        status: "pending".to_string(),
    };

    TRADES.with(|trades| {
        trades.borrow_mut().insert(trade_id, trade.clone());
    });

    Ok(trade)
}

#[ic_cdk::query]
fn get_user_trades(user_id: Principal) -> Vec<Trade> {
    TRADES.with(|trades| {
        trades
            .borrow()
            .values()
            .filter(|trade| trade.user_id == user_id)
            .cloned()
            .collect()
    })
}

// Keep the original greet function
#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}