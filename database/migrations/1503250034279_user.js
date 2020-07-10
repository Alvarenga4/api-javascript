'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string("name", 100)
      table.string("last_name", 100)
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.integer('phone_number', 100)
      table.boolean('active').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
