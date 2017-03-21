import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'avanadeReactStrings';
import AvanadeReact from './components/AvanadeReact';
import { IAvanadeReactProps } from './components/IAvanadeReactProps';
import { IAvanadeReactWebPartProps } from './IAvanadeReactWebPartProps';

export default class AvanadeReactWebPart extends BaseClientSideWebPart<IAvanadeReactWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAvanadeReactProps > = React.createElement(
      AvanadeReact,
      {
        description: this.properties.description,
        //define the new propery
        url: this.context.pageContext.site.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
