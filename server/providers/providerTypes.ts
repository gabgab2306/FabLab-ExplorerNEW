export type PriceQuote = { provider:string; productName:string; amount:number; currency:string; checkedAt:string; url:string; availability:'confirmed'|'unknown'|'out-of-stock'; shippingToDO:'confirmed'|'not-verified'|'not-applicable'; status:'queried'|'estimated'|'unavailable' };
export interface PriceProvider { readonly id:string; search(query:string):Promise<PriceQuote[]> }
/** Safe default adapter: reports no quote rather than inventing one. Add an authorized API implementation server-side. */
export class UnconfiguredProvider implements PriceProvider { constructor(readonly id:string){} async search(_query:string):Promise<PriceQuote[]>{return [];} }
