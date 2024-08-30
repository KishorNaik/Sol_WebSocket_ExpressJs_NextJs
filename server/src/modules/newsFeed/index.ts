import { WebSocketServer } from "ws";
import { wssNewsFeed } from "../../webStocket";
import { INewsFeed, IWebSocketHub } from "../../type";

export class NewsFeedWebsocket{

    private readonly _wss: WebSocketServer;

    public constructor(){
        this._wss=wssNewsFeed;
    }

    private randoMGenerateNewsFeed():INewsFeed{
        const headlines = [
            "Breaking News: Market Hits All-Time High",
            "Breaking News: Market Plummets",
            "Breaking News: New Tech Innovation Announced",
        ];
        const contents = [
            "The stock market reached an all-time high today, driven by strong earnings reports.",
            "The stock market plummeted today due to unexpected economic data.",
            "A new tech innovation has been announced, promising to revolutionize the industry.",
        ];
          const index = Math.floor(Math.random() * headlines.length);
        return {
            headline: headlines[index],
            content: contents[index],
        };
    }

    public broadcastNewsFeedAsync():Promise<void>{
        return new Promise((resolve, reject)=>{
            try
            {
                this._wss.on("connection", (ws)=>{
                    const sendNewsPrice=()=>{
                        const newsFeed = this.randoMGenerateNewsFeed();
                        const data: IWebSocketHub<INewsFeed> = {
                            event: 'newsUpdate',
                            data: newsFeed
                        }
                        ws.send(JSON.stringify(data));
                    }

                    const newsFeedInterval = setInterval(sendNewsPrice, 1000);
                    
                    this._wss.on('close', () => {
                        clearInterval(newsFeedInterval);
                        console.log('Client disconnected from news feed update');
                    });
    
                });

                
                return resolve();
            }
            catch(ex){
                return reject(ex);
            }
        })
    }
}