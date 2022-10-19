import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { Config } from '../lib/config'
import { HomeProps } from '../lib/tipos'

const Datos: NextPage<HomeProps> = (props) => {
  const str = JSON.stringify(props.tipo) 
  return (
    <>
      <div>{str}</div>

      <script 
        id='datos' 
        type='application/json' 
        dangerouslySetInnerHTML={{__html: str}}
      >
      </script>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const url = "http://127.0.0.1:8000/servidor.php"
  const res = await fetch(url);    
  const saludoObj = await res.json()   

  return {
    props: {
      tipo: saludoObj 
    }
  }
}

export default Datos
