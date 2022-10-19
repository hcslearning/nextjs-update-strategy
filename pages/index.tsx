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

  return (
    <div>
      <p>{tipo.saludo}</p>
      <Link href={"/index2"}>
        <a>Index #2</a>
      </Link>
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
