export type IJsonApiDocument = IJsonApiDocumentOne | IJsonApiDocumentMany;

export class IJsonApiDocumentMany {
  constructor(public data: Array<{
    attributes: any
    id: string
    type: string
  }>) {}
}

export class IJsonApiDocumentOne {
  constructor(public data: {
    attributes: any
    id: string
    type: string
  }) {}
}
