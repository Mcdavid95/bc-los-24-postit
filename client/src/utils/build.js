import webpack from 'webpack';
import webpackConfig from '../../../webpack.config.prod';

process.env.NODE_ENV = 'production';

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => error.red);
  }
  if (jsonStats.hasWarnings) {
    jsonStats.warnings.map(warning => warning.yellow);
  }
  return 0;
});
