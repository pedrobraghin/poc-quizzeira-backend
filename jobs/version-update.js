import packageJson from '../package.json' assert { type: 'json' };
import fs from 'fs';

const packageJsonPath = 'package.json';

const versions = packageJson.version.split('.');

const minorVersionIndex = versions.length - 1;

const minorVersion = parseInt(versions[minorVersionIndex]) + 1;

versions[minorVersionIndex] = minorVersion;

console.log('New version: ', minorVersion);

packageJson.version = versions.join('.');

fs.writeFileSync(
  packageJsonPath,
  JSON.stringify(packageJson, null, 2),
  'utf-8',
);
