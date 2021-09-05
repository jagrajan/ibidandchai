import Head from 'next/head'
import DashboardLayout from '../../../components/layout/Dashboard'
import HeaderWithActions from '../../../components/layout/Header/HeaderWithActions'
import Button from '../../../components/ui/Button'

const RecipesAdminPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Recipes</title>
      </Head>
      <HeaderWithActions title="Recipes">
        <Button to="/admin/recipe/create">Create</Button>
      </HeaderWithActions>
    </DashboardLayout>
  )
}

export default RecipesAdminPage
