const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Table = require('cli-table3');
const { HardhatPluginError } = require('hardhat/plugins');
const {
  TASK_COMPILE,
} = require('hardhat/builtin-tasks/task-names');

const SIZE_LIMIT = 24576;

const formatSize = function (size) {
  return (size / 1024).toFixed(3);
};

task(
  'size-contracts', 'Output the size of compiled contracts'
).addFlag(
  'noCompile', 'Don\'t compile before running this task'
).setAction(async function (args, hre) {
  if (!args.noCompile) {
    await hre.run(TASK_COMPILE, { noSizeContracts: true });
  }

  const config = hre.config.contractSizer;

  const outputData = [];

  const fullNames = await hre.artifacts.getAllFullyQualifiedNames();

  const outputPath = path.resolve(
    hre.config.paths.cache,
    '.hardhat_contract_sizer_output.json'
  );

  const previousSizes = {};

  if (fs.existsSync(outputPath)) {
    const previousOutput = await fs.promises.readFile(outputPath);

    JSON.parse(previousOutput).forEach(function (el) {
      previousSizes[el.fullName] = el.size;
    });
  }

  await Promise.all(fullNames.map(async function (fullName) {
    if (config.only.length && !config.only.some(m => fullName.match(m))) return;
    if (config.except.length && config.except.some(m => fullName.match(m))) return;

    const { deployedBytecode } = await hre.artifacts.readArtifact(fullName);
    const size = Buffer.from(
      deployedBytecode.replace(/__\$\w*\$__/g, '0'.repeat(40)).slice(2),
      'hex'
    ).length;

    outputData.push({
      fullName,
      displayName: config.disambiguatePaths ? fullName : fullName.split(':').pop(),
      size,
      previousSize: previousSizes[fullName] || null,
    });
  }));

  if (config.alphaSort) {
    outputData.sort((a, b) => a.displayName.toUpperCase() > b.displayName.toUpperCase() ? 1 : -1);
  } else {
    outputData.sort((a, b) => a.size - b.size);
  }

  await fs.promises.writeFile(outputPath, JSON.stringify(outputData), { flag: 'w' });

  const table = new Table({
    head: [chalk.bold('Contract Name'), chalk.bold('Size (KiB)'), chalk.bold('Change (KiB)')],
    style: { head: [], border: [], 'padding-left': 2, 'padding-right': 2 },
    chars: {
      mid: '·',
      'top-mid': '|',
      'left-mid': ' ·',
      'mid-mid': '|',
      'right-mid': '·',
      left: ' |',
      'top-left': ' ·',
      'top-right': '·',
      'bottom-left': ' ·',
      'bottom-right': '·',
      middle: '·',
      top: '-',
      bottom: '-',
      'bottom-mid': '|',
    },
  });

  let largeContracts = 0;

  for (let item of outputData) {
    if (!item.size) {
      continue;
    }

    let size = formatSize(item.size);

    if (item.size > SIZE_LIMIT) {
      size = chalk.red.bold(size);
      largeContracts++;
    } else if (item.size > SIZE_LIMIT * 0.9) {
      size = chalk.yellow.bold(size);
    }

    let diff = '';

    if (item.previousSize) {
      if (item.size < item.previousSize) {
        diff = chalk.green(`-${ formatSize(item.previousSize - item.size) }`);
      } else if (item.size > item.previousSize) {
        diff = chalk.red(`+${ formatSize(item.size - item.previousSize) }`);
      }
    }

    table.push([
      { content: item.displayName },
      { content: size, hAlign: 'right' },
      { content: diff, hAlign: 'right' },
    ]);
  }

  console.log(table.toString());

  if (largeContracts > 0) {
    console.log();

    const message = `Warning: ${ largeContracts } contracts exceed the size limit for mainnet deployment.`;

    if (config.strict) {
      throw new HardhatPluginError(message);
    } else {
      console.log(chalk.red(message));
    }
  }
});
