import type { ComponentResolver } from 'unplugin-vue-components';

type NameBlacklist = (string | RegExp)[];

const NATIVE_NAMES = [
  'Array',
  'Audio',
  'Authenticator',
  'Abort',
  'Attr',
  'AbsoluteRange',
  'Accelerometer',
  'AggregateError',
  'Atomics',
  'AnalyserNode',
  'AbsoluteOrientationSensor',
];

const NO_STYLE_COMPONENTS = ['checkboxGroup', 'virtualListItem'];

export interface AnyUIResolverOptions {
  styleType?: 'scss' | 'css';
  importStyle?: 'boolean';
  blacklist?: NameBlacklist;
}

const getSideEffects = (importName: string, options: AnyUIResolverOptions) => {
  const { styleType = 'css', importStyle = true } = options;
  if (!importStyle) {
    return;
  }
  // generate style path
  const formattedName = importName[1].toLowerCase() + importName.slice(2);
  // check no style components
  if (NO_STYLE_COMPONENTS.includes(formattedName)) {
    return;
  }
  return `@any-design/anyui/styles/components/${formattedName}.${styleType}`;
};

const isNameExcluded = (name: string, blacklist?: NameBlacklist) => {
  const isNativeName = NATIVE_NAMES.reduce((res, curr) => res || name.startsWith(curr), false);
  if (isNativeName) {
    return true;
  }
  if (Array.isArray(blacklist)) {
    const isBlacklistIncluded = blacklist.reduce<boolean>(
      (res: boolean, curr: string | RegExp) =>
        !!(res || (typeof curr === 'string' ? name === curr : curr.test(name))),
      false,
    );
    if (isBlacklistIncluded) {
      return false;
    }
  }
  return false;
};

export function AnyUIResolver(options: AnyUIResolverOptions = {}): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (!/^A[A-Za-z]+$/.test(name)) {
        return;
      }
      // prevent resolving native properties and black list names
      if (isNameExcluded(name, options.blacklist)) {
        return;
      }
      return {
        name: name.slice(1),
        from: '@any-design/anyui',
        sideEffects: getSideEffects(name, options),
      };
    },
  };
}
