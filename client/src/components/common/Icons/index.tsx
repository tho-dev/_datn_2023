import { Icon } from "@chakra-ui/react";

export const SearchIcon = ({ size = 46, strokeWidth = 2, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16z" />
		<path d="m21 21-4.35-4.35" />
	</Icon>
);

export const ArrowRightUpIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M9.5 5.5h9v9" />
		<path d="M5.772 18.228 18.5 5.5" />
	</Icon>
);

export const ArrowRightIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M21 12H3" />
		<path d="m15 6 6 6-6 6" />
	</Icon>
);

export const MoneyIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M2 6.5h20v12H2v-12Z" />
		<path
			d="M2 10.5a4 4 0 0 0 4-4H2v4Z"
			clipRule="evenodd"
		/>
		<path
			d="M2 14.5a4 4 0 0 1 4 4H2v-4Z"
			clipRule="evenodd"
		/>
		<path
			d="M22 14.5v4h-4a4 4 0 0 1 4-4Z"
			clipRule="evenodd"
		/>
		<path
			d="M22 10.5a4 4 0 0 1-4-4h4v4Z"
			clipRule="evenodd"
		/>
		<path d="M12 15.5c1.38 0 2.5-1.343 2.5-3s-1.12-3-2.5-3-2.5 1.343-2.5 3 1.12 3 2.5 3Z" />
	</Icon>
);

export const WaletIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M8.991 5.984 15.892 2 18.2 5.994l-9.208-.01Z"
			clipRule="evenodd"
		/>
		<path d="M2 7a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Z" />
		<path d="M17.625 16.5H22v-5h-4.375C16.175 11.5 15 12.62 15 14s1.175 2.5 2.625 2.5Z" />
		<path d="M22 8.25v12" />
	</Icon>
);

export const GlobalIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
		<path d="m2.5 12.5 5.5 2L7 18l1 3" />
		<path d="m17 20.5-.5-2.5-2.5-1v-3.5l3-1 4.5.5" />
		<path d="M19 5.5 18.5 7l-3.5.5v3l2.5-1h2l2 1" />
		<path d="m2.5 10.5 2.5-2L7.5 8l2-3-1-2" />
	</Icon>
);

export const QRCodeIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M15 12v3" />
		<path d="M12 3v3" />
		<path d="M18 12v3" />
		<path d="M12 18h9" />
		<path d="M18 21h3" />
		<path d="M6 12h3" />
		<path d="M6 6.011 6.01 6" />
		<path d="m12 12.011.01-.011" />
		<path d="M3 12.011 3.01 12" />
		<path d="M12 9.011 12.01 9" />
		<path d="m12 15.011.01-.011" />
		<path d="m15 21.011.01-.011" />
		<path d="m12 21.011.01-.011" />
		<path d="m21 12.011.01-.011" />
		<path d="m21 15.011.01-.011" />
		<path d="M18 6.011 18.01 6" />
		<path d="M9 3.6v4.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6Z" />
		<path d="M21 3.6v4.8a.6.6 0 0 1-.6.6h-4.8a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6Z" />
		<path d="M6 18.011 6.01 18" />
		<path d="M9 15.6v4.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6v-4.8a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6Z" />
	</Icon>
);

export const BounceRightIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M19 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
		<path d="M4 15.5c3-1 5.5-.5 8 4.5.5-3 2-7.5 3.5-10" />
	</Icon>
);

