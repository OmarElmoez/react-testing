import SearchBox from "../components/SearchBox";

const PlaygroundPage = () => {
  return <SearchBox onChange={(txt) => console.log(txt)} />;
};

export default PlaygroundPage;
