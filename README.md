# Affinity Lab

```shell
git clone https://github.com/affinity-lab/boilerplate-project YOURPROJECT
cd YOURPROJECT
npm install
cp .env.example .env
```

Edit the `.env` file and set up a valid mysql connection:

```env
# TypeORM
PRIVATE_DB_URL="//root:password@127.0.0.1:3306/DATABASE_NAME"
```

Run your application:
```shell
npm run dev
```

Enjoy developing awesome applications!