export const CheckIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M11.607 2.342a.6.6 0 0 1 .787 0l1.948 1.693a.6.6 0 0 0 .446.145l2.57-.224a.6.6 0 0 1 .638.462l.58 2.515a.6.6 0 0 0 .276.379l2.212 1.33a.6.6 0 0 1 .243.748L20.3 11.766a.6.6 0 0 0 0 .469l1.007 2.376a.6.6 0 0 1-.243.748l-2.212 1.33a.6.6 0 0 0-.275.38l-.581 2.514a.6.6 0 0 1-.637.462l-2.571-.224a.6.6 0 0 0-.446.145l-1.948 1.693a.6.6 0 0 1-.787 0l-1.949-1.693a.6.6 0 0 0-.445-.145l-2.571.224a.6.6 0 0 1-.637-.462l-.581-2.515a.6.6 0 0 0-.276-.379l-2.212-1.33a.6.6 0 0 1-.243-.748l1.008-2.376a.6.6 0 0 0 0-.469L2.693 9.39a.6.6 0 0 1 .243-.748l2.212-1.33a.6.6 0 0 0 .276-.38l.581-2.514a.6.6 0 0 1 .637-.462l2.57.224a.6.6 0 0 0 .446-.145l1.949-1.693Z" />
		<path d="m9 13 2 2 5-5" />
	</Icon>
);

export const ShieldIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m8.5 11.5 3 3 5-5" />
		<path d="M5 17.998 3.13 4.911a.996.996 0 0 1 .774-1.114l7.662-1.703a2 2 0 0 1 .868 0l7.662 1.703c.51.114.847.596.773 1.114L19 17.998c-.07.495-.5 3.5-7 3.5s-6.928-3.005-7-3.5Z" />
	</Icon>
);

export const TrunkIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M8 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="M18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="M10.05 17H15V6.6a.6.6 0 0 0-.6-.6H1" />
		<path d="M5.65 17H3.6a.6.6 0 0 1-.6-.6v-4.9" />
		<path d="M2 9h4" />
		<path d="M15 9h5.61a.6.6 0 0 1 .548.356l1.79 4.028a.6.6 0 0 1 .052.243V16.4a.6.6 0 0 1-.6.6h-1.9" />
		<path d="M15 17h1" />
	</Icon>
);

export const ScanQRCodeIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M9 6.6v1.8a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h1.8a.6.6 0 0 1 .6.6Z" />
		<path d="M6 12h3" />
		<path d="M15 12v3" />
		<path d="M12 18h3" />
		<path d="m12 12.011.01-.011" />
		<path d="m18 12.011.01-.011" />
		<path d="m12 15.011.01-.011" />
		<path d="m18 15.011.01-.011" />
		<path d="m18 18.011.01-.011" />
		<path d="M12 9.011 12.01 9" />
		<path d="M12 6.011 12.01 6" />
		<path d="M9 15.6v1.8a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6v-1.8a.6.6 0 0 1 .6-.6h1.8a.6.6 0 0 1 .6.6Z" />
		<path d="M18 6.6v1.8a.6.6 0 0 1-.6.6h-1.8a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h1.8a.6.6 0 0 1 .6.6Z" />
		<path d="M18 3h3v3" />
		<path d="M18 21h3v-3" />
		<path d="M6 3H3v3" />
		<path d="M6 21H3v-3" />
	</Icon>
);

export const ShoppingIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m19.261 9.696 1.385 9A2 2 0 0 1 18.669 21H5.331a2 2 0 0 1-1.976-2.304l1.384-9A2 2 0 0 1 6.716 8h10.569a2 2 0 0 1 1.976 1.696Z" />
		<path d="M14 5a2 2 0 1 0-4 0" />
	</Icon>
);

export const InfoIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 11.5v5" />
		<path d="m12 7.511.01-.011" />
		<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
	</Icon>
);

export const FacebookIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z" />
		<path d="M11 21v-9c0-2.188.5-4 4-4" />
		<path d="M9 13h6" />
	</Icon>
);

export const YoutubeIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			fill={color}
			d="m14 12-3.5 2v-4l3.5 2Z"
		/>
		<path d="M2 12.706v-1.415c0-2.895 0-4.343.905-5.275.906-.931 2.332-.971 5.183-1.052 1.35-.038 2.73-.066 3.912-.066 1.181 0 2.561.028 3.912.066 2.851.08 4.277.121 5.182 1.052.906.932.906 2.38.906 5.275v1.415c0 2.895 0 4.343-.905 5.274-.906.932-2.331.972-5.183 1.053-1.35.038-2.73.066-3.912.066-1.181 0-2.561-.028-3.912-.066-2.851-.08-4.277-.121-5.183-1.053C2 17.05 2 15.601 2 12.706Z" />
	</Icon>
);

