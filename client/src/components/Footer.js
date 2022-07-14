const Footer = () => {
  return (
    <div className='h-20 text-center flex flex-col justify-center items-center bottom-0'>
      <div className='text-2xl'>
        &copy;UCI team A.I.tivity, {new Date().getFullYear()}
      </div>
      <div>
        Made by <code>Ariel Han, Jasmine Jeong, Ulia Zaman, and Ray An.</code>
      </div>
    </div>
  )
}

export default Footer
