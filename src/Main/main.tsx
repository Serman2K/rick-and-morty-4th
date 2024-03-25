import ReactDOM from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from './App.tsx'
import './index.css'
import './Reset.css'

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