export const InstagramIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
		<path d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z" />
		<path d="m17.5 6.511.01-.011" />
	</Icon>
);

export const TiktokIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z" />
		<path d="M10 12a3 3 0 1 0 3 3V6c.333 1 1.6 3 4 3" />
	</Icon>
);

export const NavArrowLeflIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m15 6-6 6 6 6" />
	</Icon>
);

export const NavArrowRightIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m9 6 6 6-6 6" />
	</Icon>
);

export const CheckOneIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 22a9.97 9.97 0 0 0 7.071-2.929A9.97 9.97 0 0 0 22 12a9.969 9.969 0 0 0-2.929-7.071A9.969 9.969 0 0 0 12 2a9.969 9.969 0 0 0-7.071 2.929A9.969 9.969 0 0 0 2 12a9.969 9.969 0 0 0 2.929 7.071A9.969 9.969 0 0 0 12 22Z" />
		<path d="m8 12 3 3 6-6" />
	</Icon>
);

export const FilterIcon = ({ size = 33, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M4.8 15.6a.6.6 0 0 1 .6-.6H9a.6.6 0 1 1 0 1.2H5.4a.6.6 0 0 1-.6-.6Zm0-3.6a.6.6 0 0 1 .6-.6h8.4a.599.599 0 1 1 0 1.2H5.4a.6.6 0 0 1-.6-.6Zm0-3.6a.6.6 0 0 1 .6-.6h13.2a.6.6 0 1 1 0 1.2H5.4a.6.6 0 0 1-.6-.6Z" />
	</Icon>
);

export const CloseSmallIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m7 7 10 10" />
		<path d="M7 17 17 7" />
	</Icon>
);

export const PhoneIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M6.567 3.66a.848.848 0 0 0-1.269-.078L4.006 4.875c-.604.605-.826 1.462-.563 2.213a21.96 21.96 0 0 0 5.21 8.26 21.961 21.961 0 0 0 8.26 5.21c.752.264 1.608.041 2.213-.563l1.292-1.292a.85.85 0 0 0-.078-1.269l-2.884-2.242a.849.849 0 0 0-.725-.153l-2.738.684a2.181 2.181 0 0 1-2.07-.574l-3.07-3.071a2.181 2.181 0 0 1-.576-2.071l.685-2.738a.848.848 0 0 0-.152-.725L6.567 3.66ZM4.355 2.64a2.181 2.181 0 0 1 3.265.203l2.242 2.882a2.18 2.18 0 0 1 .394 1.868l-.684 2.737a.847.847 0 0 0 .223.804l3.07 3.071a.848.848 0 0 0 .806.223l2.736-.684a2.181 2.181 0 0 1 1.868.394l2.882 2.242a2.18 2.18 0 0 1 .204 3.264l-1.293 1.293c-.925.925-2.307 1.33-3.596.877A23.292 23.292 0 0 1 7.71 16.29a23.292 23.292 0 0 1-5.525-8.761c-.453-1.288-.047-2.671.878-3.596L4.356 2.64h-.001Z" />
	</Icon>
);

export const MapIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M16.999 13.128c-.629 1.275-1.48 2.544-2.352 3.684A37.81 37.81 0 0 1 12 19.896a37.91 37.91 0 0 1-2.647-3.084c-.872-1.14-1.724-2.41-2.352-3.684C6.365 11.841 6 10.635 6 9.6a6 6 0 0 1 12 0c0 1.035-.366 2.24-1.001 3.528Zm-5 8.472s7.2-6.823 7.2-12a7.2 7.2 0 0 0-14.4 0c0 5.177 7.2 12 7.2 12Z" />
		<path d="M12 12a2.4 2.4 0 1 1 0-4.801A2.4 2.4 0 0 1 12 12Zm0 1.2A3.6 3.6 0 1 0 12 6a3.6 3.6 0 0 0 0 7.2Z" />
	</Icon>
);

