import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { createElement, useEffect, useState } from 'react'
import { Config } from '../lib/config'
import { HomeProps, Tipo } from '../lib/tipos'

const Home: NextPage<HomeProps> = (props) => {
  const [tipo, setTipo] = useState(props.tipo) 

  useEffect(() => {
    const update = async () => {
      const url       = "/datos"
      const datos     = await fetch(url)
      const htmlCode  = await datos.text() 
      const html      = document.createElement("html") 
      html.innerHTML  = htmlCode 
      const objStr    = html.querySelector("#datos")?.textContent 
      const obj       = JSON.parse( objStr??'' ) as Tipo 
      setTipo( obj )
    }
    update() 
  }, []) 

  const revalidarPagina = async (pagina:string) => {
    console.log("Revalidando página: "+pagina)
    const ruta = "/api/revalidar?path="+pagina
    await fetch(ruta)
  }

  return (
    <div>
      <p>{tipo.saludo}</p>
      <Link href={"/index2"}>
        <a>Index #2</a>
      </Link>

      <br /><br /> 
      <button onClick={() => revalidarPagina('/datos')}>Refrescar Pag. Datos</button>
      <br />
      <button onClick={() => revalidarPagina('/p/dos')}>Eliminar Pag. 2</button>
      <ul>
        {props.tipo.paginas?.map(s => 
        <li key={s}>
          <Link href={`/p/${s}`}>
            <a>{s}</a>
          </Link>
        </li>
        )}        
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const url = "http://127.0.0.1:8000/servidor.php"
  const res = await fetch(url);    
  const saludoObj = await res.json()   

  return {
    props: {
      tipo: saludoObj 
    },
    revalidate: Config.revalidateTimeInSeconds() 
  }
}

export default Home
