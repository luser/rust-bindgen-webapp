#![feature(plugin, custom_derive)]
#![plugin(rocket_codegen)]

extern crate bindgen;
extern crate rocket;
extern crate rocket_contrib;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;

use bindgen::builder;
use rocket::request::Form;
use rocket::response::NamedFile;
use rocket_contrib::Json;
use std::path::{Path, PathBuf};

#[get("/")]
fn index() -> Option<NamedFile> {
    NamedFile::open(Path::new("static/index.html")).ok()
}

#[get("/<file..>")]
fn static_files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("static/").join(file)).ok()
}

#[derive(Deserialize)]
struct BindgenInput {
    source: String,
    lang: Option<String>,
}

#[post("/bindgen", data = "<input>")]
fn api_bindgen(input: Json<BindgenInput>) -> Result<String, String> {
    let mut bindings = builder().header_contents("input.h", &input.source);

    if let Some(ref lang) = input.lang {
        bindings = bindings.clang_arg("-x");
        bindings = bindings.clang_arg(lang.clone());
    }

    bindings.generate()
        .map(|b| b.to_string())
        //TODO: get error messages out of bindgen?
        .or(Err("Failed to generate bindings".to_owned()))
}

fn main() {
    rocket::ignite()
        .mount("/api", routes![api_bindgen])
        .mount("/", routes![index, static_files])
        .launch();
}
