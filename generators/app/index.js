const Generator = require('yeoman-generator');
const fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  prompting() {
    const prompts = [{
      type: 'input',
      name: 'featureName',
      message: 'please input the name of feature？',
      default: 'wealth-seed-template'
    }];

    return this.prompt(prompts).then((options) => {
      this.userOptions = options;
    });
  }
  writing() {
    const temps = {
      'package.json': { featureName: this.userOptions.featureName }
    };

    fs.readdir(this.sourceRoot(), (err, items) => {
      for(let item of items) {
        if(temps[item]) {
          this.fs.copyTpl(
              this.templatePath(item),
              this.destinationPath(item),
              temps[item]
          );
        } else {
          this.fs.copy(
              this.templatePath(item),
              this.destinationPath(item)
          );
        }
      }
    });
  }

  end() {
    console.info('generator success');
  }
};