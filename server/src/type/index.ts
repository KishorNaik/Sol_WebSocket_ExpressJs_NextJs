export interface IStockPrice {
    symbol: string;
    price: number;
}

export interface INewsFeed {
    headline: string;
    content: string;
}

export interface IWebSocketHub<TData>{
    event: string;
    data: TData;
}