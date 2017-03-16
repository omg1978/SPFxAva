declare interface IAvanadeLogStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'avanadeLogStrings' {
  const strings: IAvanadeLogStrings;
  export = strings;
}
