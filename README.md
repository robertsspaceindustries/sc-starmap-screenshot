# sc-starmap-screenshot

Create screenshot from structure \
This requires a lot of system resources since it runs [Puppeteer](https://pptr.dev/) to screenshot.

## Installation

```bash
$ npm install # in root of project
```

## Usage

```bash
$ npx . -h
# or
$ node src/cli.mjs -h

Usage: cli [options]

Options:
  -l <code>   location param
  -s <code>   system param
  -o <path>   relative output path (.png)
  -z <num>    custom zoom
  -h, --help  display help for command
```

### Examples

```bash
$ npx . -s SOL -o output.png # Screenshots Sol system and writes it to output.png relative to where the command was run
$ npx . -l SOL.PLANETS.EARTH -s SOL -o output.png # Screenshots Earth in Sol system and writes it to output.png
```

![Sol example (4K, 16:9)](https://github.com/robertsspaceindustries/sc-starmap-screenshot/assets/49074962/50a354cc-67d6-4375-b7d4-6d45c22aee57)
![Earth example (Full HD, 16:9)](https://github.com/robertsspaceindustries/sc-starmap-screenshot/assets/49074962/6bf6eae8-3e8d-40f7-9369-7b243887778b)
