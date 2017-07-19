#![feature(plugin, custom_derive)]
#![plugin(rocket_codegen)]

extern crate bindgen;
extern crate rocket;

use bindgen::builder;
use rocket::request::Form;
use rocket::response::NamedFile;
use std::path::{Path, PathBuf};

#[get("/")]
fn index() -> Option<NamedFile> {
    NamedFile::open(Path::new("static/index.html")).ok()
}

#[get("/<file..>")]
fn static_files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("static/").join(file)).ok()
}

#[derive(FromForm)]
struct BindgenInput {
    source: String,
}

#[post("/bindgen", data = "<input>")]
fn api_bindgen(input: Form<BindgenInput>) -> Result<String, String> {
    let i = input.get();
    builder().header_contents("input.h", &i.source)
         .generate()
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
