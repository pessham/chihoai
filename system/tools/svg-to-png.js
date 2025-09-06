#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

function usage() {
  console.log('Usage: node svg-to-png.js <input.svg> [output.png] [width] [height]');
  process.exit(1);
}

const input = process.argv[2];
if (!input) usage();
const output = process.argv[3] || input.replace(/\.svg$/i, '.png');
const widthArg = process.argv[4] ? parseInt(process.argv[4], 10) : undefined;
const heightArg = process.argv[5] ? parseInt(process.argv[5], 10) : undefined;

if (!fs.existsSync(input)) {
  console.error(`Input not found: ${input}`);
  process.exit(2);
}

const svg = fs.readFileSync(input, 'utf8');

const fitTo = widthArg || heightArg
  ? (widthArg ? { mode: 'width', value: widthArg } : { mode: 'height', value: heightArg })
  : undefined;

const resvg = new Resvg(svg, {
  fitTo,
  logLevel: 'error',
  font: {
    loadSystemFonts: true,
  },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

fs.writeFileSync(output, pngBuffer);
console.log(`PNG written: ${path.resolve(output)} (${pngBuffer.length} bytes)`);

