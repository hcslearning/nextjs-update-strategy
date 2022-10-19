import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Config } from '../lib/config'
import { HomeProps, Tipo } from '../lib/tipos'

const Home2: NextPage<HomeProps> = (props) => {
  const [despedida, setDespedida] = useState<string>(props.tipo.despedida) 
  useEffect(() => {
    
  }, [])
  return (
    <div>
      <p>{despedida}</p>
      <Link href={"/"}>
        <a>Index</a>
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

export default Home2
