import Head from 'next/head'
import DashboardLayout from '../../../components/layout/Dashboard'
import HeaderWithActions from '../../../components/layout/Header/HeaderWithActions'

const RecipesAdminPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Recipes</title>
      </Head>
      <HeaderWithActions title="Recipes"></HeaderWithActions>
    </DashboardLayout>
  )
}

export default RecipesAdminPage
