import { ISPList } from './AvanadeContextWebPart';

export default class MockHttpClient {
    //OMG - it builds the initial ISPList mock array and returns.
    private static _items: ISPList[] = [
        { Title: 'Mock List', Id: '1' },
        { Title: 'Mock List 2', Id: '2' },
        { Title: 'Mock List 3', Id: '3' }
    ];

    public static get(): Promise<ISPList[]> {
        return new Promise<ISPList[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
}