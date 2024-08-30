export interface IWebSocketHub<TData>{
    event: string;
    data: TData;
}