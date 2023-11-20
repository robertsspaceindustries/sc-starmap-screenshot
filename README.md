# sc-starmap-screenshot

Create screenshot from structure

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
  -h, --help  display help for command
```

### Examples

```bash
$ npx . -s SOL -o output.png # Screenshots Sol system and writes it to output.png relative to where the command was run

$ npx . -l SOL.PLANETS.EARTH -s SOL -o output.png # Screenshots Earth in Sol system and writes it to output.png
```
