import { ParsedUrlQuery } from "querystring"

export interface Tipo {
    saludo: string
    despedida: string
    paginas?: string[] 
}

export interface HomeProps {
    tipo: Tipo 
}

export interface RutaType {
    params: ParsedUrlQuery
    locale?: string
}