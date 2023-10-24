import {
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetAllCategoryQuery } from "~/redux/api/category";
import { AddPostMangerView } from '..';
 

type Props = {};

const AddPostShowManagement = (props: Props) => {
	const [parents, setParents] = useState<any>([]);
	const {
		 
		onClose: onCloseActionCreatePost,
	} = useDisclosure();  

	const { data: categories, isLoading } = useGetAllCategoryQuery({
		_limit: 20,
		_page: 1,
		_parent: true,
		_sort: "created_at",
		_order: "desc",
		_type: "category_post",
	});

	useEffect(() => {
		if (categories) {
			const parentsFilter = categories?.data?.items?.map((category: any) => {
				return {
					label: category?.name,
					value: category?._id,
				};
			});

			setParents(parentsFilter);
		}
	}, [categories, isLoading]);

	 
	
	return (
		<> 
				<AddPostMangerView
					onClose={onCloseActionCreatePost}
					parents={parents}  />
			 
		</>
	);
};

export default AddPostShowManagement;


