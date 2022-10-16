import type { ComponentResolver } from 'unplugin-vue-components';

export interface AnyUIResolverOptions {
  styleType?: 'scss' | 'css';
  importStyle?: 'boolean';
}

const getSideEffects = (importName: string, options: AnyUIResolverOptions) => {
  const { styleType = 'css', importStyle = true } = options;
  if (!importStyle) {
    return;
  }
  // generate style path
  const formattedName = importName[1].toLowerCase() + importName.slice(2);
  return `@any-design/anyui/styles/components/${formattedName}.${styleType}`;
};

export function AnyUIResolver(options: AnyUIResolverOptions = {}): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (/^A[A-Za-z]+$/.test(name)) {
        return {
          name: name.slice(1),
          from: '@any-design/anyui',
          sideEffects: getSideEffects(name, options),
        };
      }
    },
  };
}
