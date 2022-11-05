import { Rings } from "react-loader-spinner";
import { LoaderWrap } from "./Loader.styled";


export default function Loader () {
  return (
    <LoaderWrap>
      <Rings color="#00BFFF" height={80} width={80} />
    </LoaderWrap>
  );
};

