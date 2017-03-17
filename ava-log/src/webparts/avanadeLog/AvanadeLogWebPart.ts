import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AvanadeLog.module.scss';
import * as strings from 'avanadeLogStrings';
import { IAvanadeLogWebPartProps } from './IAvanadeLogWebPartProps';

//OMG - import Log class
import { Log } from '@microsoft/sp-core-library';

export default class AvanadeLogWebPart extends BaseClientSideWebPart<IAvanadeLogWebPartProps> {

  public render(): void {
    
    var url = require('file-loader!./log.png');
    //var url = require("./log.png");

    this.domElement.innerHTML = `
      <div class="${styles.helloWorld}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.context.pageContext.web.absoluteUrl)}</p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>
            </div>
          </div>
        </div>
        <div id="image">
          <img src="${url}" alt='Log' />
        </div>
      </div>`;
    //OMG - different methods of the Log class
    // review result Internet Explorer Developer tools
    Log.info("Render", "Empezamos a renderizar el contenido");
    Log.warn("Aviso", "Esta arrancando");
    Log.error("Error", new Error("Es un error"));
    Log.verbose("Verbose", "Logueo Verbose");

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
