import logo from './assets/GraphQL_Logo.png'

const Header = () => {
  return (
    <nav className="navbar bg-loight mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>ProjectMgmt</div>
          </div>
        </a>
      </div>
    </nav>
  )
}

export default Header