import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import CheckPhone from "./components/CheckPhone";
import ListOrder from "./components/ListOrder";
import { useGetOrderByPhoneNumberMutation } from "~/redux/api/order";
import { useToast } from "@chakra-ui/react";

const HistoryOrderView = () => {
  const [checkPhone, setCheckPhone] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [dataOrder, setDataOrder] = useState([] as any);
  const [paginate, setPaginate] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [getOrderByPhoneNumber] = useGetOrderByPhoneNumberMutation();
  const toast = useToast();
  const [query, setQuery] = useState<any>({
    _page: 1,
    _limit: 6,
    _order: "desc",
    _sort: "created_at",
    search: "",
    phone_number: "",
  });

  const handleGetPhoneNumber = (phoneNumber: any) => {
    setPhoneNumber(phoneNumber);
  };
  useEffect(() => {
    if (phoneNumber) {
      setLoading(true);
      getOrderByPhoneNumber({ ...query, phone_number: phoneNumber })
        .unwrap()
        .then(({ data }) => {
          setLoading(false);
          setDataOrder(data?.items);
          setPaginate(data?.paginate);
        })
        .catch((error) => {
          toast({
            title: "Hệ thống",
            description: error.data.errors.message,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top-right",
          });
        });
    }
  }, [query]);

  return (
    <Box m="30px 0">
      {checkPhone ? (
        <>
          <CheckPhone
            setCheckPhone={setCheckPhone}
            handleGetPhoneNumber={handleGetPhoneNumber}
            setQuery={setQuery}
            loading={loading}
          />
        </>
      ) : (
        <ListOrder
          dataOrder={dataOrder}
          phoneNumber={phoneNumber}
          setQuery={setQuery}
          paginate={paginate}
          loading={loading}
        />
      )}
    </Box>
  );
};

export default HistoryOrderView;
