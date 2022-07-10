const Navbar = ({ apiStatus }) => {
  return (
    <div className='flex w-full items-center text-2xl pt-3 pb-3 fixed backdrop-blur-md	'>
      <div className='pl-5'>
        <a href='/' className='tracking-widest text-gray-600'>
          <code>Home</code>
        </a>
      </div>
      <div className='ml-auto pr-5 text-gray-600'>
        <code>{apiStatus}</code>
      </div>
    </div>
  )
}

export default Navbar
