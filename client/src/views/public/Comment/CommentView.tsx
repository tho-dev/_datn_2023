import { Box, Heading, Text } from "@chakra-ui/layout";
import Assess from './components/Assess';
import Filter from './components/Filter';
import Client from "./components/Client";
import { Button, useDisclosure } from "@chakra-ui/react";
import DialogThinkPro from "~/components/DialogThinkPro";
import AddComment from "./components/AddComment";


const CommentView = () => {
	const { isOpen: isOpenDialog, onOpen: onOpenDialog, onClose: onCloseDialog } = useDisclosure();

	return (
		<>
			<Box my="6">
				<Box
					bg="white"
					w="100%"
					borderRadius="2xl"
					py={{
						sm: "1",
						lg: "1",
					}}
					px={{
						sm: "10",
						md: "10",
						lg: "15",
						xl: "15",
					}}
				>
					<Text
						fontSize={'2xl'}
						fontWeight={'bold'}
					>
						Khánh hàng đánh giá
					</Text>
					<Assess />
					<Filter />
					<Client />
					<Client />
					<Client />

					<Button mx={"auto"}
					my={10}
						px="7"
						lineHeight="2"
						bgColor="bg.red"
						onClick={onOpenDialog}
						fontSize={20}
					>
						Viết nhận xét
					</Button>
				</Box>
				<DialogThinkPro
					isOpen={isOpenDialog}
					onClose={onCloseDialog}
					isCentered
				>
					<AddComment onClose={onCloseDialog} />
				</DialogThinkPro>
			</Box>
		</>
	);
}

export default CommentView