const FinalPage = ({ listOfLinks, listOfText, wordsToBold }) => {
  console.log('from finalpage links' + listOfLinks)
  console.log('from finalpage text' + listOfText)
  return (
    <div className='h-screen'>
      <h1 className='text-5xl font-light text-center pb-10'>My Story</h1>
      <div className='grid grid-cols-2'>
        <div id='story text' className='flex justify-center items-center'>
          <div>
            {listOfText.map((item, index) => (
              <p
                key={index}
                className='text-[28px] p-4'
                id={`sentence_${index}`}
                dangerouslySetInnerHTML={{ __html: listOfText[index] }}
              ></p>
            ))}
          </div>
        </div>
        <div id='images' className='flex justify-center items-center'>
          <div className='space-y-5'>
            <div className='flex space-x-5'>
              <img src={listOfLinks[0]} alt='img' height={290} width={290} />
              <img src={listOfLinks[1]} alt='img' height={290} width={290} />
            </div>
            <div className='flex space-x-5'>
              <img src={listOfLinks[2]} alt='img' height={290} width={290} />
              <img src={listOfLinks[3]} alt='img' height={290} width={290} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalPage
