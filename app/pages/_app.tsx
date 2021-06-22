import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ProfileProvider } from '../contexts/ProfileContext'
import ApolloProvider from '../providers/ApolloProvider'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider>
      <ProfileProvider>
        <Component {...pageProps} />
      </ProfileProvider>
    </ApolloProvider>
  )
}
export default MyApp
