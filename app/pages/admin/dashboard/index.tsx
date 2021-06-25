import Head from 'next/head'
import React from 'react'
import DashboardLayout from '../../../components/layout/Dashboard'

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
    </DashboardLayout>
  )
}

export default Dashboard
