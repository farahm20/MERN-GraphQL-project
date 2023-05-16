import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Project from './pages/Project'

//cache variabke for updating the cache memory
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
  },
})
//setting up the client variable
const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  // cache: new InMemoryCache(), //instead of this we use the cache vairbale so that cache is udated on every delete
  cache,
})

//to have access to the Apollo client we will wrap it up into to Apollo provider.
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="*" element={<NotFound />}></Route>
              <Route path="/projects/:id" element={<Project />}></Route>
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App
