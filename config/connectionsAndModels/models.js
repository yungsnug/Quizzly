/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#!/documentation/concepts/ORM
 */

module.exports.models = {
  /*need to run npm install sails-mysql and have sql installed (follow guide)*/
  // connection: 'mysql',
  /*need to run npm install sails-memory (follow guide)*/
  connection: 'memory',
  migrate: 'alter'
};
