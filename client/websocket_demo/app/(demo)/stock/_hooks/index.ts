import { IWebSocketHub } from "@/utils/types";
import { useEffect, useState } from "react";

export interface IStockPrice {
    symbol: string;
    price: number;
}

const useStockWebSocket = (url: string) => {
    // Use State
    const [stockPrice, setStockPrice] = useState<IStockPrice | null>(null);

    // Use Effect
    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onmessage=(event)=>{
            const message:IWebSocketHub<IStockPrice> = JSON.parse(event.data);

            if(message.event === 'stockPriceUpdate'){
                setStockPrice(message.data);
            }
        }

        return () => {
            ws.close();
        };
    },[url]);

    return { stockPrice };
};

export default useStockWebSocket;