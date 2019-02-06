import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactcrudWebPartStrings';
import Reactcrud from './components/Reactcrud';
import { IReactCrudProps } from './components/IReactCrudProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IReactCrudWebPartProps {
  listName: string;
  //description :string;
}

export default class ReactcrudWebPart extends BaseClientSideWebPart<IReactCrudWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactCrudProps > = React.createElement(
      Reactcrud,
      {
    //    description : this.properties.description,
        spHttpClient:this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        listName: this.properties.listName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
