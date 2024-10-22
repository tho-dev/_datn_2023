import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DialogThinkPro from "~/components/DialogThinkPro";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import {
  closeModal,
  createDocument,
  createDocumentView,
  openModal,
} from "~/redux/slices/scanSlice";
import CreateBoxView from "./ActionCreateBox";
import { useGetStorageByIdProjectQuery } from "~/redux/api/product";
import {
  useGetAllDocumentQuery,
  useGetDocumentByIdQuery,
  useGetDocumentByStorageQuery,
} from "~/redux/api/category";
import ActionBoxOld from "./ActionBoxOld";
import SideBarItem from "./components/SideBarItem";
import DetailScan from "./components/DetailScan";
import ScanView from "./components/ScanView";
import { useLocation, useNavigate } from "react-router-dom";
import {
  convertBlobUrlToBase64,
  countPdfPages,
  replaceCounter,
} from "~/utils/fc";
import LoadingPolytech from "~/components/LoadingPolytech";
import { useCreateFileMutation } from "~/redux/api/demand";

type Props = {};

const DemandView = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [idDocument, setIdDocument] = useState<any>(null);
  const { isLoading, box, documentView } = useAppSelector(
    (state) => state.persistedReducer.scan
  );
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // call api
  const { data: documents } = useGetAllDocumentQuery("");
  const { data: dataDocument, isLoading: loadingDocument } =
    useGetDocumentByIdQuery(idDocument, {
      skip: !idDocument,
    });
  const [createFile, { isLoading: isLoadingCreateFile }] =
    useCreateFileMutation();

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

  useEffect(() => {
    if (idDocument) {
      dispatch(createDocument(dataDocument?.data));
      dispatch(
        createDocumentView({
          numberFile: 1,
          minimumDigits: dataDocument?.data.minimumDigits,
          nameFile: dataDocument?.data.fileName,
          fullName: replaceCounter(
            dataDocument?.data?.fileName,
            dataDocument?.data?.numberFile | 1,
            dataDocument?.data?.minimumDigits
          ),
        })
      );
    }
  }, [idDocument, dataDocument]);

  const handleBox = () => {
    onCloseBoxModal();
    onOpenBoxModalOld();
  };

  const handleBoxNew = () => {
    onCloseBoxModal();
    onOpenBoxModalNew();
  };

  const handleReturnDashboard = () => {
    navigate("/admin");
    dispatch(openModal());
    onCloseBoxModal();
  };

  const handleReturnBox = () => {
    dispatch(openModal());
    onOpenBoxModal();
  };

  const handleChangeSocket = (value: any) => {
    setSocket(value);
  };

  const handleSubmit = async (pdfFile: any) => {
    try {
      const pageCount = await countPdfPages(pdfFile);
      const base64Pdf: any = await convertBlobUrlToBase64(pdfFile);
      const resultBase64 = base64Pdf.replace(
        "data:application/pdf;base64,",
        ""
      );
      const dataFinal = {
        boxId: box?.id,
        name: documentView?.fullName,
        base64: resultBase64,
        fileExtention: "pdf",
        pagesCount: pageCount,
      };
      const resuilt = await createFile(dataFinal);
      console.log(resuilt);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeIdDocument = (value: any) => {
    setIdDocument(value);
  };

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
          onClose={handleReturnDashboard}
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
        <DialogThinkPro
          isOpen={isOpenBoxModalOld}
          isCentered
          title={
            <Heading fontSize="16" textTransform="uppercase">
              Chọn hộp có sẵn
            </Heading>
          }
          onClose={() => {
            handleReturnBox();
            onCloseBoxModalOld();
          }}
        >
          <ActionBoxOld
            onClose={onCloseBoxModalOld}
            dataDocuments={documents?.data}
            handleReturnBox={handleReturnBox}
            handleChangeIdDocument={handleChangeIdDocument}
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
          onClose={() => {
            handleReturnBox();
            onCloseBoxModalNew();
          }}
        >
          <CreateBoxView
            onClose={onCloseBoxModalNew}
            dataDocument={documents?.data}
            handleReturnBox={handleReturnBox}
          />
        </DialogThinkPro>
      </>
    );
  }
  if (loadingDocument || isLoadingCreateFile) {
    return <LoadingPolytech />;
  }
  return (
    <>
      <Flex p="4" rounded="xl" h="100vh" flexDirection="column" gap="4">
        <Flex w="100%" gap="2" h="100%">
          <Flex w="75%" borderRadius="6">
            <ScanView
              socket={socket}
              handleChangeSocket={handleChangeSocket}
              handleSubmit={handleSubmit}
            />
          </Flex>
          <Flex
            w="25%"
            bgColor="bg.white"
            borderRadius="6"
            p="4"
            flexDirection="column"
            h="100%"
          >
            <DetailScan />
          </Flex>
        </Flex>
      </Flex>
      {/* Form */}
    </>
  );
};

export default DemandView;
