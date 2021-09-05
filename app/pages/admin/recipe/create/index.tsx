import Head from 'next/head'
import Link from 'next/link'
import DashboardLayout from '../../../../components/layout/Dashboard'
import HeaderWithActions from '../../../../components/layout/Header/HeaderWithActions'
import Button from '../../../../components/ui/Button'

const RecipesAdminPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Recipes</title>
      </Head>
      <HeaderWithActions title="Create Recipe">
        <Button to="/admin/recipe">Cancel</Button>
      </HeaderWithActions>
    </DashboardLayout>
  )
}

export default RecipesAdminPage
