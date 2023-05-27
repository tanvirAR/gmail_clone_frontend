import React from 'react'
import SearchPageComponent from '../../../../../../Components/searchPage/SearchPage'
import { useRouter } from 'next/router'

export default function SearchPage() {
  const router = useRouter();

  const searchedQuery = router.query.searchedQuery?.toString();

  return (
    <SearchPageComponent searchedQuery={searchedQuery} />
  )
}
