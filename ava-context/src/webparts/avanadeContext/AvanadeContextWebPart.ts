import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AvanadeContext.module.scss';
import * as strings from 'avanadeContextStrings';
import { IAvanadeContextWebPartProps } from './IAvanadeContextWebPartProps';

//OMG - import my mock implementation
import MockHttpClient from './MockHttpClient';

//OMG - class that implement API REST to call sharepoint lists
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

//OMG - EnvironmentType module, indentify what environment are you using (Workbench or SharePoint)
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

//OMG - interface to work with sharepoint lists
export interface ISPLists {
  value: ISPList[];
}
//OMG - interface to work with sharepoint lists (Title and Id)
export interface ISPList {
  Title: string;
  Id: string;
}

export default class AvanadeContextWebPart extends BaseClientSideWebPart<IAvanadeContextWebPartProps> {

  public render(): void {
    //OMG - new html with context objects
    this.domElement.innerHTML = `
      <div class="${styles.helloWorld}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span class="ms-font-xl ms-fontColor-white">Welcome to Avanade WebCast!</span>
              <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
              <p class="ms-font-l ms-fontColor-white">Web Title: <b>${escape(this.context.pageContext.web.title)}</b></p>
              <p class="ms-font-l ms-fontColor-white">Web Url: <b>${escape(this.context.pageContext.web.absoluteUrl)}</b></p>
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a>
            </div>
          </div>
        </div>
        <div id="spListContainer" />
      </div>`;
    //OMG - call function to get data from sharepoint list depends environment
    this._renderListAsync();
  }

  //OMG - get data from sharepoint list depends environment
  private _renderListAsync(): void {
    //OMG - Workbench environment (local)
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then((response) => {
        this._renderList(response.value);
      });
    }
    //OMG - SharePoint environment
    else if (Environment.type == EnvironmentType.SharePoint ||
      Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData()
        .then((response) => {
          this._renderList(response.value);
        });
    }
  }

  //OMG - show data from sharepoint list
  private _renderList(items: ISPList[]): void {
    let html: string = '';
    items.forEach((item: ISPList) => {
      html += `
        <ul class="${styles.list}">
            <li class="${styles.listItem}">
                <span class="ms-font-l">${item.Title}</span>
            </li>
        </ul>`;
    });

    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
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

  //OMG - get the data from mock sharepoint list
  private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
      .then((data: ISPList[]) => {
        var listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
  }

  //OMG - get the data from sharepoint list
  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

}
