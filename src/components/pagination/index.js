import { styled } from "@mui/system";
import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import service from "../../services";
import { ProductService } from "../../services/products";

const pageSize = 6;

const PaginationContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px 0px",
}));

export default function AppPagination({setProducts}) {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {

    ProductService.getProducts(pagination.from, pagination.to).then(p => {
      setPagination({ ...pagination, count: p.total });
      setProducts(p.data);
    });

    // service.getData({ from: pagination.from, to: pagination.to }).then((response) => {
    //     setPagination({ ...pagination, count: response.count });
    //     setProducts(response.data);
    // });
    //
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.from, pagination.to]);

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
      const to = (page - 1) * pageSize + pageSize;
      
      setPagination({ ...pagination, from: from, to: to });
  };

  return (
    <PaginationContainer>
      <Pagination
        count={Math.ceil(pagination.count / pageSize)}
              color="primary"
              onChange={handlePageChange}
      />
    </PaginationContainer>
  );
}
