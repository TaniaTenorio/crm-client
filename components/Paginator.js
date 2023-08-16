import * as React from 'react'

const Paginator = ({
  actualPage,
  totalClients,
  limit,
  handlePrevButton,
  handleNextButton,
}) => {
  const [pages, setPages] = React.useState(
    Math.ceil(Number(totalClients) / limit)
  )
  const prevButton =
    actualPage > 1 ? (
      <button
        type='button'
        className='mr-2 bg-blue-600 p-2 rounded'
        onClick={handlePrevButton}
      >
        &laquo; Prev
      </button>
    ) : (
      ''
    )
  const nextButton =
    actualPage !== pages ? (
      <button
        type='button'
        className='ml-2 bg-blue-600 p-2 rounded'
        onClick={handleNextButton}
      >
        Next &raquo;
      </button>
    ) : (
      ''
    )

  return (
    <div className='mt-5 flex justify-center'>
      {prevButton}
      {nextButton}
    </div>
  )
}

export default Paginator
