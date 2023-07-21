import React from 'react'
import { Container, Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const PaginacionTablaUsuarios = ({index,setIndex}) => {
   
    
    
    const handleClickNext = () => {
    
        setIndex(index=index+1)
   }
   const handleClickPrev = () => {
    if(index == 1)
    return
    setIndex(index=index-1)
   }
    return (
    <Container>
    <Pagination>
        <PaginationItem>
            <PaginationLink
                onClick={handleClickPrev}
                href="#"
                previous
            />
        </PaginationItem>
        <PaginationItem>
            <PaginationLink
                onClick={handleClickNext}
                href="#"
                next
            />
        </PaginationItem>
    </Pagination>
</Container>
  )
}

export default PaginacionTablaUsuarios