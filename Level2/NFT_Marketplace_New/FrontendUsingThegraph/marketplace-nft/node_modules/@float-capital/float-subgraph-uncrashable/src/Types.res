module GraphSchema = {
  type schemaValue = {value: string}
  type graphSchemaDataTypes = [
    | #String
    | #Int
    | #BigInt
    | #Address
    | #Bytes
    | #Boolean
    | #BigDecimal
  ]
  type schemaValueType = {value: graphSchemaDataTypes}
  type entityFieldTypeKind = [
    | #NonNullType
    | #ListType
    | #NamedType
  ]
  type rec entityFieldType = {
    kind: entityFieldTypeKind,
    name: schemaValueType,
    @as("type") _type: option<entityFieldType>,
  }
  type schemaLabel = {name: schemaValue}
  type entityField = {
    name: schemaValue,
    @as("type") _type: entityFieldType,
    directives: array<schemaLabel>,
  }
}
