﻿## ava-properties

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

### Add properties - AvanadePropertiesWebPart.ts

1) Import new control types from properties (Checkbox, Dropdown and Toggle)

```bash
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  //OMG - add new properties
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
```

2) Add a new property "test" in the existing group

```bash
groups: [
  {
    groupName: strings.BasicGroupName,
    groupFields: [
      PropertyPaneTextField('description', {
        label: 'Webpart Description'
      }),
      //OMG - add new property
      PropertyPaneTextField('test', {
        label: 'Multi-line Text Field',
        multiline: true
      })
    ]
  }
```

3) Add a new group "Group 2" with properties (test1, test2 and test3)

```bash
//OMG - add new group and properties
{
  groupName: "Group 2",
  groupFields: [
    PropertyPaneCheckbox('test1', {
      text: 'Checkbox'
    }),
    PropertyPaneDropdown('test2', {
      label: 'Dropdown',
      options: [
        { key: '1', text: 'One' },
        { key: '2', text: 'Two' },
        { key: '3', text: 'Three' },
        { key: '4', text: 'Four' }
      ]
    }),
    PropertyPaneToggle('test3', {
      label: 'Toggle',
      onText: 'On',
      offText: 'Off'
    })
  ]
}
```
### Add properties - IAvanadePropertiesWebPartProps.ts

1) New properties (test, test1, test2 and test3) and their types

```bash
export interface IAvanadePropertiesWebPartProps {
  description: string;
  //OMG - add new properties
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
}
```
### Add properties - AvanadePropertiesWebPart.manifest.json

1) Add default values for new properties (test, test1, test2 and test3)

```bash
"properties": {
  "description": "Avanade Properties II",
      
  "test": "Avanade Multi-line",
  "test1": true,
  "test2": "2",
  "test3": true
}
```
