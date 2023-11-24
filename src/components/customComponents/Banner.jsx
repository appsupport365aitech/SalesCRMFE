export default function Banner({ component }) {
  return (
    <>
      <article
        key={component.name}
        className={`banner ${component.className}`}
        style={{ backgroundImage: `url(${component.bgImage})` }}
      >
        <h1 className={`banner_text ${component.textClass}`}>
          {component.text}
          <br />
          {component.spanText && <span className="banner_subtext">{component.spanText}</span>}
        </h1>
      </article>
    </>
  );
}
