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


thread_local! {
    static USERS: RefCell<HashMap<Principal, User>> = RefCell::new(HashMap::new());
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


// Keep the original greet function
#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}
