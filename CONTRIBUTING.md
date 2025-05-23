# Contributing

## Setup

Installing npm dependencies

```bash
npm i
```

### Using mock data

Data from the `mocks` folder is used to create a fake Zigbee2MQTT server connection.

```bash
npm start
open http://localhost:5173/
```

### Using your Zigbee2MQTT instance

Use the `Z2M_API_URI` environment variable with the appropriate IP & port. Example:

```bash
Z2M_API_URI="ws://192.168.1.200:8080" npm start
open http://localhost:5173/
```

## Format & lint

All contributions are expected to match the repository's formatting and linting rules (using [biomejs](https://biomejs.dev/)).

```bash
npm run check
```

## Test

All contributions are expected to pass the current tests, and implement coverage for new features as appropriate.

```bash
npm run test:cov
```

## Build

All contributions are expected to build successfully.

```bash
npm run build
```

## Translating

[Locales directory](./src/i18n/locales)

You can edit the JSON files directly from Github, using the [EN](./src/i18n/locales/en.json) file as reference. _The EN file contains all the keys to support for full coverage in a given language._ If starting from a blank JSON, copy the content of the EN file in it and then translate the values.

For example:

English:
```json
{
    "common": {
        "action": "Action",
        [...]
```
Spanish
```json
{
    "common": {
        "action": "Acción",
        [...]
```
