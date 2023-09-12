import { InputGroup } from "@chakra-ui/input";
import React, { useRef } from "react";

type FileUploadProps = {
	register: any;
	accept?: any;
	multiple?: any;
	children?: any;
};

const FileUploadThinkPro = (props: FileUploadProps) => {
	const { register, accept, multiple, children } = props;
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { ref, ...rest } = register as { ref: (instance: HTMLInputElement | null) => void };

	const handleClick = () => inputRef.current?.click();

	return (
		<InputGroup onClick={handleClick}>
			<input
				type={"file"}
				multiple={multiple || false}
				hidden
				accept={accept}
				{...rest}
				ref={(e) => {
					ref(e);
					inputRef.current = e;
				}}
			/>
			<>{children}</>
		</InputGroup>
	);
};

export default FileUploadThinkPro;
