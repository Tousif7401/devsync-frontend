import { useCallback, useEffect, useMemo, useRef, useState, memo, ReactNode, CSSProperties } from 'react';
import './LogoLoop.css';

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

// Global tooltip state
let globalTooltipState: { title: string; x: number; y: number; visible: boolean } | null = null;
const tooltipListeners = new Set<() => void>();

const setGlobalTooltip = (title: string | null, x: number, y: number) => {
	if (title) {
		globalTooltipState = { title, x, y, visible: true };
	} else {
		globalTooltipState = null;
	}
	tooltipListeners.forEach(listener => listener());
};

const GlobalTooltip = () => {
	const [tooltip, setTooltip] = useState(globalTooltipState);

	useEffect(() => {
		const listener = () => setTooltip(globalTooltipState);
		tooltipListeners.add(listener);
		return () => {
			tooltipListeners.delete(listener);
		};
	}, []);

	if (!tooltip?.visible) return null;

	return (
		<div
			style={{
					position: 'fixed',
					left: `${tooltip.x}px`,
					top: `${tooltip.y - 45}px`,
					transform: 'translateX(-50%)',
					padding: '6px 10px',
					backgroundColor: 'black',
					color: 'white',
					fontSize: '12px',
					fontWeight: '600',
					borderRadius: '6px',
					whiteSpace: 'nowrap',
					zIndex: 99999,
					pointerEvents: 'none',
					boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
			}}
		>
			{tooltip.title}
		</div>
	);
};

interface LogoItemProps {
	item: any;
	id?: string;
	renderItem?: (item: any, id: string) => ReactNode;
}

const LogoItem = ({ item, id, renderItem }: LogoItemProps) => {
	const itemRef = useRef<HTMLLIElement | null>(null);
	const isNodeItem = 'node' in item;

	const handleMouseEnter = useCallback(() => {
		if (!item.title) return;
		const rect = itemRef.current?.getBoundingClientRect();
		if (rect) {
			setGlobalTooltip(item.title, rect.left + rect.width / 2, rect.top);
		}
	}, [item.title]);

	const handleMouseLeave = useCallback(() => {
		setGlobalTooltip(null, 0, 0);
	}, []);

	if (renderItem) {
		return (
			<li className="logoloop__item" role="listitem">
				{renderItem(item, id || '')}
			</li>
		);
	}

	const content = isNodeItem ? (
		<span className="logoloop__node">
			{item.node}
		</span>
	) : (
		<img
			src={item.src}
			srcSet={item.srcSet}
			sizes={item.sizes}
			width={item.width}
			height={item.height}
			alt={item.alt ?? ''}
			title={item.title}
			loading="lazy"
			decoding="async"
			draggable={false}
		/>
	);

	const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
	const itemContent = item.href ? (
		<a
			className="logoloop__link"
			href={item.href}
			aria-label={itemAriaLabel || 'logo link'}
			target="_blank"
			rel="noreferrer noopener"
		>
			{content}
		</a>
	) : (
		content
	);

	return (
		<li
			ref={itemRef}
			className="logoloop__item"
			id={id}
			role="listitem"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{itemContent}
		</li>
	);
};

export interface LogoLoopProps {
	logos: Array<{ node?: ReactNode; src?: string; srcSet?: string; sizes?: string; width?: number; height?: number; alt?: string; title?: string; ariaLabel?: string; href?: string; useIconLogo?: boolean; iconSrc?: string; [key: string]: any }>;
	speed?: number;
	direction?: 'left' | 'right' | 'up' | 'down';
	width?: number | string;
	logoHeight?: number;
	gap?: number;
	pauseOnHover?: boolean;
	hoverSpeed?: number;
	fadeOut?: boolean;
	fadeOutColor?: string;
	scaleOnHover?: boolean;
	renderItem?: (item: any, id: string) => ReactNode;
	ariaLabel?: string;
	className?: string;
	style?: CSSProperties;
	forcerestart?: number;
}

