import path from 'node:path';
import { glob } from 'glob';

let _watchedDirectories = [];

export class WatchAssetFilesPlugin {
  static getEntries(globPatterns = [], watchedDirectories = []) {
    if (!Array.isArray(globPatterns)) {
      throw new TypeError('`globPatterns` must be in an array.');
    }

    if (!Array.isArray(watchedDirectories)) {
      throw new TypeError('`watchedDirectories` must be in an array.');
    }

    _watchedDirectories = watchedDirectories;

    return function () {
      const entryFiles = {};

      glob.sync(globPatterns, { ignore: 'node_modules/**' }).forEach(file => {
        const { ext } = path.parse(file);
        const resolvedFile = path.resolve(file);
        let fileKey = resolvedFile.replace(ext, '');

        _watchedDirectories.forEach(_watchedDirectory => {
          fileKey = fileKey.replace(path.resolve(_watchedDirectory), '');
        });

        if (fileKey[0] === path.sep) {
          fileKey = fileKey.substring(1, fileKey.length);
        }

        fileKey = fileKey.replaceAll('\\', '/');

        if (Array.isArray(entryFiles[fileKey])) {
          entryFiles[fileKey].push(resolvedFile);
        } else {
          entryFiles[fileKey] = [resolvedFile];
        }
      });

      return entryFiles;
    };
  }

  apply(compiler) {
    compiler.hooks.afterCompile.tapAsync(
      this.constructor.name,
      this.afterCompile.bind(this)
    );
  }

  afterCompile(compilation, callback) {
    for (const directory of _watchedDirectories) {
      compilation.contextDependencies.add(path.normalize(directory));
    }
    callback();
  }
}
