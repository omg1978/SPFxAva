declare interface IAvanadeContextStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'avanadeContextStrings' {
  const strings: IAvanadeContextStrings;
  export = strings;
}
