export class Config {
    static revalidateTimeInSeconds():number {
        const seconds = parseInt( process.env.REVALIDATE_TIME_SECONDS??'60' )
        console.log("Tiempo de Revalidación en Segundos: "+seconds)
        return seconds
    }
}