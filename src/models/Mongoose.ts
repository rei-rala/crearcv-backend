import { connect, connection } from 'mongoose'
import type { Model, Document } from 'mongoose'
import Profile from './Profile'

class MongooseHandler {
  model: Model<Document>

  constructor(model: Model<Document>) {
    this.model = model
  }

  find = async (filter = {}) => {
    try {
      return { found: this.model.find(filter).lean().exec() }
    }
    catch (error) {
      return { error }
    }
  }

  findOne = async (filter = {}) => {
    try {
      const found = await this.model.findOne(filter).lean()
      return { found }
    }
    catch (error) {
      return { error }
    }
  }

  save = async (object: any) => {
    try {
      if (!object) { throw 'Ingrese propiedades' }
      const newObject = new this.model(object)

      return { saved: newObject.save() }
    }
    catch (error) {
      return { error }
    }
  }

  updateById = async (_id: string, properties: any) => {
    try {
      if (!_id) { throw 'Ingrese un ID' }
      if (!properties) { throw 'Ingrese propiedad/es para actualizar' }

      return { updated: this.model.findOneAndUpdate({ _id }, { ...properties }).exec() }
    }
    catch (error) {
      return { error }
    }
  }

  deleteById = async (_id: string) => {
    try {
      return { deleted: this.model.findOneAndDelete({ _id }).exec() }
    }
    catch (error) {
      return { error }
    }
  }
}


const connectToDB = async (URL: string) => {
  try {
    return connect(URL, {
      serverSelectionTimeoutMS: 1000
    })
  }
  catch (err) {
    return err
  }
}

const closeConnectionToDB = async () => {
  return connection.close();
}


const ProfileDB = new MongooseHandler(Profile)


export {
  ProfileDB,
  connectToDB, closeConnectionToDB
}