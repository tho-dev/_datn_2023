import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DialogThinkPro from "~/components/DialogThinkPro";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { closeModal } from "~/redux/slices/scanSlice";
import CreateBoxView from "./ActionCreateBox";
import { useGetStorageByIdProjectQuery } from "~/redux/api/product";
import { useGetDocumentByStorageQuery } from "~/redux/api/category";
import ActionBoxOld from "./ActionBoxOld";
import SideBarItem from "./components/SideBarItem";
import DetailScan from "./components/DetailScan";
import DefaultSetting from "./components/DefaultSetting";

type Props = {};

const DemandView = (props: Props) => {
  const toast = useToast();
  const { isLoading } = useAppSelector((state) => state.persistedReducer.scan);
  const [idStorage, setIdStorage] = useState<any>(2);
  const [idProject, setIdProject] = useState<any>(4);
  // call api
  const { data: dataDocumentByIdStorage } =
    useGetDocumentByStorageQuery(idStorage);
  const { data: dataStorageApi } = useGetStorageByIdProjectQuery(idProject, {
    skip: !idProject, // Chỉ gọi API khi idProject không phải null
  });
  console.log("dataDocumentByIdStorage", dataDocumentByIdStorage);
  console.log("dataStorageApi", dataStorageApi);

  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenBoxModal,
    onOpen: onOpenBoxModal,
    onClose: onCloseBoxModal,
  } = useDisclosure();

  const {
    isOpen: isOpenBoxModalOld,
    onOpen: onOpenBoxModalOld,
    onClose: onCloseBoxModalOld,
  } = useDisclosure();
  const {
    isOpen: isOpenBoxModalNew,
    onOpen: onOpenBoxModalNew,
    onClose: onCloseBoxModalNew,
  } = useDisclosure();

  useEffect(() => {
    if (isLoading) {
      onOpenBoxModal();
    }
  }, [isLoading]);

  const handleBox = () => {
    dispatch(closeModal());
    onCloseBoxModal();
    onOpenBoxModalOld();
  };
  const handleBoxNew = () => {
    dispatch(closeModal());
    onCloseBoxModal();
    onOpenBoxModalNew();
  };

  const handleOpenCollap = () => {};

  if (isLoading) {
    return (
      <>
        <DialogThinkPro
          isOpen={isOpenBoxModal}
          isCentered
          title={
            <Heading fontSize="16" textTransform="uppercase">
              Quét tài liệu
            </Heading>
          }
        >
          <Flex
            w="100%"
            justifyContent="center"
            alignItems="center"
            gap="4"
            p="4"
          >
            <Button onClick={handleBox}>Chọn hộp có sẵn</Button>
            <Button onClick={handleBoxNew}>Tạo hộp mới</Button>
          </Flex>
        </DialogThinkPro>
      </>
    );
  }

  return (
    <>
      <Flex p="2" mb="8" rounded="xl" h="100vh" flexDirection="column" gap="4">
        <Flex bgColor="bg.white" p="4" borderRadius="6">
          header
        </Flex>
        <Flex w="100%" gap="2" h="100%">
          <Flex w="75%" bgColor="bg.white " borderRadius="6">
            file pdf
          </Flex>
          <Flex
            w="25%"
            bgColor="bg.white"
            borderRadius="6"
            p="4"
            flexDirection="column"
          >
            <DetailScan
              dataDocument={dataStorageApi?.data}
              dataDocumentByIdStorage={dataDocumentByIdStorage?.data}
            />
          </Flex>
        </Flex>
        <DialogThinkPro
          isOpen={isOpenBoxModalOld}
          isCentered
          title={
            <Heading fontSize="16" textTransform="uppercase">
              Chọn hộp có sẵn
            </Heading>
          }
        >
          <ActionBoxOld
            onClose={onCloseBoxModalOld}
            dataStorage={dataStorageApi?.data}
          />
        </DialogThinkPro>
        <DialogThinkPro
          isOpen={isOpenBoxModalNew}
          isCentered
          title={
            <Heading fontSize="16" textTransform="uppercase">
              Tạo mới hộp
            </Heading>
          }
        >
          <CreateBoxView
            onClose={onCloseBoxModalNew}
            dataDocument={dataDocumentByIdStorage?.data}
          />
        </DialogThinkPro>
      </Flex>
      {/* Form */}
    </>
  );
};

export default DemandView;
