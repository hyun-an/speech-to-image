import Footer from '../components/Footer'

const Story = ({ title }) => {
  return (
    <div className='bg-gray-900 hover:bg-gray-700 h-[13rem] w-[13rem] text-[20px] rounded-full flex text-white text-center justify-center items-center'>
      <div>{title}</div>
    </div>
  )
}

const Hero = () => {
  return (
    <div>
      <div className='grid h-[92vh] grid-cols-2'>
        <div className='flex text-6xl justify-center items-center '>
          <div className='w-[900px] pl-10 font-light'>
            <p>
              <strong>Easily</strong> create Short Stories with{' '}
              <code>the help of A.I.!</code>
            </p>
          </div>
        </div>
        <div className='flex flex-col text-4xl justify-center items-center'>
          <h1 className='font-light'>Choose Your Story!</h1>
          <div className='space-x-7 flex mt-10'>
            <a href='/main'>
              <Story title='The Mysterious Cave' />
            </a>
            <a href='/main-super'>
              <Story title='Superhero Superkid' />
            </a>
            <a href='/main-super'>
              <Story title='3rd Story' />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Hero