export const PhonesIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 4.2a6 6 0 0 0-6 6v1.2h1.2a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-1.2 1.2H6a1.2 1.2 0 0 1-1.2-1.2v-6a7.2 7.2 0 0 1 14.4 0v7.2a3 3 0 0 1-3 3h-2.561a1.2 1.2 0 0 1-1.04.6h-1.2a1.2 1.2 0 1 1 0-2.4h1.2a1.2 1.2 0 0 1 1.04.6h2.56a1.8 1.8 0 0 0 1.8-1.8h-1.2a1.2 1.2 0 0 1-1.2-1.2v-3.6a1.2 1.2 0 0 1 1.2-1.2H18v-1.2a5.999 5.999 0 0 0-6-6Z" />
	</Icon>
);

export const NewIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M19.8 6a.6.6 0 0 1 .6.6v10.8a.6.6 0 0 1-.6.6H4.2a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h15.6ZM4.2 4.8a1.8 1.8 0 0 0-1.8 1.8v10.8a1.8 1.8 0 0 0 1.8 1.8h15.6a1.8 1.8 0 0 0 1.8-1.8V6.6a1.8 1.8 0 0 0-1.8-1.8H4.2Z" />
		<path d="M10.8 9a.6.6 0 0 1 .6-.6h6a.6.6 0 0 1 0 1.2h-6a.6.6 0 0 1-.6-.6ZM9.007 7.975a.6.6 0 0 1 0 .85l-1.8 1.8a.6.6 0 0 1-.85 0l-.6-.6a.6.6 0 1 1 .85-.85l.175.176 1.375-1.376a.6.6 0 0 1 .85 0ZM10.8 13.8a.6.6 0 0 1 .6-.6h6a.6.6 0 1 1 0 1.2h-6a.6.6 0 0 1-.6-.6Zm-1.795-1.025a.6.6 0 0 1 0 .85l-1.8 1.8a.6.6 0 0 1-.85 0l-.6-.6a.6.6 0 1 1 .85-.85l.175.177 1.375-1.377a.6.6 0 0 1 .85 0Z" />
	</Icon>
);

export const CartIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			fill={color}
			d="M19.5 22a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
		/>
		<path
			fill={color}
			d="M9.5 22a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
		/>
		<path d="M5 4c-.167-.667-1-2-3-2m3 2h17l-2 11H7L5 4Z" />
		<path d="M20 15H5.23c-1.784 0-2.73.781-2.73 2 0 1.219.946 2 2.73 2H19.5" />
	</Icon>
);

export const UserIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M5 20v-1a7 7 0 1 1 14 0v1" />
		<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
	</Icon>
);

export const ExampleIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M6 17.507H2v-13.5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v13.5h-4" />
		<path d="m12 16-5 5h10l-5-5Z" />
	</Icon>
);

