declare interface IAvanadePropertiesStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  //OMG - add new string
  PropertyPaneTest: string;
}

declare module 'avanadePropertiesStrings' {
  const strings: IAvanadePropertiesStrings;
  export = strings;
}
