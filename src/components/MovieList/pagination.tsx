'use client'

import ReactPaginate from 'react-paginate'

export const Pagination = ({
  pageNumber,
  totalPages,
  initialGenres,
}: {
  pageNumber: number
  totalPages: number
  initialGenres: number[]
}) => {
  const totalPagesAux = Number(totalPages) > 500 ? 500 : totalPages

  const handlePageClick = (selectedItem: { selected: number }) => {
    const page = selectedItem.selected + 1
    window.location.href = `/?page=${page}${initialGenres
      .map((genre) => `&genre=${genre}`)
      .join('')}`
  }
  return (
    <ReactPaginate
      breakLabel="..."
      containerClassName="flex gap-2 font-bold text-base justify-center text-[#5C16C5]"
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageCount={totalPagesAux}
      pageRangeDisplayed={2}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      disabledClassName="hidden"
      forcePage={pageNumber - 1}
    />
  )
}
