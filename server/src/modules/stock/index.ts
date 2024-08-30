import { WebSocketServer } from "ws";
import { wssStockUpdate } from "../../webStocket";
import { IStockPrice, IWebSocketHub } from "../../type";

export class StockWebSocket{

    private readonly _wss: WebSocketServer;

    public constructor(){
        this._wss=wssStockUpdate;
    }

    public randoMGenerateStockPrice():IStockPrice{
        return {
            symbol: 'ETH',
            price: parseFloat((Math.random() * 1000).toFixed(2)),
        }
    }

    public broadcastStockPriceAsync():Promise<void>{
        return new Promise((resolve, reject)=>{
            try
            {
                this._wss.on("connection", (ws)=>{
                    const sendStockPrice=()=>{
                        const stockPrice = this.randoMGenerateStockPrice();
                        const data: IWebSocketHub<IStockPrice> = {
                            event: 'stockPriceUpdate',
                            data: stockPrice
                        }
                        ws.send(JSON.stringify(data));
                    }

                    const stockPriceInterval = setInterval(sendStockPrice, 1000);
                    
                    this._wss.on('close', () => {
                        clearInterval(stockPriceInterval);
                        console.log('Client disconnected from stock update');
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