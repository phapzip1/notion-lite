use std::ffi::{CString};
use std::os::raw::c_char;
use yrs::{Doc, Map, GetString, Text, Transact, WriteTxn};
use yrs::types::ToJson;

#[unsafe(no_mangle)]
pub extern "C" fn yrs_doc_new() -> *mut Doc {
    let doc = Doc::new();

    {
        let mut txn = doc.transact_mut();
        let root = txn.get_or_insert_map("root");
        root.insert(&mut txn, "title", "Untitled");

        txn.get_or_insert_map("blocks");
    }

    Box::into_raw(Box::new(doc))
}

#[unsafe(no_mangle)]
pub extern "C" fn yrs_doc_free(ptr: *mut Doc) {
    if !ptr.is_null() {
        unsafe { 
            Box::from_raw(ptr)
        };
    }
}

#[unsafe(no_mangle)]
pub extern "C" fn yrs_doc_insert(ptr: *mut Doc, input: *const c_char) {
    let doc = unsafe { &mut *ptr };
    let text = doc.get_or_insert_text("shared");

    let c_str = unsafe { std::ffi::CStr::from_ptr(input) };
    let str_slice = c_str.to_str().unwrap();

    {
        let mut txn = doc.transact_mut();
        text.insert(&mut txn, 0, str_slice);
    }

    let txn = doc.transact();
}

#[unsafe(no_mangle)]
pub extern "C" fn yrs_doc_get(ptr: *mut Doc) -> *mut c_char{
    let doc = unsafe { &mut *ptr };
    let text = doc.get_or_insert_text("shared");

    let txn = doc.transact();
    let content = text.get_string(&txn);

    CString::new(content).unwrap().into_raw()
}
