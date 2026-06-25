import { spawn, spawnSync } from 'node:child_process';

const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const testgroundPort = process.env.ANYUI_TESTGROUND_DEV_PORT ?? '5174';
const testgroundOrigin = `http://127.0.0.1:${testgroundPort}`;
const websiteArgs = process.argv.slice(2);

const processes = [];
let shuttingDown = false;

const websiteEnv = {
  ANYUI_TESTGROUND_DEV_ORIGIN: testgroundOrigin,
  ASTRO_DEV_BACKGROUND: '1',
};

const mergedEnv = (env = {}) => ({
  ...process.env,
  ...env,
});

const runOnce = (args, env = {}, stdio = 'ignore') =>
  new Promise((resolve) => {
    const child = spawn(pnpm, args, {
      cwd: process.cwd(),
      env: mergedEnv(env),
      stdio,
    });

    child.on('exit', (code, signal) => resolve({ code, signal }));
    child.on('error', (error) => resolve({ code: 1, signal: null, error }));
  });

const start = ({ name, args, env = {} }) => {
  const child = spawn(pnpm, args, {
    cwd: process.cwd(),
    env: mergedEnv(env),
    stdio: 'inherit',
  });

  processes.push({ name, child });

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return;
    }

    const reason = signal ? `${name} exited with ${signal}` : `${name} exited with code ${code}`;
    console.log(`\n${reason}. Stopping dev servers...`);
    shutdown(code ?? 1);
  });
};

const stopAll = () => {
  for (const { child } of processes) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
};

const stopWebsite = () => {
  spawnSync(pnpm, ['--filter', '@any-design/anyui-website', 'exec', 'astro', 'dev', 'stop'], {
    cwd: process.cwd(),
    env: mergedEnv(websiteEnv),
    stdio: 'ignore',
  });
};

const shutdown = (code = 0) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  stopAll();
  stopWebsite();
  process.exit(code);
};

process.on('exit', () => {
  stopWebsite();
});

process.on('SIGINT', () => {
  shutdown(0);
});

process.on('SIGTERM', () => {
  shutdown(0);
});

console.log('Starting AnyUI website dev server with Testground mounted at /testground/.');

await runOnce(['--filter', '@any-design/anyui-website', 'exec', 'astro', 'dev', 'stop'], websiteEnv);

start({
  name: 'testground',
  args: [
    '--filter',
    '@any-design/anyui-testground',
    'exec',
    'vite',
    '--host',
    '127.0.0.1',
    '--port',
    testgroundPort,
    '--strictPort',
  ],
});

start({
  name: 'website',
  args: ['--filter', '@any-design/anyui-website', 'exec', 'astro', 'dev', ...websiteArgs],
  env: websiteEnv,
});