export const ArrowLeftCirleIcon = (props: any) => (
	<Icon
		fill="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M16.828 11.736a27.683 27.683 0 0 1-.198-.019 9.873 9.873 0 0 0-.83-.057 813.608 813.608 0 0 0-4.187-.037 850.334 850.334 0 0 1-3.131-.025 1.463 1.463 0 0 1-.185-.019l-.041-.006.053-.057c.06-.066.11-.12.162-.172a10.121 10.121 0 0 0 1.819-2.54l.015-.028a1.21 1.21 0 0 0 .109-.257.353.353 0 0 0-.01-.16.619.619 0 0 1-.013-.062l-.005-.042-.042.008a.718.718 0 0 1-.074.01.304.304 0 0 0-.178.051c-.058.055-.11.116-.155.181-.035.05-.073.097-.115.141-.338.346-.676.69-1.016 1.035-.436.443-.871.887-1.305 1.332a4.047 4.047 0 0 0-.522.612c-.218.339-.185.62.111.943.284.309.582.643.91 1.023.24.276.477.554.714.832.257.302.515.603.774.903.1.12.215.226.345.313a.32.32 0 0 0 .16.039.229.229 0 0 0 .15-.044.323.323 0 0 0 .057-.313 2.116 2.116 0 0 0-.248-.361l-.062-.08-.896-1.152-1.043-1.344a.87.87 0 0 1-.076-.127l-.016-.03.566.028c.46.023.895.046 1.335.063.936.035 2.303.07 3.625.104 1.138.028 2.212.056 3.002.083.154.004.31-.007.462-.033.233-.037.351-.157.35-.356 0-.223-.132-.357-.37-.38Z" />
		<path d="M2.938 9.451c-.832 3.27-.103 6.155 2.167 8.575l.18.186c1.22 1.22 2.738 1.972 3.942 2.496.517.226 3.167.5 3.885.393 4.262-.636 7.066-3.04 8.043-7.062.187-.788.28-1.595.277-2.405.005-1.907-.798-4.124-2.454-5.784-.17-.141-.34-.287-.505-.429-.356-.306-.724-.623-1.11-.894-2.943-2.071-6-2.083-9.088-.984-2.796.993-4.591 2.982-5.337 5.908Zm5.349-4.93c2.709-1.125 5.427-1.324 8.078.362.485.309 1.777 1.353 1.98 1.51l.013.01.011.012c1.034 1.096 2.219 3.102 2.192 5.163a10.516 10.516 0 0 1-.355 2.61c-.673 2.448-2.283 4.232-4.921 5.452-2.683 1.284-6.53-.014-7.553-.69a11.952 11.952 0 0 1-2.926-2.844c-1.263-1.788-1.546-4.358-.868-6.707a7.617 7.617 0 0 1 4.349-4.878Z" />
	</Icon>
);

export const CodeIcon = (props: any) => (
	<Icon
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={1.5}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M13.5 6 10 18.5" />
		<path d="M6.5 8.5 3 12l3.5 3.5" />
		<path d="M17.5 8.5 21 12l-3.5 3.5" />
	</Icon>
);


export const GoogleIcon = (props: any) => (
	<Icon
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g
			id="SVGRepo_bgCarrier"
			strokeWidth="0"
		></g>
		<g
			id="SVGRepo_tracerCarrier"
			strokeLinecap="round"
			strokeLinejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			{" "}
			<path
				d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z"
				fill="#4285F4"
			></path>{" "}
			<path
				d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z"
				fill="#34A853"
			></path>{" "}
			<path
				d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z"
				fill="#FBBC05"
			></path>{" "}
			<path
				d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z"
				fill="#EB4335"
			></path>{" "}
		</g>
	</Icon>
);

export const FbIcon = (props: any) => (
	<Icon
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g
			id="SVGRepo_bgCarrier"
			strokeWidth="0"
		></g>
		<g
			id="SVGRepo_tracerCarrier"
			strokeLinecap="round"
			strokeLinejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			{" "}
			<circle
				cx="24"
				cy="24"
				r="20"
				fill="#3B5998"
			></circle>{" "}
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M29.315 16.9578C28.6917 16.8331 27.8498 16.74 27.3204 16.74C25.8867 16.74 25.7936 17.3633 25.7936 18.3607V20.1361H29.3774L29.065 23.8137H25.7936V35H21.3063V23.8137H19V20.1361H21.3063V17.8613C21.3063 14.7453 22.7708 13 26.4477 13C27.7252 13 28.6602 13.187 29.8753 13.4363L29.315 16.9578Z"
				fill="white"
			></path>{" "}
		</g>
	</Icon>
);