export const LogoLoop = memo<LogoLoopProps>(
	({
		logos,
		speed = 120,
		direction = 'left',
		width = '100%',
		logoHeight = 28,
		gap = 32,
		pauseOnHover,
		hoverSpeed,
		fadeOut = false,
		fadeOutColor,
		scaleOnHover = false,
		renderItem,
		ariaLabel = 'Partner logos',
		className,
		style,
		forcerestart
	}: LogoLoopProps) => {
		return (
			<InnerLogoLoop
				logos={logos}
				speed={speed}
				direction={direction}
				width={width}
				logoHeight={logoHeight}
				gap={gap}
				pauseOnHover={pauseOnHover}
				hoverSpeed={hoverSpeed}
				fadeOut={fadeOut}
				fadeOutColor={fadeOutColor}
				scaleOnHover={scaleOnHover}
				renderItem={renderItem}
				ariaLabel={ariaLabel}
				className={className}
				style={style}
				forcerestart={forcerestart}
			/>
		);
	}
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;

interface InnerLogoLoopProps {
	logos: Array<{ node?: ReactNode; src?: string; srcSet?: string; sizes?: string; width?: number; height?: number; alt?: string; title?: string; ariaLabel?: string; href?: string; useIconLogo?: boolean; iconSrc?: string; [key: string]: any }>;
	speed?: number;
	direction?: 'left' | 'right' | 'up' | 'down';
	width?: number | string;
	logoHeight?: number;
	gap?: number;
	pauseOnHover?: boolean;
	hoverSpeed?: number;
	fadeOut?: boolean;
	fadeOutColor?: string;
	scaleOnHover?: boolean;
	renderItem?: (item: any, id: string) => ReactNode;
	ariaLabel?: string;
	className?: string;
	style?: CSSProperties;
	forcerestart?: number;
}

const toCssLength = (value: number | string | undefined): string | undefined => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const useResizeObserver = (callback: () => void, elements: React.RefObject<HTMLElement | null>[], dependencies: any[]) => {
	useEffect(() => {
		if (!window.ResizeObserver) {
			const handleResize = () => callback();
			window.addEventListener('resize', handleResize);
			callback();
			return () => window.removeEventListener('resize', handleResize);
		}
		const observers = elements.map(ref => {
			if (!ref.current) return null;
			const observer = new ResizeObserver(callback);
			observer.observe(ref.current);
			return observer;
		});
		callback();
		return () => {
			observers.forEach(observer => observer?.disconnect());
		};
	}, [callback, elements, dependencies]);
};

const useImageLoader = (seqRef: React.RefObject<HTMLUListElement | null>, onLoad: () => void, dependencies: any[]) => {
	useEffect(() => {
		const images = seqRef.current?.querySelectorAll('img') ?? [];
		if (images.length === 0) {
			onLoad();
			return;
		}
		let remainingImages = images.length;
		const handleImageLoad = () => {
			remainingImages -= 1;
			if (remainingImages === 0) onLoad();
		};
		images.forEach(img => {
			const htmlImg = img;
			if (htmlImg.complete) {
				handleImageLoad();
			} else {
				htmlImg.addEventListener('load', handleImageLoad, { once: true });
				htmlImg.addEventListener('error', handleImageLoad, { once: true });
			}
		});
		return () => {
			images.forEach(img => {
				img.removeEventListener('load', handleImageLoad);
				img.removeEventListener('error', handleImageLoad);
			});
		};
	}, [onLoad, seqRef, dependencies]);
};

const InnerLogoLoop: React.FC<InnerLogoLoopProps> = memo(({
	logos,
		speed = 120,
		direction = 'left',
		width = '100%',
		logoHeight = 28,
		gap = 32,
		pauseOnHover,
		hoverSpeed,
		fadeOut = false,
		fadeOutColor,
		scaleOnHover = false,
		renderItem,
		ariaLabel = 'Partner logos',
		className,
		style
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const trackRef = useRef<HTMLDivElement | null>(null);
	const seqRef = useRef<HTMLUListElement | null>(null);

	const [seqWidth, setSeqWidth] = useState(0);
	const [seqHeight, setSeqHeight] = useState(0);
	const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
	const [isHovered, setIsHovered] = useState(false);
	const [dimensionsReady, setDimensionsReady] = useState(false);

	const effectiveHoverSpeed = useMemo(() => {
		if (hoverSpeed !== undefined) return hoverSpeed;
		if (pauseOnHover === true) return 0;
		if (pauseOnHover === false) return undefined;
		return 0;
	}, [hoverSpeed, pauseOnHover]);

	const isVertical = direction === 'up' || direction === 'down';

	const targetVelocity = useMemo(() => {
		const magnitude = Math.abs(speed);
		let directionMultiplier;
		if (isVertical) {
			directionMultiplier = direction === 'up' ? 1 : -1;
		} else {
			directionMultiplier = direction === 'left' ? 1 : -1;
		}
		const speedMultiplier = speed < 0 ? -1 : 1;
		return magnitude * directionMultiplier * speedMultiplier;
	}, [speed, direction, isVertical]);

	// Calculate dimensions key for remount
	const dimensionsKey = useMemo(() => {
		const seqRect = seqRef.current?.getBoundingClientRect();
		if (!seqRect) return 'initial';
		return `${Math.ceil(seqRect.width)}x${Math.ceil(seqRect.height)}x${logos.length}`;
	}, [seqRef.current, logos.length, gap, logoHeight, dimensionsReady]);

	const updateDimensions = useCallback(() => {
		const containerWidth = containerRef.current?.clientWidth ?? 0;
		const sequenceRect = seqRef.current?.getBoundingClientRect();
		const sequenceWidth = sequenceRect?.width ?? 0;
		const sequenceHeight = sequenceRect?.height ?? 0;

		const newSeqWidth = Math.ceil(sequenceWidth);
		const newSeqHeight = Math.ceil(sequenceHeight);

		console.log('[LogoLoop] updateDimensions:', {
			containerWidth,
			sequenceWidth: sequenceWidth.toFixed(2),
			sequenceHeight: sequenceHeight.toFixed(2),
			logosLength: logos.length,
			currentSeqWidth: seqWidth,
			currentSeqHeight: seqHeight,
			newSeqWidth,
			newSeqHeight,
			dimensionsReady
		});

		// Always set the state
		setSeqWidth(newSeqWidth);
		setSeqHeight(newSeqHeight);

		// Set dimensions ready
		if (newSeqWidth > 0 && !dimensionsReady) {
			console.log('[LogoLoop] Dimensions ready!');
			setDimensionsReady(true);
		}

		// Calculate copies
		if (newSeqWidth > 0) {
			const copiesNeeded = Math.ceil(containerWidth / newSeqWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
			setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
		}
	}, [dimensionsReady]);

	// Start animation when dimensions are ready
	useEffect(() => {
		const track = trackRef.current;
		if (!track || !dimensionsReady) return;

		const seqSize = isVertical ? seqHeight : seqWidth;
		if (seqSize <= 0) {
			console.log('[LogoLoop] seqSize is 0, skipping animation');
			return;
		}

		console.log('[LogoLoop] Starting animation:', { seqSize, seqWidth, seqHeight, targetVelocity });

		let offset = 0;
		let velocity = 0;
		let lastTimestamp = 0;
		let animationFrame: number | null = null;

		const animate = (timestamp: number) => {
			if (lastTimestamp === 0) {
				lastTimestamp = timestamp;
			}

			const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
			lastTimestamp = timestamp;

			const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

			const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
			velocity += (target - velocity) * easingFactor;

			let nextOffset = offset + velocity * deltaTime;
			nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
			offset = nextOffset;

			const transformValue = isVertical
				? `translate3d(0, ${-offset}px, 0)`
				: `translate3d(${-offset}px, 0, 0)`;
			track.style.transform = transformValue;

			animationFrame = requestAnimationFrame(animate);
		};

		animationFrame = requestAnimationFrame(animate);

		return () => {
			if (animationFrame !== null) {
				cancelAnimationFrame(animationFrame);
			}
		};
	}, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef, dimensionsReady]);

	useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);

	useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);

	const cssVariables = useMemo(
		() => ({
				'--logoloop-gap': `${gap}px`,
				'--logoloop-logoHeight': `${logoHeight}px`,
				...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
			}),
		[gap, logoHeight, fadeOutColor]
		);

	const rootClassName = useMemo(
		() =>
					[
						'logoloop',
						isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
						fadeOut && 'logoloop--fade',
						scaleOnHover && 'logoloop--scale-hover',
						className
					]
					.filter(Boolean)
					.join(' '),
		[isVertical, fadeOut, scaleOnHover, className]
		);

	const handleMouseEnter = useCallback(() => {
		setIsHovered(true);
	}, []);
	const handleMouseLeave = useCallback(() => {
		setIsHovered(false);
	}, []);

	const renderLogoItem = useCallback(
		(item: any, id: string) => {
			return <LogoItem key={id} item={item} id={id} renderItem={renderItem} />;
		},
		[renderItem]
		);

	const logoLists = useMemo(
		() =>
					Array.from({ length: copyCount }, (_, copyIndex) => (
								<ul
										className="logoloop__list"
										key={`copy-${copyIndex}`}
										role="list"
										aria-hidden={copyIndex > 0}
										ref={copyIndex === 0 ? seqRef : undefined}
								>
									{logos.map((item, itemIndex) => renderLogoItem(item, `item-${itemIndex}`))}
								</ul>
							)),
			[copyCount, logos, renderLogoItem]
		);

	const containerStyle = useMemo(
		() => ({
						width: isVertical
								? toCssLength(width) === '100%'
									? undefined
									: toCssLength(width)
								: (toCssLength(width) ?? '100%'),
						...cssVariables,
						...style
				}),
			[width, cssVariables, style, isVertical]
		);

	return (
		<>
				<div ref={containerRef} className={rootClassName} style={containerStyle} role="region" aria-label={ariaLabel}>
					<div className="logoloop__track" ref={trackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
						{logoLists}
					</div>
				</div>
				<GlobalTooltip />
			</>
		);
	}
);

InnerLogoLoop.displayName = 'InnerLogoLoop';
