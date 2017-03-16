declare interface IAvanadeListStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'avanadeListStrings' {
  const strings: IAvanadeListStrings;
  export = strings;
}
