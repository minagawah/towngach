type TowngatchChunk = 'check' | 'lib';

declare global {
  var NODE_ENV: string;
  var Towngach: Record<TowngachChunk, any>;
}

export {}
