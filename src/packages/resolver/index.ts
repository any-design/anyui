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
  const formattedName = importName[0].toLowerCase() + importName.slice(1);
  return `@any-design/anyui/styles/components/${formattedName}.${styleType}`;
};

export function AnyUIResolver(options: AnyUIResolverOptions = {}) {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (/^A[A-Za-z]+$/.test(name)) {
        return {
          name,
          from: '@any-design/anyui',
          sideEffects: getSideEffects(name, options),
        };
      }
    },
  };
}
