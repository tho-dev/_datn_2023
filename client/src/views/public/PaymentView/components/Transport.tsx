import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Flex,
  Box,
  Heading,
  Input,
  Button,
} from "@chakra-ui/react";
import { NavArrowRightIcon } from "~/components/common/Icons";
import DialogThinkPro from "~/components/DialogThinkPro";
import axios from "axios";

type Props = {
  isOpen: any;
  onOpen: any;
  onClose: any;
  handleChooseAdress: (data: any) => void;
};

const Transport = ({ isOpen, onOpen, onClose, handleChooseAdress }: Props) => {
  const [selectedProvince, setSelectedProvince] = useState({
    label: undefined,
    value: undefined,
  } as any);
  const [selectedDistrict, setSelectedDistrict] = useState({
    label: undefined,
    value: undefined,
  } as any);
  const [selectedWard, setSelectedWard] = useState({
    label: undefined,
    value: undefined,
  } as any);

  const [district, setDistrict] = useState<any>([]);
  const [provider, setProvider] = useState<any>([]);
  const [conscious, setConscious] = useState([]);
  const [districted, setDistricted] = useState([]);
  useEffect(() => {
    handleChooseAdress([
      selectedWard.value,
      selectedDistrict.value,
      selectedProvince.value,
    ]);
  }, [selectedWard, selectedDistrict, selectedProvince]);

  useEffect(() => {
    if (district.length == 0 || provider.length == 0) {
      axios.get("https://provinces.open-api.vn/api/").then(({ data }) => {
        setConscious(data);
        setSelectedProvince({ ...selectedProvince, label: "Tỉnh | Thành Phố" });
      });
    }
  }, []);

  const districtConsious = async (item: any) => {
    return await axios
      .get(`https://provinces.open-api.vn/api/p/${item.code}?depth=3`)
      .then(({ data }) => {
        setDistrict(data.districts);
        setDistricted(data.districts);
        setSelectedProvince({ ...selectedProvince, value: data.name });
        setSelectedDistrict({ ...selectedDistrict, label: "Quận | Huyện" });
        setConscious([]);
      });
  };
  const getDistrict = (item: any) => {
    setDistrict([]);
    setSelectedDistrict({ ...selectedDistrict, value: item.name });
    setSelectedWard({ ...selectedWard, label: "Phường | Xã" });
    setProvider(item?.wards);
  };
  const getProvider = (item: any) => {
    setSelectedWard({ ...selectedWard, value: item.name });
    setTimeout(() => {
      onClose();
    }, 1000);
  };
  const handleChooseConsious = () => {
    axios.get("https://provinces.open-api.vn/api/").then(({ data }) => {
      setConscious(data);
      setSelectedProvince({ ...selectedProvince, label: "Tỉnh | Thành Phố" });
    });
  };
  const handleChooseDistrict = () => {
    setConscious([]);
    setDistrict(districted);
  };
  const handleChooseProvider = () => {
    setDistrict([]);
    setProvider(provider);
  };
  return (
    <Box>
      <Flex>
        {/* Modal */}
        <DialogThinkPro
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          title={<Heading fontSize="xl">Chọn Tỉnh / Thành phố</Heading>}
        >
          <Box>
            <Flex justifyContent={"flex-start"} gap={2}>
              <Button
                bg="none"
                color="black"
                padding={0}
                onClick={handleChooseConsious}
              >
                {selectedProvince.value ?? selectedProvince.label}
              </Button>
              <Button
                bg="none"
                color="black"
                padding={0}
                onClick={handleChooseDistrict}
              >
                {selectedDistrict.value ?? selectedDistrict.label}
              </Button>
              <Button
                bg="none"
                color="black"
                padding={0}
                onClick={handleChooseProvider}
              >
                {selectedWard.value ?? selectedWard.label}
              </Button>
            </Flex>
          </Box>
          <Input placeholder={"Tìm kiếm ....."} />

          {conscious.length > 0 &&
            conscious?.map((item: any) => (
              <Box
                borderBottom={"1px soid #E6E8EA"}
                key={item.code}
                py={"16px"}
                as={"button"}
                display={"block"}
                onClick={() => districtConsious(item)}
              >
                {item.name}
              </Box>
            ))}
          {district.length > 0 &&
            district?.map((item: any) => (
              <Box
                borderBottom={"1px soid #E6E8EA"}
                key={item.code}
                py={"16px"}
                as={"button"}
                display={"block"}
                onClick={() => getDistrict(item)}
              >
                {item.name}
              </Box>
            ))}
          {provider.length > 0 &&
            provider?.map((item: any) => (
              <Box
                borderBottom={"1px soid #E6E8EA"}
                key={item.code}
                py={"16px"}
                as={"button"}
                display={"block"}
                onClick={() => getProvider(item)}
              >
                {item.name}
              </Box>
            ))}
        </DialogThinkPro>
      </Flex>
    </Box>
  );
};

export default Transport;
