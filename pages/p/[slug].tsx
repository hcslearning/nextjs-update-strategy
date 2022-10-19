import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { createElement, useEffect, useState } from 'react'
import { Config } from '../../lib/config'
import { HomeProps, RutaType, Tipo } from '../../lib/tipos'

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

  return (
    <div>
      <p>{tipo.saludo}</p>
      <Link href={"/"}>
        <a>volver al inicio</a>
      </Link>

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

export const getStaticPaths: GetStaticPaths = async () => {
    const url = "http://127.0.0.1:8000/servidor.php"
    const res = await fetch(url);    
    const obj = await res.json() as Tipo   

    let paths:RutaType[] = obj?.paginas?.map(r => {
        return {
            params: {
                slug: r
            }
        }
    }) ?? [] 

    return {
        paths, // paths: [{params: {id: '1'}}, {params: {id: '2'}}] -> example: /post/1 and /post/2
        fallback: 'blocking' // false, true, blocking
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const url = "http://127.0.0.1:8000/servidor.php"
  const res = await fetch(url);    
  const obj = await res.json() as Tipo

  const slug = context.params?.slug?.toString()??'-'
  console.log("Slug es: "+slug)
  const slugExiste = (s:string) => obj.paginas?.includes(slug)??false

  if( !slugExiste(slug) ) {
    return {
        notFound: true
    }
  }

  return {
    props: {
      tipo: obj
    },
    revalidate: Config.revalidateTimeInSeconds() 
  }
}

export default Home
