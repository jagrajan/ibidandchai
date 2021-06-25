import Head from 'next/head'
import NavBar from '../components/layout/NavBar'

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Two Cats in the Kitchen</title>
      </Head>
      <NavBar />
    </div>
  )
}

export default Home
