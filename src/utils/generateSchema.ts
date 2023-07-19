import Joi, { Schema, SchemaMap } from "joi";

function generateSchema<T>(inputInterface: T): Schema {
  const schemaMap: SchemaMap<T> = {};

  for (const key in inputInterface) {
    console.log(key);

    schemaMap[key] = Joi.any().required();
  }

  return Joi.object<T>(schemaMap);
}

export default generateSchema;
