import { SPHttpClient } from '@microsoft/sp-http';

export interface IReactCrudProps {
  //description : string;
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
}
