type LoadingIconProps = {
	text?: string;
};

const LoadingIcon: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
				<p>{text}</p>
			</div>
		</div>
	);
};

export default LoadingIcon;
