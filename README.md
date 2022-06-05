# Rin Chat web client
This is the web client to access the rin chat network. Set `.env.local` and `./prisma/.env` with the required variables described in the respective `example.env` files

Tested with node 18.2

```bash
$ node -v
v18.2.0
```

# Screenshots
<img src="https://raw.githubusercontent.com/RocKing1001/rin/main/.github/images/Screenshot1.png">
<img src="https://raw.githubusercontent.com/RocKing1001/rin/main/.github/images/Screenshot2.png">

# Tech Stack
- NextJS
- PostgresSQL and Prisma
- Supabase
- SocketIO
- Backend can be anything, but on the official Rin network its node + express

# API Documentation
(tbd)

# Contributors
- Kunal (me)
- @HUSKI3 (backend, in the works)

# Hosting
This web client is hosted on vercel and can easily be deployed
#### Self hosting can require some setup when using vercel edge functions, but I am not using them for this (yet). I have never tried self hosting next js so I wont be abele to provide assistance, but it should be not too difficult and there are resources online


# License

Copyright © 2022, [Kunal Dandekar](https://github.com/RocKing1001). Released under the [MIT license](LICENSE).