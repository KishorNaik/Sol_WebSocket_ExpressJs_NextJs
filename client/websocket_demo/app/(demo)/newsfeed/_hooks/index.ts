import { IWebSocketHub } from "@/utils/types";
import { useEffect, useState } from "react";

export interface INewsFeed {
    headline: string;
    content: string;
}

const useNewsFeedWebSocket = (url: string) => {
    // Use State
    const [newsFeed, setNewsFeed] = useState<INewsFeed | null>(null);

    // Use Effect
    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onmessage=(event)=>{
            const message:IWebSocketHub<INewsFeed> = JSON.parse(event.data);

            if(message.event === 'newsUpdate'){
                setNewsFeed(message.data);
            }
        }

        return () => {
            ws.close();
        };
    },[url]);

    return { newsFeed };
};

export default useNewsFeedWebSocket;