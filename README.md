A webapp that runs [rust-bindgen](https://github.com/servo/rust-bindgen) on provided input.

[View the app](https://rust-bindgen.herokuapp.com/)

# Building

```commands
$ cd rust-bindgen-webapp/
$ rustup override set nightly-2017-07-19
$ cargo build
```

# Running Locally

```commands
$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs
     Running `target/debug/rust-bindgen-webapp`
🔧  Configured for development.
    => address: localhost
    => port: 8000
    => log: normal
    => workers: 96
    => secret key: generated
    => limits: forms = 32KiB
    => tls: disabled
🛰  Mounting '/api':
    => POST /api/bindgen
🛰  Mounting '/':
    => GET /
    => GET /<file..>
🚀  Rocket has launched from http://localhost:8000
```
