# Setup
## Install dependencies
```bash
yarn install
```

## Run the app
```bash
EXTERNAL_API_KEY=<api-key> yarn run dev
```

## Run tests
```bash
yarn run test:all
```

## Run curl example
```bash
curl --location 'localhost:3000/optimize-path' \
--header 'Content-Type: application/json' \
--data '{
    "startPosition": {
        "x": 0,
        "y": 0,
        "z": 0
    },
    "products": ["product-1", "product-2", "product-3"]
}'
```