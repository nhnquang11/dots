import 'tailwindcss/tailwind.css';
import parse, { domToReact } from 'html-react-parser';

const StoryContent = ({ htmlContent }) => {
  const options = {
    replace: (domNode) => {
      if (domNode.name === 'h1') {
        return <h1 className="bg-neutral-50 my-6 font-serif text-3xl font-bold leading-8 text-neutral-800 col-span-full md:col-start-3 md:col-span-8">{domToReact(domNode.children)}</h1>;
      }
      if (domNode.name === 'h2') {
        return <h2 className="bg-neutral-50 my-5 font-serif text-2xl font-semibold leading-8 text-neutral-800 col-span-full md:col-start-3 md:col-span-8">{domToReact(domNode.children)}</h2>;
      }
      if (domNode.name === 'h3') {
        return <h3 className="bg-neutral-50 my-4 font-serif text-xl font-semibold leading-8 text-neutral-800 col-span-full md:col-start-3 md:col-span-8">{domToReact(domNode.children)}</h3>;
      }
      if (domNode.name === 'p') {
        return <p className="bg-neutral-50 font-serif text-xl leading-8 text-neutral-800 col-span-full md:col-start-3 md:col-span-8">{domToReact(domNode.children)}</p>;
      }
    },
  };

  const parsedContent = parse(htmlContent, options);
  console.log(parsedContent);

  return (
    <div className="font-serif grid grid-cols-12 md:mx-24 px-5">
      {parsedContent}
    </div>
  );
};

export default StoryContent;
