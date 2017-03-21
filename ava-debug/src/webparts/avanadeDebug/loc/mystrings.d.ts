declare interface IAvanadeDebugStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'avanadeDebugStrings' {
  const strings: IAvanadeDebugStrings;
  export = strings;
}
