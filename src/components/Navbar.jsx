import Logo from "./Logo"

const Navbar = () => {
  return (
    <nav className="py-4 px-5 shadow-md  ">
      <div className="flex justify-end">
        <h1>Login</h1>
        <h1 className="flex px-2">/</h1>
        <h1>Register</h1>
      </div>
      <div className="flex justify-between items-center ">
        <Logo/>
        <div className="flex space-x-30 py-2">
          <h1>Home</h1>
          <h1>Profile</h1>  
          <h1>Post for sale</h1>
          <h1>Support</h1>
        </div>
      </div>

    </nav>
  )
}
export default Navbar