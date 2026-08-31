import './ShinyText.css';

/**
 * ShinyText — animated shimmer effect on text
 * Adapted from React Bits
 */
export default function ShinyText({ 
  text, 
  className = '', 
  shimmerColor = 'hsla(340, 80%, 85%, 0.6)',
  speed = 3,
  as: Tag = 'span',
}) {
  return (
    <Tag 
      className={`shiny-text ${className}`}
      style={{
        '--shimmer-color': shimmerColor,
        '--shimmer-speed': `${speed}s`,
      }}
    >
      {text}
    </Tag>
  );
}
