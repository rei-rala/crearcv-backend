import { connect, connection } from 'mongoose'
import type { Model, Document } from 'mongoose'
import Cv from './Cv'
import User from './User'
import { profileExample } from '../temp'

class MongooseHandler {
  private _model: Model<Document>
  private _excludedProps = { __v: false }

  constructor(model: Model<Document>) {
    this._model = model
  }

  get model(): Model<Document> {
    return this._model
  }

  findAll = async (query = {}, limit = 100): Promise<any[]> => {
    return this._model.find(query, null, { limit }).lean()
  }

  find = async (filter = {}, limit = 1): Promise<{ found: any, error: any }> => {
    let found
    let error

    try {
      found = await (limit > 1 ? this._model.find(filter).limit(limit).lean() : this._model.findOne(filter)).select(this._excludedProps).lean()
    }
    catch (err: any) {
      error = err?.message ? err.message : err ?? 'Unknown Error'
    }
    return { found, error }
  }

  save = async (object: any): Promise<{ saved: any, error: any }> => {
    let saved
    let error

    try {
      if (!object) { throw 'Must provide properties' }
      const newObject = new this._model(object)

      saved = await newObject.save()

      if (!saved) { throw 'Could not save' }

    }
    catch (err: any) {
      error = err?.message ? err.message : err ?? 'Unknown Error'
    }
    return { saved, error }
  }

  updateById = async (_id: string, properties: { [key: string]: any }): Promise<{ updated: any, error: any }> => {
    let updated
    let error

    try {
      if (!_id) { throw 'Provide an ID' }
      if (!properties) { throw 'Must provide properties' }

      delete properties._id

      updated = await this._model.findByIdAndUpdate(_id, properties, { new: true }).select(this._excludedProps)
      if (!updated) { throw 'Could not update' }
    }
    catch (err: any) {
      error = err?.message ? err.message : err ?? 'Unknown Error'
    }

    return { updated, error }
  }

  deleteById = async (_id: string): Promise<{ deleted: any, error: any }> => {
    let deleted
    let error

    try {
      if (!_id) { throw 'Provide an ID' }

      let deleted = await this._model.findByIdAndDelete(_id).select(this._excludedProps)

      if (!deleted) {
        throw 'Could not delete'
      }
    }
    catch (err: any) {
      error = err?.message ? err.message : err ?? 'Unknown Error'
    }

    return { deleted, error }
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


const CvDB = new MongooseHandler(Cv)
const UserDB = new MongooseHandler(User)

export {
  CvDB, UserDB,
  connectToDB, closeConnectionToDB
}